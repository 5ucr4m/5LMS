import Image from "next/image";
import React from "react";

export const Logo: React.FC = () => {
  return <Image alt="logo" src="/logo.svg" width={130} height={130} />;
};
