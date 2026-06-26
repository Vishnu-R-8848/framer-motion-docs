// Imports: refs find the two DOM elements, state prevents duplicate clicks,
// and Motion provides imperative animation tools and Motion Values.
import { useRef, useState } from "react";
import { arc, motion, useAnimate, useMotionValue } from "motion/react";

// Animation measurements: these constants keep the flying product proportional to the basket.
const PRODUCT_SIZE = 160;
const BASKET_BOX = 56;
const FLY_SCALE = BASKET_BOX / PRODUCT_SIZE;

const AddToBasket = ({
  strength = 0.5,
  peak = 0.15,
  rotate = 0.9,
  duration = 0.45,
  basketVelocityFactor = 0.05,
  direction = "cw",
} = {}) => {
  // `useAnimate` returns a scope ref and an `animate` function for running animation sequences in code.
  const [scope, animate] = useAnimate();

  // Element refs let the click handler measure the current product, basket, and ripple positions.
  const productRef = useRef(null);
  const basketRef = useRef(null);
  const ringRef = useRef(null);

  // While the product is moving, disable the button so a second sequence cannot start.
  const [isFlying, setIsFlying] = useState(false);

  // Motion Values keep track of movement velocity for the basket's follow-up bounce.
  const productX = useMotionValue(0);
  const productY = useMotionValue(0);

  const addToBasket = async () => {
    // Read the current DOM nodes once at the start of the animation.
    const product = productRef.current;
    const basket = basketRef.current;
    const ring = ringRef.current;

    // Exit safely if an element is unavailable or an animation is already in progress.
    if (!product || !basket || !ring || isFlying) return;

    setIsFlying(true);

    // Compare the elements' screen rectangles to calculate the distance from product to basket.
    const from = product.getBoundingClientRect();
    const to = basket.getBoundingClientRect();

    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);

    // First sequence: fly and shrink the product along an arc. `await` waits for it to finish.
    await animate(
      product,
      {
        x: dx,
        y: dy,
        scale: FLY_SCALE,
        opacity: [1, 1, 0],
      },
      {
        duration,
        path: arc({
          strength,
          peak,
          rotate,
          direction: direction === "auto" ? undefined : direction,
        }),
        ease: [0.74, 0.18, 0.93, 0.69],
        opacity: {
          inherit: true,
          times: [0, 0.95, 1],
        },
      },
    );

    // Follow-up feedback: the basket bounces using the product's ending velocity.
    animate(
      basket,
      {
        x: [0, 14, 0],
        y: [0, -12, 0],
      },
      {
        type: "spring",
        stiffness: 500,
        damping: 12,
        x: {
          inherit: true,
          velocity: productX.getVelocity() * basketVelocityFactor,
        },
        y: {
          inherit: true,
          velocity: productY.getVelocity() * basketVelocityFactor,
        },
      },
    );

    // A short expanding ring makes the successful drop easier to notice.
    animate(
      ring,
      {
        scale: [1, 2.2],
        opacity: [0.8, 0],
      },
      {
        duration: 0.5,
        ease: "easeOut",
      },
    );

    // Reset the product immediately before playing its reappearance animation.
    animate(
      product,
      {
        x: 0,
        y: 0,
        scale: 0.9,
        rotate: 0,
        opacity: 0,
        clipPath: "inset(0%)",
      },
      {
        duration: 0,
      },
    );

    // Bring the product back with a spring so the demo can be repeated.
    await animate(
      product,
      {
        opacity: 1,
        scale: 1,
      },
      {
        scale: {
          type: "spring",
          visualDuration: 0.4,
          bounce: 0.35,
        },
        opacity: {
          duration: 0.25,
          ease: "easeOut",
        },
      },
    );

    setIsFlying(false);
  };

  return (
    // `scope` marks the area owned by useAnimate; refs identify the individual animated elements.
    <main
      ref={scope}
      className="relative flex min-h-screen items-center justify-center overflow-hidden rounded-3xl bg-neutral-950 text-white"
    >
      <motion.div
        ref={basketRef}
        className="absolute right-10 top-10 flex h-14 w-14 items-center justify-center border border-white/20 bg-white/10 text-purple-400"
      >
        <motion.div
          ref={ringRef}
          className="pointer-events-none absolute -inset-[1px] border border-purple-400 opacity-0"
        />

        <BasketIcon />
      </motion.div>

      <section className="flex flex-col items-center gap-5">
        <motion.div
          // These Motion Values expose the product's movement data to the animation logic above.
          ref={productRef}
          style={{
            x: productX,
            y: productY,
          }}
          className="flex h-40 w-40 items-center justify-center border border-white/20 bg-white/10 will-change-transform"
        >
          <span className="select-none text-[84px] leading-none">👟</span>
        </motion.div>

        <div className="flex items-baseline gap-3 text-sm tracking-wider">
          <span>Campus 00s</span>
          <span className="text-purple-400">₹12,800</span>
        </div>

        <motion.button
          type="button"
          onClick={addToBasket}
          disabled={isFlying}
          // Gesture props give instant visual feedback without changing React state.
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`mt-1 bg-purple-500 px-7 py-3 text-xs font-bold uppercase tracking-[0.18em] text-black transition ${
            isFlying ? "pointer-events-none opacity-55" : "opacity-100"
          }`}
        >
          Add to basket
        </motion.button>
      </section>
    </main>
  );
};

// Presentational SVG kept separate so the animation component stays focused on its interaction flow.
const BasketIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 11-1 9" />
      <path d="m19 11-4-7" />
      <path d="M2 11h20" />
      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
      <path d="M4.5 15.5h15" />
      <path d="m5 11 4-7" />
      <path d="m9 11 1 9" />
    </svg>
  );
};

export default AddToBasket;
