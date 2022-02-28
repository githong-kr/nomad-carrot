import { NextPage } from 'next';

interface FloatingButtonProps {
  floatingBtnSvg: React.ReactNode;
}

const FloatingButton: NextPage<FloatingButtonProps> = ({
  floatingBtnSvg,
}: FloatingButtonProps) => {
  return (
    <button className="fixed bottom-36 right-5 cursor-pointer rounded-full bg-orange-400 p-4 text-white shadow-xl transition hover:bg-orange-500">
      {floatingBtnSvg}
    </button>
  );
};

export default FloatingButton;
