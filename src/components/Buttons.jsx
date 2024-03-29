/* eslint-disable react/prop-types */
import clsx from "clsx";

export const ReplyButton = ({ className, children, ...rest }) => {
  return (
    <button
      {...rest}
      className={clsx(
        "dark:text-yellow-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1 center text-indigo-700 font-bold  bg-none border-none focus-within:outline-none hover:opacity-20 focus-visible:ring-1 focus-visible:ring-indigo-700 dark:focus-visible:ring-yellow-500 rounded-sm px-2 py-1  text-sm",
        className
      )}
    >
      <img src="/images/icon-reply.svg" className="font-bold" />
      {children}
    </button>
  );
};

export const DeleteButton = ({ className, children, ...rest }) => {
  return (
    <button
      {...rest}
      className={clsx(
        "disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1 center text-red-400 font-bold  bg-none border-none focus-within:outline-none focus-visible:ring-1 hover:opacity-20 focus-visible:ring-red-400 rounded-sm px-2 py-1 text-sm",
        className
      )}
    >
      <img src="/images/icon-delete.svg" className="font-bold" />
      {children}
    </button>
  );
};

export const EditButton = ({ className, children, ...rest }) => {
  return (
    <button
      {...rest}
      className={clsx(
        "hover:opacity-20 dark:text-yellow-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1 center text-indigo-700 font-bold  bg-none border-none focus-within:outline-none focus-visible:ring-1 focus-visible:ring-indigo-700 dark:focus-visible:ring-yellow-500  rounded-sm px-2 py-1 text-sm",
        className
      )}
    >
      <img src="/images/icon-edit.svg" className="font-bold" />
      {children}
    </button>
  );
};

export const Button = ({ className, children, icon, ...rest }) => {
  return (
    <button
      {...rest}
      className={clsx(
        "dark:bg-yellow-500 disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-30 p-3 h-9 flex items-center justify-center rounded-md center bg-indigo-700 text-white w-fit",
        className
      )}
    >
      {icon ? icon : ""}
      {children}
    </button>
  );
};
