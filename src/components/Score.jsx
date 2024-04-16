/* eslint-disable react/prop-types */
import { useState } from "react";
import IconMinus from "../../images/icon-minus.svg";
import IconPlus from "../../images/icon-plus.svg";

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
    <div className="bg-slate-200 dark:bg-neutral-600 p-1 max-w-[100px] h-[40px] md:h-[100px]  md:max-w-[40px] w-full rounded-lg">
      <div className="flex flex-row-reverse md:flex-col gap-2 justify-between items-center h-full">
        <button
          className="h-6 w-6 text-gray-500 dark:text-white  font-bold text-[16px] flex items-center justify-center"
          aria-hidden
          aria-label="Increase score"
          onClick={upScore}
        >
          <img src={IconPlus} className="font-bold" />
        </button>
        <span className="text-[14px] font-bold text-indigo-700 dark:text-yellow-500">
          {score}
        </span>
        <button
          className="h-6 w-6 text-gray-500 dark:text-white  font-bold text-[16px] flex items-center justify-center"
          aria-hidden
          aria-label="Decrease score"
          onClick={downScore}
        >
          <img src={IconMinus} className="font-bold" />
        </button>
      </div>
    </div>
  );
};

export default Score;
