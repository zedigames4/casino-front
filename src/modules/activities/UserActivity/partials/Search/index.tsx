import React, { useState } from 'react';
import { UserProfileInterface } from '@/interfaces/profile.interface';

const Search = ({
  defaultValue,
  setSearchText,
  isLoading,
}: {
  defaultValue?: string;
  isLoading?: boolean;
  setSearchText: (search: string) => void;
}) => {
  const [search, setSearch] = useState(defaultValue);
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const formData = new FormData(event.target);
        setSearchText(`${formData.get('search')}`);
      }}
      className="flex flex-row items-center"
    >
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          name="search"
          id="simple-search"
          value={search}
          onChange={event => setSearch(event.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
          required
        />
      </div>
      <button
        disabled={isLoading || false}
        type="submit"
        className="p-2.5 ml-2 disabled:bg-primary/30 text-sm font-medium text-white bg-brand-blue-light/70 rounded-lg hover:bg-brand-blue-light focus:ring-4 focus:outline-none focus:bg-brand-blue-light"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
};
Search.defaultProps = {
  isLoading: false,
  defaultValue: '',
};

export default Search;
