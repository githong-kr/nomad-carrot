import { NextPage } from 'next';
import Layout from '../../components/common/Layout';

const Create: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="space-y-5 py-10 px-4">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <div className="flex select-none items-center rounded-md shadow-sm">
            <input
              id="name"
              type="text"
              className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 "
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="price"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <div className="relative flex select-none items-center rounded-md shadow-sm">
            <div className="absolute left-0 flex items-center justify-center pl-3">
              <span className="text-sm text-gray-500">$</span>
            </div>
            <input
              id="price"
              type="text"
              placeholder="0.00"
              className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pl-7  placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 "
            />
            <div className="absolute right-0 flex select-none items-center justify-center pr-3">
              <span className="text-sm text-gray-500">USD</span>
            </div>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 "
            rows={4}
          />
        </div>
        <button className="mt-5 w-full rounded-md border border-transparent bg-orange-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 hover:transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          Go live
        </button>
      </div>
    </Layout>
  );
};

export default Create;
