/* eslint-disable react/prop-types */
import clsx from "clsx";
import IconDelete from "../../images/icon-delete.svg";
//import IconReply from "../../images/icon-reply.svg";

export const ReplyButton = ({ className, children, ...rest }) => {
  return (
    <button
      {...rest}
      className={clsx(
        "dark:text-yellow-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-1 center text-indigo-700 font-bold  bg-none border-none focus-within:outline-none hover:opacity-20 focus-visible:ring-1 focus-visible:ring-indigo-700 dark:focus-visible:ring-yellow-500 rounded-sm px-2 py-1  text-sm",
        className
      )}
    >
      <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
        <path
          className="dark:fill-[#eab308]"
          d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
          fill="#5357B6"
        />
      </svg>
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
      <img src={IconDelete} className="font-bold" />
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
      <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
          fill="#5357B6"
          className="dark:fill-[#eab308]"
        />
      </svg>
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
