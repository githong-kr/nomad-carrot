import { NextPage } from 'next';

const SendMessage: NextPage = () => {
  return (
    <div className="fixed inset-x-0 bottom-2 mx-auto w-full max-w-md">
      <div className="flex items-center">
        <input
          type="text"
          className="w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
        />
        <button className="relative right-11 cursor-pointer rounded-full bg-orange-500 px-3 text-white shadow-sm hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default SendMessage;
