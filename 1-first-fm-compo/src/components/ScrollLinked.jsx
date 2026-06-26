// State changes the visual direction; the ref identifies the element to measure.
import { useRef, useState } from "react";
import { motion, useScroll } from "motion/react";

// Page content provides enough height to demonstrate scroll progress.
const sections = [
  {
    title: "What is Scroll Linked?",
    text: "Scroll linked animation means the animation is directly connected to the page scroll position.",
  },
  {
    title: "useScroll Hook",
    text: "The useScroll hook gives us scrollYProgress, which moves from 0 to 1 as the page scrolls.",
  },
  {
    title: "Motion Value",
    text: "scrollYProgress is not a normal number. Motion updates it smoothly without React re-rendering every time.",
  },
  {
    title: "Progress Bar",
    text: "We can connect scrollYProgress to scaleX or scaleY.",
  },
  {
    title: "Real Use Cases",
    text: "Reading progress bars, scroll indicators, sticky animations, and parallax effects.",
  },
];

const ScrollLinked = () => {
  const [axis, setAxis] = useState("y");
  const containerRef = useRef(null);

  // useScroll returns a Motion Value from 0 to 1 instead of causing React re-renders on every scroll.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Use one boolean to choose which progress-bar JSX block should render.
  const isXAxis = axis === "x";

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen overflow-hidden rounded-3xl bg-neutral-950 text-white"
    >
      {/* Connect scrollYProgress directly to scaleX for a horizontal progress bar. */}
      {isXAxis && (
        <motion.div
          style={{
            scaleX: scrollYProgress,
            transformOrigin: "left",
          }}
          className="sticky top-0 z-40 h-3 w-full bg-red-500"
        />
      )}

      {/* The same Motion Value can drive scaleY for a vertical progress bar. */}
      {!isXAxis && (
        <motion.div
          style={{
            scaleY: scrollYProgress,
            transformOrigin: "top",
          }}
          className="absolute bottom-0 left-0 top-0 z-40 w-3 bg-red-500"
        />
      )}

      <button
        // Switch between the two visual uses of the same scroll progress value.
        onClick={() => setAxis(isXAxis ? "y" : "x")}
        className="sticky top-6 z-50 ml-auto mr-6 block rounded-xl bg-white px-5 py-2 font-semibold text-black shadow-lg"
      >
        Change to {isXAxis ? "Y Axis" : "X Axis"}
      </button>

      <article className="mx-auto flex max-w-2xl flex-col gap-10 px-5 py-32">
        <h1 className="text-5xl font-bold tracking-tight">
          Scroll Linked Animation
        </h1>

        <p className="text-lg leading-8 text-white/60">
          Current mode:{" "}
          <span className="font-bold text-red-400">
            {isXAxis ? "X Axis" : "Y Axis"}
          </span>
        </p>

        {sections.map((section, idx) => (
          <section
            key={section.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-8"
          >
            <span className="text-sm font-bold text-red-400">
              0{idx + 1}
            </span>

            <h2 className="mt-3 text-3xl font-bold">{section.title}</h2>

            <p className="mt-4 text-lg leading-8 text-white/60">
              {section.text}
            </p>
          </section>
        ))}

        <div className="h-[600px] rounded-3xl border border-dashed border-white/20 p-8 text-white/40">
          Extra height added so you can scroll more.
        </div>
      </article>
    </main>
  );
};

export default ScrollLinked;
