import { NextPage } from 'next';
import { ImageProps } from 'next/image';
import Avatar from './Avatar';

interface AvatarExpandImage {
  src?: string;
  alt?: string;
  size: number;
  objectFit?: ImageProps['objectFit'];
}

interface AvatarExpandProps {
  imageProps: AvatarExpandImage;
  primary?: string;
  primaryElement?: React.ReactNode;
  secondary?: string;
  secondaryElement?: React.ReactNode;
  info?: string;
}

const AvatarExpand: NextPage<AvatarExpandProps> = ({
  imageProps,
  primary,
  primaryElement,
  secondary,
  secondaryElement,
  info,
}: AvatarExpandProps) => {
  return (
    <div className="flex items-center space-x-3">
      <Avatar size={imageProps.size} />

      <div className="flex flex-col">
        {primary ? (
          <span className="font-medium text-gray-900">{primary}</span>
        ) : (
          primaryElement
        )}
        {secondary ? (
          <span className="ml-1 text-sm text-gray-700">{secondary}</span>
        ) : (
          secondaryElement
        )}
        <p className="mt-2 text-gray-700">{info}</p>
      </div>
    </div>
  );
};

export default AvatarExpand;
