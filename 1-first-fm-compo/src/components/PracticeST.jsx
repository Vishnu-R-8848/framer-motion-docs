// useNavigate lets the back button change history without a regular page reload.
import { useNavigate } from "react-router";
import { motion } from "motion/react";

// Data drives one scroll-reveal card per food item.
const foodItems = [
  {
    emoji: "🍅",
    name: "Tomato",
    desc: "Fresh red energy",
    gradient: "linear-gradient(135deg, #ff416c, #ff4b2b)",
  },
  {
    emoji: "🍊",
    name: "Orange",
    desc: "Bright citrus mood",
    gradient: "linear-gradient(135deg, #f7971e, #ffd200)",
  },
  {
    emoji: "🍋",
    name: "Lemon",
    desc: "Sharp yellow freshness",
    gradient: "linear-gradient(135deg, #fceabb, #f8b500)",
  },
  {
    emoji: "🍐",
    name: "Pear",
    desc: "Soft green balance",
    gradient: "linear-gradient(135deg, #a8e063, #56ab2f)",
  },
  {
    emoji: "🫐",
    name: "Blueberry",
    desc: "Cool blue flavor",
    gradient: "linear-gradient(135deg, #4776e6, #8e54e9)",
  },
  {
    emoji: "🍆",
    name: "Eggplant",
    desc: "Deep purple style",
    gradient: "linear-gradient(135deg, #41295a, #2f0743)",
  },
];

// Variants define the named off-screen and visible states for every card.
// The `idx` custom value lets each card have a slightly different entrance.
const cardVariants = {
  hidden: (idx) => ({
    opacity: 0,
    y: 120,
    scale: 0.85,
    rotate: idx % 2 === 0 ? -8 : 8,
  }),

  visible: (idx) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.35,
      duration: 0.8,
      delay: idx * 0.08,
    },
  }),
};

const PracticeST = () => {
  // This router helper is used by the fixed Go Back button.
  const navigate = useNavigate();

  return (
    <main
      className="min-h-screen px-5 py-10"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)",
        backgroundSize: "22px 22px",
      }}
    >
      <button
        // -1 means go back one entry in browser history.
        onClick={() => navigate(-1)}
        className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-xl bg-black px-5 py-2 text-white shadow-lg"
      >
        Go Back
      </button>

      <section className="mx-auto max-w-5xl pt-24">
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black/50">
            Motion Practice
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight">
            Scroll Reveal Food Cards
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-black/60">
            Each card enters when it comes into view. The animation changes
            slightly based on its index.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {foodItems.map((item, idx) => (
            <motion.article
              key={item.name}
              // Pass this item's index to the variant functions above.
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              // Start the visible variant when enough of the card scrolls into view.
              whileInView="visible"
              viewport={{ amount: 0.4, once: false }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="group overflow-hidden rounded-[2rem] bg-white shadow-xl"
            >
              <div
                style={{ background: item.gradient }}
                className="flex h-64 items-center justify-center"
              >
                <motion.span
                  // A small hover gesture makes the emoji feel responsive.
                  whileHover={{ rotate: 12, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-8xl"
                >
                  {item.emoji}
                </motion.span>
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{item.name}</h2>

                  <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                    #{idx + 1}
                  </span>
                </div>

                <p className="text-black/60">{item.desc}</p>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-black/10">
                  <motion.div
                    // This fills the progress bar whenever its card is in the viewport.
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2,
                    }}
                    className="h-full rounded-full bg-black"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PracticeST;
