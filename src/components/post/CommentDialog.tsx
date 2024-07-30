import { useAppSelector } from "../../hook";
import { motion, AnimatePresence } from "framer-motion";

const CommentDialog = () => {
  const variants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0 },
  };
  const { isOpen } = useAppSelector((store) => store.comment);
  return (
    <AnimatePresence>
      <motion.div
        className="h-screen absolute top-0 w-screen bg-black/55 flex justify-center items-center transition-all overflow-x-hidden"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
      >
        <div className="h-52 bg-white">sdf</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommentDialog;
