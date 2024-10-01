"use client";

import Image, { ImageProps } from "next/image";
import { forwardRef, useEffect, useState } from "react";

const defaultSrc = "/profile-default.jpg";
const errorSrc = "/profile-default.jpg";

export const ProfileImage = forwardRef<HTMLImageElement | null, ImageProps>(
  function ProfileImage(props, ref) {
    const { alt, src } = props;

    const isValidSrc = src && typeof src === "string" && src.trim() !== "";
    const [imgSrc, setImgSrc] = useState(isValidSrc ? src : defaultSrc);
    const [isError, setIsError] = useState(false);

    useEffect(()=>{
      const isValidSrc = src && typeof src === "string" && src.trim() !== "";
    setImgSrc(isValidSrc ? src : defaultSrc);
    },[src])
   
    const handleError = () => {
      if (isError) return;
      setImgSrc(errorSrc);
      setIsError(true);
    };

    return (
      <Image
        ref={ref}
        onError={handleError}
        {...props}
        alt={alt}
        src={imgSrc}
      />
    );
  }
);
