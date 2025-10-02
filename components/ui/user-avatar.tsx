import Image from "next/image";
import { useState } from "react";

type UserAvatarProps = {
  src?: string;
  alt?: string;
  size?: number;
  className: string;
};

export default function UserAvatar({
  src,
  alt = "User avatar",
  size = 100,
  className,
}: UserAvatarProps) {
  const [imgSrc, setImgSrc] = useState(src || "/user.png");

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={size}
      height={size}
      className={className}
      onError={() => setImgSrc("/user.png")}
    />
  );
}
