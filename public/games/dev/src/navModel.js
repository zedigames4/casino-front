import { getToken } from './system/secureLs.js';
import {
  patters,
  setAttributes,
  validate,
  checkValidation,
} from './system/validation.js';
import endpoints from '../src/system/endpointsV1.js';
import keys from './system/keys.js';
import { getHeaders } from './utils/functions.js';
document.addEventListener('DOMContentLoaded', async () => {
  const socket = io(keys.DEFAULT_API, {
    query: {
      token: await getToken(),
    },
  });
  socket.on('connect', () => {
    console.log('Socket connected');
  });
  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  const logoutBtn = document.getElementById('logoutBtn');
  const dashboardBtn = document.getElementById('dashboardBtn');
  const walletBtn = document.getElementById('walletBtn');
  const logoutTxt = document.getElementById('logoutTxt');
  getToken().then(token => {
    if (!token) {
      logoutTxt.textContent = 'Login';
      topUpBtn.classList.add('hidden');
    }
  });
  logoutBtn.onclick = async () => {
    let token = await getToken();
    if (token) {
      window.location.href = '/logout';
    } else {
      window.location.href = '/login';
    }
  };
  dashboardBtn.onclick = () => {
    window.location.href = '/dashboard';
  };
  walletBtn.onclick = () => {
    window.location.href = '/wallet';
  };

  const model = document.getElementById('authentication-modal');
  const closeTopUpModel = document.getElementById('closeTopupModel');
  const topUpBtn = document.getElementById('topupBtn');
  const submit = document.getElementById('submit');
  const topUpForm = document.getElementById('topUpForm');

  // payment-pending
  const paymentPendingModel = document.getElementById('payment-pending-modal');
  const closePaymentPendingModel = document.getElementById(
    'close-payment-pending-modal',
  );
  // payment-fail
  const paymentErrorModel = document.getElementById('payment-error-modal');
  const closePaymentErrorModel = document.getElementById(
    'close-payment-error-modal',
  );
  // payment-success
  const paymentSuccessModel = document.getElementById('payment-success-modal');
  const closePaymentSuccessModel = document.getElementById(
    'close-success-error-modal',
  );

  const toggleTopUpModel = () => {
    model.classList.toggle('hidden');
    document.body.classList.remove('open');
  };
  const togglePaymentPendingModel = () => {
    paymentPendingModel.classList.toggle('hidden');
    document.body.classList.remove('open');
  };
  const togglePaymentErrorModel = () => {
    paymentErrorModel.classList.toggle('hidden');
    document.body.classList.remove('open');
  };
  const togglePaymentSuccessModel = () => {
    paymentSuccessModel.classList.toggle('hidden');
    document.body.classList.remove('open');
  };
  const closeAllModel = () => {
    model.classList.add('hidden');
    paymentPendingModel.classList.add('hidden');
    paymentErrorModel.classList.add('hidden');
    paymentSuccessModel.classList.add('hidden');
    document.body.classList.remove('open');
  };

  closeTopUpModel.onclick = () => toggleTopUpModel();
  closePaymentPendingModel.onclick = () => togglePaymentPendingModel();
  closePaymentErrorModel.onclick = () => togglePaymentErrorModel();
  closePaymentSuccessModel.onclick = () => {
    togglePaymentSuccessModel();
    location.reload();
  };

  topUpBtn.onclick = () => toggleTopUpModel();

  let fields = [
    {
      name: 'telephoneNumber',
      field: 'telephoneNumber',
      error: 'telephoneNumberError',
      conditions: [
        {
          name: 'required',
          value: true,
        },
        {
          name: 'pattern',
          value: patters.tel,
        },
      ],
    },
    {
      name: 'amount',
      field: 'amount',
      error: 'amountError',
      conditions: [
        {
          name: 'required',
          value: true,
        },
        {
          name: 'min',
          value: 1000,
        },
      ],
    },
  ];
  fields.forEach(eachField => {
    setAttributes(eachField);
    validate(eachField);
  });
  topUpForm.addEventListener('submit', async event => {
    try {
      event.preventDefault();
      let isFormValid = checkValidation(fields);
      if (!isFormValid) {
        return;
      }
      submit.disabled = true;
      let formData = new FormData(event.target);
      let query = {};
      for (let each of formData) {
        query[each[0]] = each[1];
      }
      await onSubmit(query);
      submit.disabled = false;
    } catch (e) {
      console.error(e);
      submit.disabled = false;
    }
  });

  const onSubmit = async query => {
    const { telephoneNumber: phone, ...others } = query;
    const data = {
      ...others,
      telephoneNumber: `25${phone}`,
      description: 'Pay',
    };
    try {
      const response = await axios.post(
        `${keys.DEFAULT_API}${endpoints.TRANSFER_OLTRANZ}`,
        data,
        await getHeaders(),
      );
      const {
        data: { data: result, referenceId },
      } = response;
      console.warn('reference id is ', referenceId);
      if (result.code === '200' && result.status === 'PENDING') {
        try {
          socket.on(`payment:error:${referenceId}` + '', data => {
            console.log(data);
            closeAllModel();
            togglePaymentErrorModel();
          });
          socket.on(`payment:done:${referenceId}` + '', data => {
            console.log(data);
            closeAllModel();
            togglePaymentSuccessModel();
          });
        } catch (e) {
          console.error('error');
        }
        closeAllModel();
        togglePaymentPendingModel();
      } else {
        console.error(result);
        Swal.fire({
          icon: 'warning',
          title: 'Opps, Something is not well! ',
          text: result.description || 'please contact us',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Opps, Something went wrong! ',
        text: error?.response?.data?.message || 'please contact us',
      });
    }
  };
});
