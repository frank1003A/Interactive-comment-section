import clsx from "clsx";
import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

// eslint-disable-next-line react/prop-types
const ThemeSwitcher = ({ position }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      role="button"
      onClick={toggleDarkMode}
      className={clsx(
        " bg-indigo-700 dark:bg-yellow-500 p-2 rounded-md shadow-lg",
        position === "fixed" || !position ? "fixed bottom-10 left-8 z-50" : ""
      )}
    >
      <DarkModeSwitch
        sunColor="#FFF"
        moonColor="#FFF"
        checked={darkMode}
        size={30}
      />
    </button>
  );
};

export default ThemeSwitcher;
