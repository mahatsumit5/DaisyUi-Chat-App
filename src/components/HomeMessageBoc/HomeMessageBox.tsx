import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../hook";
import { IoMdClose } from "react-icons/io";
import { toggleMessageBox } from "../../redux/reducer/HomeMessageBox";
import { FaExpandAlt } from "react-icons/fa";
import { Avatar } from "../Avatar/Avatar";
import { extractInitial } from "../../utils";
import MessageDisplay from "../messages/MessageDisplay";
import { IChatRoom, IUser } from "../../types";
import { useGetMessagesQuery } from "../../redux";
import MessageInput from "../messages/MessageInput";
import useMessageHook from "../../hooks/useMessage.hook";
import UserIsTyping from "../messages/UserIsTyping";

const variants = {
  open: { opacity: 1, display: "block" },
  closed: { opacity: 0, display: "hidden" },
};
const variants2 = {
  open: { height: "700px", width: "500px" },
  closed: { height: "50px", width: "350px" },
};

const HomeMessageBox = () => {
  const { numOfMessages, setNumofMessages } = useMessageHook();
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { isTyping } = useAppSelector((store) => store.socket);

  const [expand, setExpand] = useState<boolean>(false);
  const { isOpen, chatRoom } = useAppSelector((state) => state.messageBox);
  const { user } = useAppSelector((state) => state.user);
  const { data, error, isLoading } = useGetMessagesQuery(
    {
      roomId: chatRoom?.id || "",
      num: numOfMessages,
    },
    {
      skip: !isOpen,
    }
  );

  useEffect(() => {
    const height = messageBoxRef.current?.scrollHeight;
    if (messageBoxRef.current && height) {
      messageBoxRef.current.scrollTop = height;
    }
  }, [data, isTyping]);

  useEffect(() => {
    const messageBox = messageBoxRef.current;
    const handleScroll = () => {
      // const messageBoxHeight = messageBox?.scrollHeight;
      if (messageBox?.scrollTop === 0) {
        setNumofMessages((prev) => prev + 5);
      }
    };
    if (messageBox) {
      messageBox.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (messageBox) {
        messageBox.removeEventListener("scroll", handleScroll);
      }
    };
  }, [setNumofMessages]);

  return chatRoom ? (
    <AnimatePresence>
      <motion.div
        className={`border   w-fit rounded-lg fixed bottom-4  bg-base-100 right-48 shadow-lg`}
        animate={isOpen ? "open" : "closed"}
        transition={{ ease: "easeOut", duration: 0.5 }}
        variants={variants}
      >
        <motion.div
          className="flex flex-col w-full overflow-hidden h-full gap-1 bg-base-300 rounded-lg relative"
          animate={expand ? "open" : "closed"}
          transition={{ ease: "easeOut", duration: 0.5 }}
          variants={variants2}
        >
          <header className="flex bg-base-100 items-center rounded-t-lg  justify-between h-[50px] p-2 border-b ">
            {/* Profile and title */}
            <div className="flex justify-start items-center gap-2">
              <Avatar
                url={chatRoom?.profile || ""}
                initial={extractInitial(
                  chatRoom?.fName || "",
                  chatRoom?.lName || ""
                )}
                classname="h-9 bg-primary text-primary-content"
              />
              <span className="flex flex-col  text-xs">
                <p className="font-bold">
                  {chatRoom?.fName} {chatRoom?.lName}
                </p>
                <p>Available now</p>
              </span>
            </div>
            {/* buttons */}
            <div className="flex gap-4">
              <button
                className="btn btn-xs btn-circle "
                onClick={() => {
                  setExpand(!expand);
                }}
              >
                <FaExpandAlt />
              </button>
              <button
                className="btn btn-xs btn-circle  "
                onClick={() => {
                  dispatch(toggleMessageBox({ isOpen: false, chatRoom: null }));
                }}
              >
                <IoMdClose />
              </button>
            </div>
          </header>
          {/* message display section */}
          <motion.div
            className="flex-1 p-2 overflow-y-auto bg-base-100 scroll-smooth"
            animate={expand ? "open" : "closed"}
            transition={{ ease: "easeOut", duration: 0.5 }}
            variants={{
              open: { opacity: 1 },
              closed: { opacity: 0 },
            }}
            ref={messageBoxRef}
          >
            {error ? (
              <>Error </>
            ) : isLoading ? (
              <>I am loading</>
            ) : (
              <MessageDisplay
                userName={user?.fName as string}
                messages={data?.result.messages || []}
                user={user as IUser}
                currentRoom={chatRoom as IChatRoom}
                userId={user?.id as string}
              />
            )}
            <UserIsTyping />
          </motion.div>

          {/* message input */}

          <motion.section
            animate={expand ? "open" : "closed"}
            transition={{ ease: "easeOut", duration: 0.5 }}
            variants={{
              open: { opacity: 1 },
              closed: { opacity: 0 },
            }}
            className=" bg-base-100  flex flex-col "
          >
            <MessageInput
              email={chatRoom.email}
              roomId={chatRoom.id}
              userId={user?.id as string}
            />
          </motion.section>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  ) : null;
};

export default HomeMessageBox;
