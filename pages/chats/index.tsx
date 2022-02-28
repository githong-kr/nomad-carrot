import { NextPage } from 'next';
import ChatList from '../../components/chats/ChatList';
import Layout from '../../components/common/Layout';

const Chats: NextPage = () => {
  return (
    <Layout title="채팅방" hasTabBar>
      <div className="divide-y-[1px]">
        {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
          <ChatList key={i} />
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
