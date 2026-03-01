"use client";

import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="border w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        {/* Anywhere */}
        <div className="text-sm font-semibold px-6">Anywhere</div>

        {/* Divider */}
        <div className="hidden sm:block text-gray-300">|</div>

        {/* Any week */}
        <div className="hidden sm:block text-sm font-semibold px-6">
          Any week
        </div>

        {/* Divider */}
        <div className="hidden sm:block text-gray-300">|</div>

        {/* Any guest */}
        <div className="text-sm text-gray-600 pl-6 pr-2 flex items-center gap-3">
          <span className="hidden sm:block">Any guest</span>

          {/* Search Button */}
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <SearchIcon size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
