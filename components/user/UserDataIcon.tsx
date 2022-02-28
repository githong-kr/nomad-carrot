import { NextPage } from 'next';

interface UserDataIconProps {
    svg:React.ReactNode;
    txt:string
}

const UserDataIcon: NextPage<UserDataIconProps> = ({svg, txt}:UserDataIconProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white">
        {svg}
      </div>
      <span className="mt-2 text-sm font-medium text-gray-700">{txt}</span>
    </div>
  );
};

export default UserDataIcon;
