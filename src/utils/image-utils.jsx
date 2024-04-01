export function getImageUrl(name) {
  return new URL(`${name}`, import.meta.url);
}

export const getImage = (image, name) => {
  return (
    <img
      className="h-8 w-8 rounded-full hidden lg:block"
      src={getImageUrl(image)}
      alt={`${name}'s avatar`}
    />
  );
};
