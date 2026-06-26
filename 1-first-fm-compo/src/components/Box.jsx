// `motion.div` is a normal div with animation and gesture props.
import { motion } from "motion/react";

const Box = () => {
  return (
    <motion.div
      // These values describe how the box enters, animates, and leaves the page.
      initial={{ opacity: 0, scale: 0.5, x: 100 }}
      animate={{ opacity: 1, scale: 1, x: [100, 200, 0] }}
      exit={{ opacity: 0, scale: 0.5 }}
      // whileHover and whileTap apply only while the pointer is hovering or pressing.
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="bg-purple-500 size-50 "
    ></motion.div>
  );
};

export default Box;
