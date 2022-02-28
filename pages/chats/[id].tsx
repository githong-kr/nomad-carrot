import type { NextPage } from 'next';
import ChatBubble from '../../components/chats/ChatBubble';
import Layout from '../../components/common/Layout';
import SendMessage from '../../components/chats/SendMessage';

const ChatDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="space-y-4 py-10 px-4 pb-16">
      <ChatBubble others message={'Hi how much are you selling them for?'} />
      <ChatBubble message={'I want ￦20,000'} />
      <ChatBubble others message={'미쳤어'} />

      <SendMessage />
    </div>
    </Layout>
  );
};

export default ChatDetail;
