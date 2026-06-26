// These values let the examples remember hover visits and like status.
import { useState } from "react";
import { motion } from "motion/react";

const GesturePractice = () => {
  // State changes only when the matching interaction happens.
  const [hoverCount, setHoverCount] = useState(0);
  const [liked, setLiked] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/40">
            Motion Gestures
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight">
            App Quality Gestures
          </h1>

          <p className="mt-4 max-w-2xl text-white/60">
            Practice hover, tap, focus, event listeners, and nested gesture
            control.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* whileHover and whileTap temporarily animate a component during those gestures. */}
          <motion.button
            whileHover={{
              scale: 1.05,
              y: -6,
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 18,
            }}
            className="rounded-3xl bg-blue-500 p-8 text-left shadow-xl"
          >
            <h2 className="text-2xl font-bold">Hover + Tap</h2>
            <p className="mt-3 text-white/80">
              Hover makes it lift. Tap makes it press down.
            </p>
          </motion.button>

          {/* Motion gesture callbacks can update normal React state too. */}
          <motion.div
            onHoverStart={() => setHoverCount((prev) => prev + 1)}
            onHoverEnd={() => console.log("Hover ended")}
            whileHover={{
              rotate: 2,
              scale: 1.03,
            }}
            className="rounded-3xl bg-purple-500 p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold">Hover Events</h2>
            <p className="mt-3 text-white/80">
              Hovered {hoverCount} times.
            </p>
          </motion.div>

          {/* whileFocus supports keyboard users as well as mouse or touch users. */}
          <motion.button
            whileFocus={{
              rotate: -2,
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.92,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 14,
            }}
            className="rounded-3xl bg-green-500 p-8 text-left shadow-xl outline-none ring-offset-4 focus:ring-4 focus:ring-green-300"
          >
            <h2 className="text-2xl font-bold">Focus + Tap</h2>
            <p className="mt-3 text-white/80">
              Click it or press Tab, then Enter.
            </p>
          </motion.button>

          {/* Clicking changes state, then `animate` uses that state to play a keyframe sequence. */}
          <motion.button
            onClick={() => setLiked(!liked)}
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.9,
            }}
            className="rounded-3xl bg-white p-8 text-left text-black shadow-xl"
          >
            <motion.span
              animate={{
                scale: liked ? [1, 1.4, 1] : 1,
                rotate: liked ? [0, -10, 10, 0] : 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className="block text-6xl"
            >
              {liked ? "❤️" : "🤍"}
            </motion.span>

            <h2 className="mt-5 text-2xl font-bold">Like Gesture</h2>
            <p className="mt-3 text-black/60">
              Tap to toggle state and animate the icon.
            </p>
          </motion.button>
        </div>

        {/* The child stops propagation so its click does not also trigger the parent card. */}
        <motion.div
          whileTap={{
            scale: 0.98,
          }}
          onClick={() => alert("Parent card clicked")}
          className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8"
        >
          <h2 className="text-2xl font-bold">Parent Card</h2>

          <p className="mt-3 text-white/60">
            Clicking the card triggers parent click. But clicking the inner
            button will not trigger the parent.
          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.9,
            }}
            onPointerDownCapture={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              alert("Inner button clicked");
            }}
            className="mt-6 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white"
          >
            Inner Button
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
};

export default GesturePractice;
