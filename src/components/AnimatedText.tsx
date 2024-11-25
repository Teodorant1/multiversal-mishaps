// components/AnimatedText.tsx
import { motion } from "framer-motion";
import { type AnimatedTextProps } from "~/types/projecttypes";

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  const colors = [
    "text-blue-500",
    "text-purple-500",
    "text-pink-500",
    "text-green-500",
    "text-cyan-500",
  ];

  const letterVariants = {
    initial: {
      y: 0,
      opacity: 0.8,
    },
    animate: {
      y: [-10, 0, 10, 0],
      color: [
        "rgb(59,130,246)", // Blue
        "rgb(168,85,247)", // Purple
        "rgb(236,72,153)", // Pink
        "rgb(34,197,94)", // Green
        "rgb(6,182,212)", // Cyan
      ],
      transition: {
        y: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
        color: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
  };

  return (
    <motion.div
      className="flex space-x-1 text-4xl font-extrabold tracking-widest"
      initial="initial"
      animate="animate"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className={`${
            colors[index % colors.length]
          } transform transition-transform`}
          variants={letterVariants}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
