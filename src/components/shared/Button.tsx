import React, { ButtonHTMLAttributes } from 'react';

interface buttonType extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<buttonType> = ({ children, ...rest }) => {
  return (
    <div>
      <button  {...rest} className="inline-flex  h-12 items-center justify-center rounded-md bg-red-500 px-6  ml-3  mt-3 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95">{children}</button>
    </div>
  );
};

export default Button;
