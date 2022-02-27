import { NextPage } from 'next';

const Write: NextPage = () => {
  return (
    <form className="px-4 py-10">
      <textarea
        rows={4}
        placeholder="Ask a question!"
        className=" mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 "
      />
      <button className="mt-2 w-full rounded-md border border-transparent bg-orange-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 hover:transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        Submit
      </button>
    </form>
  );
};

export default Write;
