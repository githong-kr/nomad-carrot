import { NextPage } from 'next';
import FloatingButton from '../../components/common/FloatingButton';
import Layout from '../../components/common/Layout';
import StreamList from '../../components/stream/StreamList';
import VideoIcon from '../../public/svgs/video.svg';

const Stream: NextPage = () => {
  return (
    <Layout title="라이브" hasTabBar>
      <div className="space-y-4 divide-y-2">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <StreamList key={i} />
        ))}
        <FloatingButton floatingBtnSvg={<VideoIcon className="h-6" strokeWidth="2" />} />
      </div>
    </Layout>
  );
};

export default Stream;
