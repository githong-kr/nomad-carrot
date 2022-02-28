import { NextPage } from 'next';
import Avatar from '../avatar/Avatar';
import { cls } from '../../libs/utils';

interface ChatBubbleProps {
  size?: number;
  others?: boolean;
  message: string;
}

const ChatBubble: NextPage<ChatBubbleProps> = ({
  size = 8,
  others,
  message,
}: ChatBubbleProps) => {
  return (
    <div
      className={cls(
        'flex items-start space-x-2',
        others ? '' : 'flex-row-reverse space-x-reverse'
      )}
    >
      <Avatar size={size} />
      <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700 shadow-md ">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
