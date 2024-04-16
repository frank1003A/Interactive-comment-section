import clsx from "clsx";

export const getImage = (image, name, isHidden = false) => {
  return (
    <img
      draggable={false}
      className={clsx(
        "h-8 w-8 rounded-full md:block",
        isHidden ? "hidden" : ""
      )}
      src={image}
      alt={`${name} avatar`}
    />
  );
};
