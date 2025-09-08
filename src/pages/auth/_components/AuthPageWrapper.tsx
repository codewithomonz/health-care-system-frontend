import React from "react";

const AuthPageWrapper = ({
  children,
  image,
}: {
  children: React.ReactNode;
  image: string;
}) => {
  return (
    <div className="flex items-start justify-start h-screen w-screen relative">
      <img
        src={image}
        alt=""
        width={1000}
        height={1000}
        className="w-full h-full object-cover flex items-center justify-center absolute top-0 left-0 z-0"
      />

      {children}

      <div className="hidden md:flex md:w-6/12 flex-1 "></div>
    </div>
  );
};

export default AuthPageWrapper;
