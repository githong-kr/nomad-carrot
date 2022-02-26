/* eslint-disable react/jsx-key */
import type { NextPage } from 'next';

const Details: NextPage = () => {
  return (
    <div className="flex flex-col space-y-2 p-5">
      <details className=" select-none">
        <summary className="cursor-pointer ">What is my fav. food.</summary>
        <span>김치</span>
      </details>
    </div>
  );
};

export default Details;
