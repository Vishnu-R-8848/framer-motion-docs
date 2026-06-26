// Imports: React state stores the control values; `motion` animates to each new value.
import { useState } from "react";
import { motion } from "motion/react";

const StateAnimations = () => {
  // State is the source of truth: changing a control gives Motion a new x, y, or rotate target.
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

  return (
    <main className="flex min-h-screen items-center justify-center rounded-3xl bg-neutral-950 p-6 text-white">
      <section className="flex w-full max-w-5xl flex-col items-center gap-12 rounded-3xl border border-white/10 bg-white/5 p-8 md:flex-row md:justify-center">
        {/* Animated preview: `animate` reads React state and smoothly moves to the latest values. */}
        <div className="flex h-[320px] w-full items-center justify-center rounded-3xl bg-black/30 md:w-[420px]">
          <motion.div
            animate={{
              x,
              y,
              rotate,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 20,
            }}
            className="h-[180px] w-[180px] rounded-3xl border-4 border-dotted border-purple-500 bg-purple-500/10"
          />
        </div>

        {/* Controls: each reusable Input updates one state setter passed from this component. */}
        <div className="flex w-full max-w-sm flex-col gap-6">
          <h1 className="text-3xl font-bold">State Animations</h1>

          <p className="text-sm leading-6 text-white/60">
            Change the input values. React state updates, and Motion animates
            the box to the new x, y, and rotate values.
          </p>

          <Input value={x} set={setX}>
            x
          </Input>

          <Input value={y} set={setY}>
            y
          </Input>

          <Input value={rotate} set={setRotate} min={-180} max={180}>
            rotate
          </Input>
        </div>
      </section>
    </main>
  );
};

// Reusable number-and-range control. Both inputs update the same state value.
const Input = ({ value, children, set, min = -200, max = 200 }) => {
  return (
    <label className="flex flex-col gap-3 rounded-2xl bg-white/10 p-4">
      <div className="flex items-center justify-between">
        <code className="rounded-lg bg-black px-3 py-1 text-sm text-purple-300">
          {children}
        </code>

        <input
          type="number"
          value={value}
          min={min}
          max={max}
          // Convert the browser's string value to a number before saving it in state.
          onChange={(e) => set(Number(e.target.value) || 0)}
          className="w-24 rounded-lg border border-white/10 bg-black px-3 py-2 text-right text-white outline-none focus:border-purple-500"
        />
      </div>

      <input
        value={value}
        type="range"
        min={min}
        max={max}
        onChange={(e) => set(Number(e.target.value))}
        className="w-full accent-purple-500"
      />
    </label>
  );
};

export default StateAnimations;
