import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ImageProps } from "next/image";
import NoImage from "assets/png/no-image.jpg";

interface FallbackImageProps extends ImageProps {
  src: StaticImageData | string;
  alt: string;
  fallbackSrc?: StaticImageData | string;
}

export function FallbackImage({
  src,
  fallbackSrc,
  alt,
  ...props
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      alt={alt}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc || NoImage);
      }}
    />
  );
}
