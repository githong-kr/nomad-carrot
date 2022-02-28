import { NextPage } from 'next';
import React from 'react';
import UserDataIcon from './UserDataIcon';

interface UserDataIconProps {
  svg: React.ReactNode;
  txt: string;
}

interface UserDataIconListProps {
  propsList: UserDataIconProps[];
}

const UserDataIconList: NextPage<UserDataIconListProps> = ({
  propsList,
}: UserDataIconListProps) => {
  return (
    <>
      {propsList.map((item, index) => (
        <UserDataIcon key={index} svg={item.svg} txt={item.txt} />
      ))}
    </>
  );
};

export default UserDataIconList;
