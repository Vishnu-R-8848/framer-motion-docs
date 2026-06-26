// React state stores which theme is currently selected.
import { useState } from "react";
import { motion } from "motion/react";

const DarkMode = () => {
  // Changing this state updates the theme text, colors, and switch position.
  const [isDark, setIsDark] = useState(true);

  // Use the previous value so the toggle is always based on the latest state.
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        isDark ? "bg-neutral-950 text-white" : "bg-neutral-100 text-black"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold">
          {isDark ? "Dark Mode" : "Light Mode"}
        </h1>

        <button
          onClick={toggleTheme}
          className={`flex h-12 w-24 items-center rounded-full p-1 transition-colors duration-300 ${
            isDark ? "justify-end bg-purple-600" : "justify-start bg-yellow-400"
          }`}
        >
          {/* `layout` automatically animates the knob between its old and new positions. */}
          <motion.div
            layout
            transition={{
              type: "spring",
              bounce: 0.8,
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-lg"
          >
            {isDark ? "🌙" : "☀️"}
          </motion.div>
        </button>

        <p className="text-sm opacity-60">Click the switch to change theme</p>
      </div>
    </div>
  );
};

export default DarkMode;
