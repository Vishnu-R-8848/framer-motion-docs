// State selects which named variant the sidebar should animate to.
import { useState } from "react";
import { motion } from "motion/react";

// Navigation content rendered into the animated sidebar.
const menuItems = [
  {
    label: "Dashboard",
    icon: "🏠",
  },
  {
    label: "Components",
    icon: "🧩",
  },
  {
    label: "Animations",
    icon: "⚡",
  },
  {
    label: "Layouts",
    icon: "📐",
  },
  {
    label: "Settings",
    icon: "⚙️",
  },
];

// Variants group reusable animation targets under readable names.
// `when` and `staggerChildren` control the order and timing of child animations.
const sidebarVariants = {
  closed: {
    width: 96,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },

  open: {
    width: 320,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

// Child text inherits the parent variant name, then uses its matching target here.
const textVariants = {
  closed: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
    },
  },

  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const OrchestratedVariants = () => {
  // `isOpen` selects either the `open` or `closed` variant below.
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen rounded-3xl bg-neutral-950 p-6 text-white">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/40">
          Motion Variants
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Orchestrated Sidebar
        </h1>

        <p className="mt-3 max-w-xl text-white/60">
          Parent sidebar controls child text animations using variants,
          staggerChildren, and when.
        </p>
      </div>

      <motion.aside
        // Motion animates between the named targets whenever this value changes.
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="min-h-[620px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl"
      >
        <button
          // Flip the parent variant; its children animate in the configured order.
          onClick={() => setIsOpen((prev) => !prev)}
          className="mb-8 flex h-12 w-full items-center justify-center rounded-2xl bg-white font-semibold text-black"
        >
          {isOpen ? "Close" : "Open"}
        </button>

        <motion.ul className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <motion.li
              key={item.label}
              // Keep each row's position smooth while the sidebar width changes.
              layout
              className="flex items-center gap-4 rounded-2xl bg-white/10 p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl text-black">
                {item.icon}
              </span>

              <motion.span
                variants={textVariants}
                className="whitespace-nowrap text-lg font-semibold"
              >
                {item.label}
              </motion.span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.aside>
    </main>
  );
};

export default OrchestratedVariants;
