import clsx from "clsx";
import img1 from "/images/avatars/image-amyrobson.png";
import img2 from "/images/avatars/image-juliusomo.png";
import img3 from "/images/avatars/image-maxblagun.png";
import img4 from "/images/avatars/image-ramsesmiron.png";

const images = [
  { name: "amyrobson", img: img1 },
  { name: "juliusomo", img: img2 },
  { name: "maxblagun", img: img3 },
  { name: "ramsesmiron", img: img4 },
];

export const mapImage = (name) => {
  let avatar = images.filter((img) => img.name === name)[0];

  if (!avatar) return;

  return avatar.img;
};

export const getImage = (name, isHidden = false) => {
  return (
    <img
      draggable={false}
      className={clsx(
        "h-8 w-8 rounded-full md:block",
        isHidden ? "hidden" : ""
      )}
      src={mapImage(name)}
      alt={`${name} avatar`}
    />
  );
};
