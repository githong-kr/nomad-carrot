import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cls } from '../../libs/utils';
import HomeIcon from '../../public/svgs/home.svg';
import NewsIcon from '../../public/svgs/news.svg';
import MessageIcon from '../../public/svgs/message.svg';
import VideoIcon from '../../public/svgs/video.svg';
import UserIcon from '../../public/svgs/user.svg';

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

const Layout: NextPage<LayoutProps> = ({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) => {
  const router = useRouter();
  const onClickGoBack = () => {
    router.back();
  };

  return (
    <div>
      <div
        className={cls(
          'fixed top-0 flex w-full max-w-xl items-center border-b bg-white px-3 py-3 text-lg font-medium text-gray-800',
          !canGoBack ? 'justify-center' : ''
        )}
      >
        {canGoBack ? (
          <button onClick={onClickGoBack}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        ) : null}
        {title ? <span>{title}</span> : null}
      </div>
      <div className={cls('pt-16', hasTabBar ? 'pb-24' : '')}>{children}</div>
      {hasTabBar ? (
        <nav className="fixed bottom-0 flex w-full max-w-xl items-center justify-between border-t bg-white px-10 pb-4 pt-3 text-xs text-gray-800">
          <Link href="/">
            <a className={cls("flex flex-col items-center space-y-2 hover:text-orange-500", router.asPath === '/' ? 'text-orange-500' : '')}>
              <HomeIcon className="w-6" strokeWidth="2" />
              <span>홈</span>
            </a>
          </Link>
          <Link href="/community">
            <a className={cls("flex flex-col items-center space-y-2 hover:text-orange-500", router.asPath === '/community' ? 'text-orange-500' : '')}>
              <NewsIcon className="w-6" strokeWidth="2" />
              <span>동네생활</span>
            </a>
          </Link>
          <Link href="/chats">
            <a className={cls("flex flex-col items-center space-y-2 hover:text-orange-500", router.asPath === '/chats' ? 'text-orange-500' : '')}>
              <MessageIcon className="w-6" strokeWidth="2" />
              <span>채팅방</span>
            </a>
          </Link>
          <Link href="/streams">
            <a className={cls("flex flex-col items-center space-y-2 hover:text-orange-500", router.asPath === '/streams' ? 'text-orange-500' : '')}>
              <VideoIcon className="w-6" strokeWidth="2" />
              <span>라이브</span>
            </a>
          </Link>
          <Link href="/profile">
            <a className={cls("flex flex-col items-center space-y-2 hover:text-orange-500", router.asPath === '/profile' ? 'text-orange-500' : '')}>
              <UserIcon className="w-6" strokeWidth="2" />
              <span>나의 캐럿</span>
            </a>
          </Link>
        </nav>
      ) : null}
    </div>
  );
};

export default Layout;
