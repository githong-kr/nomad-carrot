import { NextPage } from 'next';
import AvatarExpand from '../../components/avatar/AvatarExpand';
import Layout from '../../components/common/Layout';

const EditProfile: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="space-y-4 py-10 px-4">
        <div className="flex items-center space-x-3">
          <AvatarExpand
            imageProps={{ size: 14 }}
            primaryElement={
              <label
                htmlFor="picture"
                className="cursor-pointer rounded-md border border-dashed border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Change
                <input
                  id="picture"
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            }
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2  placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 "
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone number
          </label>
          <div className="flex rounded-md shadow-sm">
            <span className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
              +82
            </span>
            <input
              id="phone"
              type="number"
              required
              className="w-full appearance-none rounded-r-md border border-gray-300 px-3 py-2  placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 "
            />
          </div>
        </div>
        <button className="mt-5 w-full rounded-md border  border-transparent bg-orange-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 hover:transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          Update profile
        </button>
      </div>
    </Layout>
  );
};

export default EditProfile;
