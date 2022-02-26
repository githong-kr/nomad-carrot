/* eslint-disable react/jsx-key */
import type { NextPage } from 'next';

const File: NextPage = () => {
  return (
    <div className="flex flex-col space-y-2 p-5">
      <input
        type="file"
        className="file:cursor-pointer file:rounded-xl file:border-0 file:bg-purple-400 file:px-8 file:text-white file:transition-colors file:hover:border file:hover:border-purple-400 file:hover:bg-white file:hover:text-purple-400"
      />
    </div>
  );
};

export default File;
