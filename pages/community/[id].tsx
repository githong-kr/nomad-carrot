import type { NextPage } from 'next';
import AvatarExpand from '../../components/avatar/AvatarExpand';
import Layout from '../../components/common/Layout';

const CommunityPostDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div>
        <span className="my-2.5 ml-4 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          동네질문
        </span>
        <div className="mb-3 flex cursor-pointer items-center space-x-3 border-b px-4 py-3">
          <AvatarExpand
            imageProps={{ size: 14 }}
            primary="Steve Jebs"
            secondary="Edit profile &rarr;"
          />
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="font-medium text-orange-500">Q.</span> What is the
            best mandu restaurant?
          </div>
          <div className="mt-3 flex w-full space-x-5 border-t border-b-2 py-2.5 text-gray-700">
            <span className="flex items-center space-x-2 px-4 text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 1</span>
            </span>
            <span className="flex items-center space-x-2 text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 1</span>
            </span>
          </div>
        </div>
        <div className="divide-y-2">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div key={i} className="space-y-5 px-4 py-5">
              <div className="flex items-start space-x-3 ">
                <AvatarExpand
                  imageProps={{ size: 8 }}
                  primary="Steve Jebs"
                  secondary="2시간 전"
                  info="The best mandu restaurant is the one next to my house."
                />
              </div>
            </div>
          ))}
        </div>
        <div className="px-4">
          <textarea
            rows={4}
            placeholder="Answer this question!"
            className=" mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 "
          />
          <button className="mt-2 w-full rounded-md border border-transparent bg-orange-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 hover:transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
            Reply
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
