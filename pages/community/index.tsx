import type { NextPage } from 'next';
import CommunityList from '../../components/community/CommunityList';
import FloatingButton from '../../components/common/FloatingButton';
import Layout from '../../components/common/Layout';
import PencilIcon from '../../public/svgs/pencil.svg';

const Community: NextPage = () => {
  return (
    <Layout title="동네생활" hasTabBar>
      <div className="space-y-8 px-4">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <CommunityList key={i} />
        ))}
        <FloatingButton
          floatingBtnSvg={<PencilIcon className="h-6" strokeWidth="2" />}
        />
      </div>
    </Layout>
  );
};

export default Community;
