import { AnimatePresence, motion } from "framer-motion";

export const Slideshow = ({ image }: { image: string }) => (
  <AnimatePresence>
    <motion.img
      key={image}
      src={image}
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      exit={{ x: -200, opacity: 0 }}
      className="object-cover"
    />
  </AnimatePresence>
);
