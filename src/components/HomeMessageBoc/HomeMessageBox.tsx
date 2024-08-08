import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../hook";
import { IoMdClose } from "react-icons/io";
import { toggleMessageBox } from "../../redux/reducer/HomeMessageBox";
import { FaExpandAlt } from "react-icons/fa";

import Chatbox from "../Chatbox";

const variants = {
  open: { opacity: 1, display: "block" },
  closed: { opacity: 0, display: "hidden" },
};
const variants2 = {
  open: { height: "700px" },
  closed: { height: "30px" },
};

const HomeMessageBox = () => {
  const dispatch = useAppDispatch();
  const [expand, setExpand] = useState<boolean>(false);
  const { isOpen } = useAppSelector((state) => state.messageBox);
  return (
    <AnimatePresence>
      <motion.div
        className=" border   rounded-lg fixed bottom-4 w-[350px] bg-base-100 right-20 "
        animate={isOpen ? "open" : "closed"}
        transition={{ ease: "easeOut", duration: 0.5 }}
        variants={variants}
      >
        <motion.div
          className="flex flex-col w-full overflow-y-scroll"
          animate={expand ? "open" : "closed"}
          transition={{ ease: "easeOut", duration: 0.5 }}
          variants={variants2}
        >
          <header className="flex bg-primary-content items-center rounded-t-lg text-primary-content justify-between h-12 p-2 border-b ">
            <p className="text-primary">Message</p>
            <div className="flex gap-4">
              <button
                className="btn btn-xs btn-circle btn-outline bg-primary"
                onClick={() => {
                  setExpand(!expand);
                }}
              >
                <FaExpandAlt />
              </button>
              <button
                className="btn btn-xs btn-circle btn-outline bg-primary"
                onClick={() => {
                  dispatch(toggleMessageBox({ isOpen: false, chatRoom: null }));
                }}
              >
                <IoMdClose />
              </button>
            </div>
          </header>

          {expand && <Chatbox />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HomeMessageBox;
