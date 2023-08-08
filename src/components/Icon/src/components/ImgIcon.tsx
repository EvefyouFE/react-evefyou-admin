import { FC } from 'react';

export const ImgIcon: FC<{
  url: string;
  height?: number;
  width?: number;
  className?: string;
}> = ({ url: imageUrl, height, width, className }) => (
  <div className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <image href={imageUrl} width={width} height={height} />
    </svg>
  </div>
);
