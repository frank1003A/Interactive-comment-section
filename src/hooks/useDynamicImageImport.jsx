import { useEffect, useState } from "react";

const useDynamicImageImport = (path) => {
  const [avatarSrc, setAvatarSrc] = useState(null);

  useEffect(() => {
    if (!path) return;

    const importImage = async () => {
      try {
        const module = await import(path);
        setAvatarSrc(module.default);
      } catch (error) {
        console.error("Error importing image:", error);
      }
    };

    importImage();
  }, [path]);

  return { avatarSrc };
};

export default useDynamicImageImport;
