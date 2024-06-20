import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { closeToast, removeToast } from "../../redux/reducer/toast.slice";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
const variants = {
  open: { y: 0 },
  closed: { y: 100 },
};
function Toast() {
  const { position, align, isOpen, content } = useAppSelector(
    (store) => store.toast
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!content.length) return;
    const closeDialog = setTimeout(() => {
      dispatch(closeToast());

      return () => {
        clearTimeout(closeDialog);
      };
    }, 5000);
  }, [content.length, dispatch]);

  return (
    <AnimatePresence>
      <motion.div
        className={`toast toast-${position} toast-${align} z-50 ${
          isOpen ? "" : ""
        }`}
        initial={{ y: 0 }}
        transition={{ duration: 0.5 }}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
      >
        {content.map(({ message, type, id }) => (
          <motion.div className={`alert alert-${type}`} key={id}>
            <span>{message}</span>
            <button
              onClick={() => {
                dispatch(removeToast(id));
              }}
            >
              <IoMdClose color="white" size={20} />
            </button>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

export default Toast;
