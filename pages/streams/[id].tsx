import { NextPage } from 'next';
import ChatBubble from '../../components/chats/ChatBubble';
import SendMessage from '../../components/chats/SendMessage';
import Layout from '../../components/common/Layout';

const StreamDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="space-y-4 px-4 py-10">
        <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
        <h3 className="mt-2 text-2xl font-semibold text-gray-800">
          Let&apos;s try potatos
        </h3>
        <div className="h-[50vh] space-y-4 overflow-y-scroll py-10 px-4 pb-16">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
            <>
              <ChatBubble
                others
                message={'Hi how much are you selling them for?'}
              />
              <ChatBubble message={'I want ￦20,000'} />
            </>
          ))}
        </div>
        <SendMessage />
      </div>
    </Layout>
  );
};

export default StreamDetail;
