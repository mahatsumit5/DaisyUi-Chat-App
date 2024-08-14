import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { emojiArrayConverted } from "../../assets/emoji";
import { IoMdClose } from "react-icons/io";

const EmojiBox: React.FC<{
  isOpen: boolean;
  setEmojiOpen: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
}> = ({ isOpen, setEmojiOpen, setMessage }) => {
  return (
    <motion.div
      className="absolute top-52 w-[400px]  bg-base-100 border rounded-md shadow-md  flex flex-col z-50"
      animate={isOpen ? "open" : "closed"}
      variants={{
        open: {
          opacity: 1,
          height: "300px",
        },
        closed: {
          opacity: 0,
          height: 0,
        },
      }}
      transition={{ duration: 0.4 }}
    >
      <header className="flex justify-between w-full p-2 gap-2">
        <input
          type="text"
          className="input input-sm w-full bg-base-200 border-primary focus:outline-none rounded-md"
          placeholder="Search..."
        />

        <button
          className="btn btn-xs btn-circle"
          onClick={() => {
            setEmojiOpen(false);
          }}
          type="button"
        >
          <IoMdClose />
        </button>
      </header>

      <nav className="bg-base-300 h-10 p-2">navbar</nav>

      <section className="h-full overflow-y-auto flex  flex-wrap gap-2 p-3">
        {emojiArrayConverted.map((item, index) => (
          <span
            key={index}
            className="text-2xl hover:cursor-pointer hover:scale-110 hover:shadow-xl"
            onClick={() => {
              setMessage((prev) => prev + item);
            }}
          >
            {item}
          </span>
        ))}
      </section>
    </motion.div>
  );
};

export default EmojiBox;
