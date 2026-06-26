// State decides whether the animated box is mounted in React.
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const ExitAnimation = () => {
  // When false, the box is removed after its exit animation finishes.
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-white">
      <div className="relative flex h-44 w-28 flex-col items-center">
        {/* AnimatePresence keeps a removed child mounted long enough to play `exit`. */}
        <AnimatePresence initial={false}>
          {isVisible && (
            <motion.div
              key="box"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              // `exit` is the animation used just before this conditional child unmounts.
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
              className="h-28 w-28 rounded-xl bg-purple-500"
            />
          )}
        </AnimatePresence>

        <motion.button
          // Toggle the conditional child so AnimatePresence can demonstrate both directions.
          onClick={() => setIsVisible((prev) => !prev)}
          // whileTap gives the control a short pressed-in response.
          whileTap={{ y: 2, scale: 0.96 }}
          className="absolute bottom-0 left-0 right-0 rounded-xl bg-purple-500 px-5 py-2 font-semibold text-white"
        >
          {isVisible ? "Hide" : "Show"}
        </motion.button>
      </div>
    </div>
  );
};

export default ExitAnimation;
