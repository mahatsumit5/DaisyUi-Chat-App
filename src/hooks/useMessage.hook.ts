import { useState } from "react";

const useMessageHook = () => {
  const [message, setMessage] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [numOfMessages, setNumofMessages] = useState(10);

  const [messageStatus, setMessageStatus] = useState<{
    isLoading: boolean;
    isError: boolean;
  }>({ isError: false, isLoading: false });

  return {
    message,
    preview,
    messageStatus,
    file,
    numOfMessages,
    setNumofMessages,
    setFile,
    setMessage,
    setMessageStatus,
    setPreview,
  };
};

export default useMessageHook;
