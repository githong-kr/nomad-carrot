import { NextPage } from 'next';

interface AvatarProps {
  size: number;
}

const Avatar: NextPage<AvatarProps> = ({ size }: AvatarProps) => {
  return <div className={`h-${size} w-${size} rounded-full bg-slate-300`} />;
};

export default Avatar;
