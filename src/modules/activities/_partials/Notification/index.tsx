import {
  NotificationInterface,
  NotificationType,
} from '@/interfaces/notification.interface';

const ANotification = ({
  notification,
}: {
  notification: NotificationInterface;
}) => {
  let divBg;
  switch (notification?.type) {
    case NotificationType.COMPLETE: {
      divBg = 'bg-green-100';
      break;
    }
    case NotificationType.DANGER: {
      divBg = 'bg-red-100';
      break;
    }
    case NotificationType.WARNING: {
      divBg = 'bg-orange-100';
      break;
    }

    default: {
      divBg = 'bg-white';
      break;
    }
  }

  return (
    <div
      className={`shadow-lg rounded-lg mx-auto m-8 p-4 notification-box flex ${
        divBg || 'bg-white'
      }`}
    >
      <div className="pr-2">
        {!notification.type ? (
          <svg
            className="fill-current text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="22"
            height="22"
          >
            <path
              className="heroicon-ui"
              d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
            />
          </svg>
        ) : null}
        {notification?.type === NotificationType.MESSAGE ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z"
              fill="#4338CA"
            />
          </svg>
        ) : null}
        {notification?.type === NotificationType.DANGER ? (
          <svg
            className="fill-current text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              className="heroicon-ui"
              d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.54a5 5 0 0 1 7.08 0 1 1 0 0 1-1.42 1.42 3 3 0 0 0-4.24 0 1 1 0 0 1-1.42-1.42zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
            />
          </svg>
        ) : null}
        {notification?.type === NotificationType.COMPLETE ? (
          <div
            aria-label="success icon"
            role="img"
            className="focus:outline-none w-8 h-8 border rounded-full border-green-200 flex flex-shrink-0 items-center justify-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                fill="#047857"
              />
            </svg>
          </div>
        ) : null}

        {notification?.type === NotificationType.WARNING ? (
          <svg
            className="fill-current text-orange-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              className="heroicon-ui"
              d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 9a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
            />
          </svg>
        ) : null}
      </div>
      <div>
        {notification.title ? (
          <div className="text-sm pb-2">{notification?.title}</div>
        ) : null}
        <div className="text-sm text-gray-600  tracking-tight ">
          {notification?.text}
        </div>
        <p className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">
          2 hours ago
        </p>
      </div>
    </div>
  );
};

export default ANotification;
