/* eslint-disable react/prop-types */
import clsx from "clsx";
import { forwardRef } from "react";

const Card = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <div
      {...rest}
      ref={ref}
      className={clsx(
        "transition-all shadow-sm flex flex-col-reverse md:flex-row bg-white min-h-10 max-w-full rounded-md p-3 gap-3 dark:bg-neutral-700",
        className
      )}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;
