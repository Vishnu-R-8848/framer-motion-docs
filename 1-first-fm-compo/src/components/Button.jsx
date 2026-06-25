import React from "react";
import { motion } from "motion/react";

const Button = () => {
  return (
    <motion.div
    
      whileHover={{ scale: 1.5 }}
      whileTap={{ scale: 0.95 }}
      className="bg-blue-500 w-fit mx-auto my-auto text-white px-4 py-2 rounded-lg cursor-pointer"
    >
      Button
    </motion.div>
  );
};

export default Button;
