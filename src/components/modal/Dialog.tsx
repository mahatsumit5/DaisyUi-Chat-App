import { RxCross1 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../../hook";
import { closeDialog } from "../../redux/reducer/dialog.slice";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
const variants = {
  open: { opacity: 1, scale: 1 },
  closed: { opacity: 0, scale: 0 },
};
const Dialog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { open, content, heading } = useAppSelector((store) => store.dialog);
  return (
    <AnimatePresence>
      <motion.div
        className="h-screen absolute w-screen bg-black/55 flex justify-center items-center transition-all"
        animate={open ? "open" : "closed"}
        variants={variants}
      >
        <motion.div
          className="w-[350px] bg-white rounded-xl px-5 py-3 flex flex-col sm:min-w-[500px] shadow-lg"
          initial={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          animate={open ? "open" : "closed"}
          variants={variants}
        >
          <div className="flex justify-between items-center">
            <p className=" text-gray-900 text-xl">{heading}</p>
            <button
              className="btn btn-circle btn-ghost"
              onClick={() => {
                dispatch(closeDialog());
              }}
            >
              <RxCross1 />
            </button>
          </div>
          <div className="min-h-14 flex justify-start">
            <p className="text-lg ">{content}</p>
          </div>
          <div className="flex justify-end gap-5">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                navigate("/friend-request");
                dispatch(closeDialog());
              }}
            >
              View
            </button>
            <button
              className="btn btn-sm btn-error"
              onClick={() => {
                dispatch(closeDialog());
              }}
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Dialog;
