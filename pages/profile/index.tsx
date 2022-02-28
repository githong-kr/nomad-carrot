import type { NextPage } from 'next';
import AvatarExpand from '../../components//avatar/AvatarExpand';
import Layout from '../../components/common/Layout';
import RatingStar from '../../components/common/RatingStar';
import HeartIcon from '../../public/svgs/heart.svg';
import BagIcon from '../../public/svgs/bag.svg';
import ShoppingCart from '../../public/svgs/shoppingCart.svg';
import UserDataIconList from '../../components/user/UserDataIconList';

const Profile: NextPage = () => {
  const userDataList = [
    {
      svg: <ShoppingCart className="w-6" strokeWidth="2" />,
      txt: '판매내역',
    },
    {
      svg: <BagIcon className="w-6" strokeWidth="2" />,
      txt: '구매내역',
    },
    {
      svg: <HeartIcon className="w-6" strokeWidth="2" />,
      txt: '관심목록',
    },
  ];

  return (
    <Layout title="나의 캐럿" hasTabBar>
      <div className="px-4">
        <AvatarExpand
          imageProps={{ size: 14 }}
          primary="Steve Jebs"
          secondary="Edit profile &rarr;"
        />
        <div className="mt-10 flex justify-around">
          <UserDataIconList propsList={userDataList} />
        </div>
        <div className="mt-12 ">
          <AvatarExpand
            imageProps={{ size: 12 }}
            primary="니꼬"
            secondaryElement={<RatingStar rating={3} />}
          />
          <div className="mt-4 text-sm text-gray-600">
            <p>
              Normally, both your asses would be dead as fucking fried chicken,
              but you happen to pull this shit while I&apos;m in a transitional
              period so I don&apos;t wanna kill you, I wanna help you. But I
              can&apos;t give you this case, it don&apos;t belong to me.
              Besides, I&apos;ve already been through too much shit this morning
              over this case to hand it over to your dumb ass.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
