import clsx from "clsx";
import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

// eslint-disable-next-line react/prop-types
const ThemeSwitcher = ({ position }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    const inputboxes = document.querySelectorAll("textarea, [role='textbox']");

    inputboxes.forEach((input) => {
      input.addEventListener("focusin", () => setIsVisible(false));
      input.addEventListener("focusout", () => setIsVisible(true));
    });

    return () => {
      inputboxes.forEach((input) => {
        input.removeEventListener("focusin", () => setIsVisible(false));
        input.removeEventListener("focusout", () => setIsVisible(true));
      });
    };
  });

  return (
    <button
      role="button"
      onClick={toggleDarkMode}
      className={clsx(
        " bg-indigo-700 dark:bg-yellow-500 p-2 rounded-md shadow-lg transition-all",
        position === "fixed" || !position ? "fixed bottom-10 left-8 z-50" : "",
        isVisible ? "-translate-y-[8px]" : "translate-y-[500px]"
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
