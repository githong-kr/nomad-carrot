import { cls } from '@libs/client/utils';

interface ButtonProps {
  large?: boolean;
  text: string;
  [key: string]: any;
}

export default function Button({
  large = false,
  onClick,
  text,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={cls(
        {
          classNames:
            'w-full bg-orange-500 text-white px-4 border border-transparent rounded-md shadow-sm font-medium',
        },
        { prefix: 'hover', classNames: 'bg-orange-600' },
        {
          prefix: 'focus',
          classNames: 'ring-2 ring-offset-2 ring-orange-500 outline-none',
        },
        large
          ? { classNames: 'py-3 text-base' }
          : { classNames: 'py-2 text-sm' }
      )}
    >
      {text}
    </button>
  );
}
