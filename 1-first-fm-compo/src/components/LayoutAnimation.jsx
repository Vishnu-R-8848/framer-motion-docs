// State controls the list/grid arrangement and which card is expanded.
import { useState } from "react";
import { motion } from "motion/react";

// Card content stays separate from the animation and rendering logic.
const items = [
  {
    id: 1,
    title: "Flexbox",
    desc: "Animate row and column layout changes.",
  },
  {
    id: 2,
    title: "Grid",
    desc: "Animate list to grid transitions smoothly.",
  },
  {
    id: 3,
    title: "Expand",
    desc: "Click a card and make it larger.",
  },
  {
    id: 4,
    title: "Spring",
    desc: "Customize layout animation using transition.",
  },
];

const LayoutAnimation = () => {
  // Motion compares layout changes caused by these state values and animates between them.
  const [isGrid, setIsGrid] = useState(false);
  const [activeId, setActiveId] = useState(null);

  return (
    <main className="min-h-screen bg-neutral-950 px-5 py-20 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/40">
              Motion Layout
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Layout Animation Practice
            </h1>

            <p className="mt-3 max-w-xl text-white/60">
              Click the button to change layout. Click a card to expand it.
            </p>
          </div>

          <button
            // Toggle the container's CSS layout without changing its route or data.
            onClick={() => setIsGrid(!isGrid)}
            className="w-fit rounded-xl bg-white px-5 py-2 font-semibold text-black"
          >
            Change to {isGrid ? "List" : "Grid"}
          </button>
        </div>

        <motion.div
          // `layout` automatically animates position and size when this class changes.
          layout
          className={
            isGrid
              ? "grid grid-cols-1 gap-5 md:grid-cols-2"
              : "flex flex-col gap-5"
          }
        >
          {items.map((item) => {
            const isActive = activeId === item.id;

            return (
              <motion.div
                // Each card also opts in so expanding one animates nearby cards smoothly.
                layout
                key={item.id}
                onClick={() => setActiveId(isActive ? null : item.id)}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                className={`cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl ${
                  isActive ? "md:col-span-2" : ""
                }`}
              >
                <motion.div layout className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{item.title}</h2>

                  <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-black">
                    0{item.id}
                  </span>
                </motion.div>

                <motion.p layout className="mt-4 text-white/60">
                  {item.desc}
                </motion.p>

                {/* This extra content changes the card's layout when it is active. */}
                {isActive && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 rounded-2xl bg-black/40 p-5 text-white/70"
                  >
                    This card expanded because its layout changed. Motion
                    automatically animated the size and position.
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </main>
  );
};

export default LayoutAnimation;
