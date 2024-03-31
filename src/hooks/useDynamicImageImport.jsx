import { useEffect, useState } from "react";

const useDynamicImageImport = (path) => {
  const [avatarSrc, setAvatarSrc] = useState(null);

  useEffect(() => {
    if (!path) return;

    const importImage = async () => {
      try {
        const baseUrl = "https://interactive-comment-section-delta.vercel.app";
        const fullPath = `${baseUrl}${path}`;
        console.log("Importing image from:", fullPath);
        const module = await import(/* webpackMode: "eager" */ `${fullPath}`);
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
