import { RxCross1 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../../hook";
import Profile from "../messages/Profile";
import { toggleDialog } from "../../redux-slice/dialog.slice";
import { motion, AnimatePresence } from "framer-motion";
const variants = {
  open: { opacity: 1, scale: 1 },
  closed: { opacity: 0, scale: 0 },
};
const Dialog = () => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((store) => store.dialog);
  return (
    <AnimatePresence>
      <motion.div
        className="h-screen absolute w-screen bg-black/55 flex justify-center items-center transition-all"
        animate={open ? "open" : "closed"}
        variants={variants}
      >
        <motion.div
          className="w-[350px] bg-white rounded-xl p-2 flex flex-col sm:min-w-[500px] shadow-lg"
          initial={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          animate={open ? "open" : "closed"}
          variants={variants}
        >
          <div className="flex justify-end">
            <button
              className="btn btn-circle btn-ghost"
              onClick={() => {
                dispatch(toggleDialog());
              }}
            >
              <RxCross1 />
            </button>
          </div>
          <div className="min-h-52">
            <Profile type="allUsers" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Dialog;
