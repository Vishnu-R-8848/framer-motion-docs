// Motion Values update animated styles efficiently; useTransform derives new values from them.
import { motion, useMotionValue, useTransform } from "motion/react";

const UseTransform = () => {
  // `x` stores the draggable horizontal position without re-rendering React for every drag frame.
  const x = useMotionValue(0);

  // These input positions are shared by the color and background mappings below.
  const xInput = [-100, 0, 100];

  // useTransform maps x positions to a matching background gradient.
  const background = useTransform(x, xInput, [
    "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
    "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
  ]);

  // The SVG stroke color follows the same x position with its own output range.
  const color = useTransform(x, xInput, [
    "rgb(211, 9, 225)",
    "rgb(68, 0, 255)",
    "rgb(3, 209, 0)",
  ]);

  // Map drag ranges to SVG path lengths: right reveals a tick, left reveals a cross.
  const tickPath = useTransform(x, [10, 100], [0, 1]);
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);

  return (
    <main className="flex min-h-screen items-center justify-center rounded-3xl bg-neutral-950 p-6">
      <motion.div
        // A Motion Value can be assigned directly to an inline style.
        style={{ background }}
        className="flex h-[300px] w-full max-w-[500px] items-center justify-center rounded-3xl"
      >
        <motion.div
          // Drag updates x; constraints keep the element centered while allowing elastic movement.
          style={{ x }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          className="h-[140px] w-[140px] cursor-grab rounded-3xl bg-white p-5 active:cursor-grabbing"
        >
          <svg viewBox="0 0 50 50" className="h-full w-full">
            {/* The circle stroke changes color as the draggable item moves. */}
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
              style={{
                x: 5,
                y: 5,
              }}
            />

            {/* pathLength of 0 hides a path and 1 draws its full length. */}
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M14,26 L22,33 L35,16"
              strokeDasharray="0 1"
              style={{
                pathLength: tickPath,
              }}
            />

            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M17,17 L33,33"
              strokeDasharray="0 1"
              style={{
                pathLength: crossPathA,
              }}
            />

            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M33,17 L17,33"
              strokeDasharray="0 1"
              style={{
                pathLength: crossPathB,
              }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default UseTransform;
