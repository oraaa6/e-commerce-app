import React, { useState } from "react";
import Image from "next/image";
import { ImageProps } from "next/image";
import NoImage from "assets/svg/no-image.svg";

interface FallbackImageProps extends ImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

export function FallbackImage({
  src,
  fallbackSrc,
  alt,
  ...props
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  console.log(src);
  return (
    <Image
      {...props}
      alt={alt}
      fill={error ? false : props.fill}
      width={error ? 50 : undefined}
      height={error ? 50 : undefined}
      src={imgSrc}
      onError={() => {
        setError(true);
        setImgSrc(fallbackSrc || NoImage);
      }}
    />
  );
}
