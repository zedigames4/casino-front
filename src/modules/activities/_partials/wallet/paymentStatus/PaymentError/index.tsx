const PaymentError = () => {
  return (
    <div className="bg-white p-6  md:mx-auto flex flex-col items-center gap-2">
      <span className="material-symbols-outlined text-9xl text-red-400">
        error
      </span>
      <div className="text-center">
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
          Payment FAIL!
        </h3>
        <p className="text-gray-600 my-2">You can try to top up again!.</p>
      </div>
    </div>
  );
};

export default PaymentError;
