// One state value starts or resets the comparison animations.
import { useState } from "react";
import { motion } from "motion/react";

const TransitionPractice = () => {
  // Every row reads this value, so one click lets you compare transition styles.
  const [move, setMove] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-950 p-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/40">
              Motion Transition
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Transition Practice
            </h1>

            <p className="mt-3 text-white/60">
              Click the button and compare how each animation feels.
            </p>
          </div>

          <button
            // Toggle the shared animation target for all examples.
            onClick={() => setMove(!move)}
            className="rounded-xl bg-white px-5 py-2 font-semibold text-black"
          >
            Animate
          </button>
        </div>

        <div className="flex flex-col gap-10">
          {/* A tween reaches the target over a fixed duration with an easing curve. */}
          <AnimationRow title="Tween / Duration">
            <motion.div
              animate={{ x: move ? 320 : 0 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="h-20 w-20 rounded-2xl bg-blue-500"
            />
          </AnimationRow>

          {/* A spring can overshoot the target; `bounce` controls that playful effect. */}
          <AnimationRow title="Spring / Bounce">
            <motion.div
              animate={{ x: move ? 320 : 0 }}
              transition={{
                type: "spring",
                bounce: 0.6,
                duration: 0.8,
              }}
              className="h-20 w-20 rounded-2xl bg-green-500"
            />
          </AnimationRow>

          {/* Stiffness, damping, and mass provide more direct spring-physics control. */}
          <AnimationRow title="Spring / Stiffness + Damping">
            <motion.div
              animate={{ x: move ? 320 : 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 15,
                mass: 1,
              }}
              className="h-20 w-20 rounded-2xl bg-purple-500"
            />
          </AnimationRow>

          {/* Each animated property can use its own transition settings. */}
          <AnimationRow title="Property Specific">
            <motion.div
              animate={{
                x: move ? 320 : 0,
                scale: move ? 1.4 : 1,
                rotate: move ? 180 : 0,
              }}
              transition={{
                x: {
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                },
                scale: {
                  duration: 0.4,
                  ease: "easeOut",
                },
                rotate: {
                  duration: 1,
                  ease: "linear",
                },
              }}
              className="h-20 w-20 rounded-2xl bg-red-500"
            />
          </AnimationRow>

          {/* Repeat with `mirror` continuously moves back and forth between the values. */}
          <AnimationRow title="Repeat / Mirror">
            <motion.div
              animate={{
                x: [0, 320],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: 0.3,
                ease: "easeInOut",
              }}
              className="h-20 w-20 rounded-2xl bg-yellow-500"
            />
          </AnimationRow>
        </div>
      </div>
    </main>
  );
};

// Shared row layout keeps the focus on how each transition feels.
const AnimationRow = ({ title, children }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-6 text-xl font-bold">{title}</h2>

      <div className="relative h-24 overflow-hidden rounded-2xl bg-black/40 p-2">
        {children}
      </div>
    </div>
  );
};

export default TransitionPractice;
