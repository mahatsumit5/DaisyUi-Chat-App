import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { motion, AnimatePresence } from "framer-motion";

const CommentDialog = () => {
  const modelRef = useRef(null);
  const variants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0 },
  };
  const { isOpen } = useAppSelector((store) => store.comment);

  return (
    <AnimatePresence>
      <motion.div
        className="h-[500px]  w-full  md:w-[800px] rounded-md absolute bottom-0 p-3 bg-black flex justify-center items-center transition-all overflow-hidden"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        ref={modelRef}
      ></motion.div>
    </AnimatePresence>
  );
};

export default CommentDialog;
