// Motion components can start an animation when they enter the viewport.
import { motion } from "motion/react";

// Each tuple supplies an emoji plus the two hues used for its card background.
const food = [
  ["🍅", 340, 10],
  ["🍊", 20, 40],
  ["🍋", 60, 90],
  ["🍐", 80, 120],
  ["🍏", 100, 140],
  ["🫐", 205, 245],
  ["🍆", 260, 290],
  ["🍇", 290, 320],
];

// Convert the saved hue number into a complete CSS color string.
const hue = (h) => `hsl(${h}, 100%, 50%)`;

// Named states make the same scroll-triggered entrance easy to reuse for each card.
const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const ScrollTriggered = () => {
  return (
    <div className="mx-auto my-[100px] w-full max-w-[500px] pb-[100px]">
      {food.map(([emoji, hueA, hueB], i) => (
        // Render one independently observable card for every food item.
        <Card
          key={emoji}
          i={i}
          emoji={emoji}
          hueA={hueA}
          hueB={hueB}
        />
      ))}
    </div>
  );
};

const Card = ({ emoji, hueA, hueB, i }) => {
  // Build the background from this card's two hue values.
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className={`card-container-${i} relative mb-[-120px] flex items-center justify-center overflow-hidden pt-5`}
      initial="offscreen"
      // `whileInView` switches to this variant when most of the wrapper enters view.
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background,
          clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
        }}
      />

      <motion.div
        // This child receives the matching named variant from its parent.
        variants={cardVariants}
        className="flex h-[430px] w-[300px] items-center justify-center rounded-[20px] bg-white text-[164px]"
        style={{
          boxShadow:
            "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
          transformOrigin: "10% 60%",
        }}
      >
        {emoji}
      </motion.div>
    </motion.div>
  );
};

export default ScrollTriggered;
