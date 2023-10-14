import ANotification from '@/modules/activities/_partials/Notification';
import { NotificationType } from '@/interfaces/notification.interface';
import NothingToShow from '@/modules/activities/_partials/Notification/NothingToShow';

const NotificationActivity = () => {
  return (
    <div
      className="w-full min-h-full bg-brand-blue-light z-10 right-0 overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
      id="notification"
    >
      <div className="2xl:w-4/12 flex flex-col h-full bg-gray-50 overflow-y-auto p-8 mx-auto">
        <div className="flex items-center justify-between">
          <p className="focus:outline-none text-2xl font-semibold leading-6 text-gray-800">
            Notifications
          </p>
          <button
            type="button"
            aria-label="close modal"
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="#4B5563"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#4B5563"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {/* <ANotification*/}
        {/*  notification={{*/}
        {/*    type: NotificationType.MESSAGE,*/}
        {/*    title: 'Notification title',*/}
        {/*    text: 'I will never close automatically. This is a purposely very very long description that has many many characters and words.',*/}
        {/*  }}*/}
        {/* />*/}
        {/* <ANotification*/}
        {/*  notification={{*/}
        {/*    type: NotificationType.WARNING,*/}
        {/*    text: 'I will never close automatically. This is a purposely very very long description that has many many characters and words.',*/}
        {/*  }}*/}
        {/* />*/}
        {/* <ANotification*/}
        {/*  notification={{*/}
        {/*    type: NotificationType.COMPLETE,*/}
        {/*    text: 'I will never close automatically. This is a purposely very very long description that has many many characters and words.',*/}
        {/*  }}*/}
        {/* />*/}
        {/* <ANotification*/}
        {/*  notification={{*/}
        {/*    type: NotificationType.DANGER,*/}
        {/*    text: 'I will never close automatically. This is a purposely very very long description that has many many characters and words.',*/}
        {/*  }}*/}
        {/* />*/}

        {/* <h2 className="focus:outline-none text-sm leading-normal pt-8 border-b pb-2 border-gray-300 text-gray-600">*/}
        {/*  YESTERDAY*/}
        {/* </h2>*/}
        {/* <ANotification*/}
        {/*  notification={{*/}
        {/*    text: 'I will never close automatically. This is a purposely very very long description that has many many characters and words.',*/}
        {/*  }}*/}
        {/* />*/}

        <NothingToShow />

        <span className="flex-1" />
        <div className="flex items-center justiyf-between">
          <hr className="w-full" />
          <p className="focus:outline-none text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500">
            That&lsquo;s it for now :)
          </p>
          <hr className="w-full" />
        </div>
      </div>
    </div>
  );
};
export default NotificationActivity;
