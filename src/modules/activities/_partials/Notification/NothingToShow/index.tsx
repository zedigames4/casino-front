const NothingToShow = () => {
  return (
    <div className="rounded-lg mx-auto m-8 p-4 notification-box flex">
      <div className="pr-2">
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
      </div>
      <div>
        <div className="text-sm text-gray-600  tracking-tight ">
          Nothing here!
        </div>
      </div>
    </div>
  );
};
export default NothingToShow;
