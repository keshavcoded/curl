import type React from "react";

type ErrorProp = {
  message: string | null;
  position: string;
};

const Error: React.FC<ErrorProp> = ({ message, position }) => {
  return (
    <span className={`absolute text-xs text-red-500 ${position} mt-0.5`}>
      {message}
    </span>
  );
};

export default Error;
