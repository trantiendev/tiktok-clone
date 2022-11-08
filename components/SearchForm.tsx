import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { BiSearch } from 'react-icons/bi';

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    searchValue && router.push(`/search/${searchValue}`);
  };

  return (
    <div className="relative hidden md:block">
      <form
        onSubmit={handleSearch}
        className="absolute md:static top-10 -left-20 bg-white"
      >
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0"
          placeholder="Search accounts and videos"
        />
        <button
          onClick={handleSearch}
          className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
        >
          <BiSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
