import clsx from "clsx";

export function getImageUrl(name) {
  return new URL(name, import.meta.url);
}

export const getImage = (image, name, isHidden = false) => {
  return (
    <img
      className={clsx(
        "h-8 w-8 rounded-full md:block",
        isHidden ? "hidden" : ""
      )}
      src={getImageUrl(image)}
      alt={`${name}'s avatar`}
    />
  );
};
