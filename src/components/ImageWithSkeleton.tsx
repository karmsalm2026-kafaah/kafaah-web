"use client";

import { useState, useEffect, useRef, type ImgHTMLAttributes } from "react";

interface ImageWithSkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  mobileSrc?: string;
}

export function ImageWithSkeleton({
  src,
  alt,
  className = "",
  containerClassName = "",
  mobileSrc,
  ...props
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If image is already cached by the browser and completed loading
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${!loaded ? "shimmer-skeleton" : ""} ${containerClassName}`}>
      <picture>
        {mobileSrc && <source media="(max-width: 768px)" srcSet={mobileSrc} />}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
          {...props}
        />
      </picture>
    </div>
  );
}
