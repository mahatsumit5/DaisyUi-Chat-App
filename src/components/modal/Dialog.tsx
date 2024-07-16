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
  const { open, content, heading } = useAppSelector((store) => store.dialog);
  return (
    <AnimatePresence>
      <motion.div
        className="h-screen absolute w-screen bg-black/55 flex justify-center items-center transition-all"
        animate={open ? "open" : "closed"}
        variants={variants}
      >
        <motion.div
          className="w-[350px] bg-base-200 rounded-xl px-5 py-3 flex flex-col sm:min-w-[500px] shadow-lg"
          initial={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          animate={open ? "open" : "closed"}
          variants={variants}
        >
          <div className="flex justify-between items-center">
            <p className=" font-bold text-xl">{heading}</p>
            <button
              className="btn btn-circle btn-ghost hover:bg-primary"
              onClick={() => {
                dispatch(closeDialog());
              }}
            >
              <RxCross1 />
            </button>
          </div>
          <div className="min-h-14 flex justify-start">
            <p className="text-base ">{content}</p>
          </div>
          <div className="flex justify-end gap-5">
            <Button />
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

const Button = () => {
  const { type } = useAppSelector((store) => store.dialog);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  switch (type) {
    case "request":
      return (
        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            navigate("/friend-request");
            dispatch(closeDialog());
          }}
        >
          View
        </button>
      );
    case "login":
      return (
        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            navigate("/");
            dispatch(closeDialog());
            sessionStorage.clear();
          }}
        >
          Login
        </button>
      );

    case "password":
      return null;
    default:
      return null;
  }
};

export default Dialog;
