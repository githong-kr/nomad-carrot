import type { NextPage } from 'next';
import FloatingButton from '../components/common/FloatingButton';
import ItemList from '../components/items/ItemList';
import Layout from '../components/common/Layout';
import PlusIcon from '../public/svgs/plus.svg';

const Home: NextPage = () => {
  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col space-y-5">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <ItemList key={i} />
        ))}
        <FloatingButton
          floatingBtnSvg={<PlusIcon className="h-6" strokeWidth="2" />}
        />
      </div>
    </Layout>
  );
};

export default Home;
