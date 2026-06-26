// State changes the allowed drag axis; the ref points to the constraint container.
import { useRef, useState } from "react";
import { motion } from "motion/react";

const DragPractice = () => {
  // Motion reads this ref to keep the final draggable item inside its parent.
  const containerRef = useRef(null);
  // `false` represents x-axis dragging; `true` switches it to the y-axis.
  const [axis, setAxis] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/40">
            Motion Drag
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight">
            Drag Gesture Practice
          </h1>

          <p className="mt-4 max-w-2xl text-white/60">
            Practice basic drag, axis locking, drag constraints, elasticity,
            momentum, and drag physics.
          </p>
        </div>

        <button
          // Switch the axis used by the second drag example.
          onClick={() => setAxis(!axis)}
          className="mb-10 rounded-xl bg-white px-5 py-2 font-semibold text-black"
        >
          Change Axis: {axis ? "Y Axis" : "X Axis"}
        </button>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* `drag` enables free pointer dragging; whileDrag styles the item during the gesture. */}
          <DemoCard title="1. Basic Drag">
            <motion.div
              drag
              whileDrag={{ scale: 1.15, rotate: 8 }}
              className="flex h-28 w-28 cursor-grab items-center justify-center rounded-3xl bg-blue-500 text-4xl active:cursor-grabbing"
            >
              🖐️
            </motion.div>
          </DemoCard>

          {/* Passing "x" or "y" to drag limits movement to one direction. */}
          <DemoCard title="2. Axis Lock">
            <motion.div
              drag={axis ? "y" : "x"}
              whileDrag={{ scale: 1.12 }}
              className="flex h-28 w-28 cursor-grab items-center justify-center rounded-3xl bg-green-500 text-4xl active:cursor-grabbing"
            >
              ↕️
            </motion.div>
          </DemoCard>

          {/* Disabling momentum stops the item immediately when it is released. */}
          <DemoCard title="3. No Momentum">
            <motion.div
              drag
              dragMomentum={false}
              whileDrag={{ scale: 1.1 }}
              className="flex h-28 w-28 cursor-grab items-center justify-center rounded-3xl bg-purple-500 text-4xl active:cursor-grabbing"
            >
              🧲
            </motion.div>
          </DemoCard>

          {/* Number constraints define how far the item can travel from its start point. */}
          <DemoCard title="4. Number Constraints">
            <motion.div
              drag
              dragConstraints={{
                top: -80,
                bottom: 80,
                left: -120,
                right: 120,
              }}
              dragElastic={0.2}
              whileDrag={{ scale: 1.12 }}
              className="flex h-28 w-28 cursor-grab items-center justify-center rounded-3xl bg-red-500 text-4xl active:cursor-grabbing"
            >
              🔒
            </motion.div>
          </DemoCard>
        </div>

        {/* A ref constraint uses the actual parent element as the draggable boundary. */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 text-2xl font-bold">
            5. Parent Container Constraint
          </h2>

          <div
            ref={containerRef}
            className="relative flex h-[420px] items-center justify-center overflow-hidden rounded-3xl border border-dashed border-white/20 bg-black/40"
          >
            <motion.div
              drag
              dragConstraints={containerRef}
              dragElastic={0.4}
              dragTransition={{
                bounceStiffness: 500,
                bounceDamping: 20,
              }}
              whileDrag={{
                scale: 1.15,
                rotate: 10,
              }}
              className="flex h-32 w-32 cursor-grab items-center justify-center rounded-3xl bg-yellow-400 text-5xl shadow-2xl active:cursor-grabbing"
            >
              🚀
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

// Reusable visual wrapper so each drag example has the same presentation.
const DemoCard = ({ title, children }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>

      <div className="flex h-64 items-center justify-center overflow-hidden rounded-3xl bg-black/40">
        {children}
      </div>
    </div>
  );
};

export default DragPractice;
