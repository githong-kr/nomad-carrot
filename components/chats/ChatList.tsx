import { NextPage } from 'next';
import Avatar from '../avatar/Avatar';

const ChatList: NextPage = () => {
  return (
    <div className="flex  cursor-pointer items-center space-x-3 px-4  py-3">
      <Avatar size={12} />
      <div>
        <p className="text-gray-700">Steve Jebs</p>
        <p className="text-sm text-gray-500">
          See you tomorrow in the corner at 2pm!
        </p>
      </div>
    </div>
  );
};

export default ChatList;
