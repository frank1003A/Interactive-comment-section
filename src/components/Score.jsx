/* eslint-disable react/prop-types */
import { useState } from "react";

const Score = ({ defaultScore }) => {
  const [score, setScore] = useState(defaultScore);
  const [count, setCount] = useState(0);

  const upScore = () => {
    if (count === 1) return;
    setCount((prev) => prev + 1);
    setScore((prev) => prev + 1);
  };

  const downScore = () => {
    if (score === defaultScore) return;
    setCount(0);
    setScore((prev) => prev - 1);
  };
  return (
    <div className="bg-slate-200 dark:bg-neutral-600 p-1 max-w-[120px] h-[40px] md:h-[100px]  md:max-w-[40px] w-full rounded-lg">
      <div className="flex flex-row-reverse md:flex-col gap-2 justify-between items-center h-full">
        <button
          className="h-6 w-6 text-gray-500 dark:text-white  font-bold text-[16px]"
          aria-hidden
          aria-label="up score"
          onClick={upScore}
        >
          +
        </button>
        <span className="text-[14px] font-bold text-indigo-700 dark:text-yellow-500">
          {score}
        </span>
        <button
          className="h-6 w-6 text-gray-500 dark:text-white  font-bold text-[16px]"
          aria-hidden
          aria-label="down score"
          onClick={downScore}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Score;
