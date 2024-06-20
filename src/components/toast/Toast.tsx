import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { closeToast, removeToast } from "../../redux/reducer/toast.slice";

function Toast() {
  const { position, align, isOpen, content } = useAppSelector(
    (store) => store.toast
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const closeDialog = setTimeout(() => {
      dispatch(closeToast());

      return () => {
        clearTimeout(closeDialog);
      };
    }, 4000);
  }, [isOpen, dispatch]);

  return (
    <div
      className={`toast toast-${position} toast-${align} z-50 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      {content.map(({ message, type, id }) => (
        <div className={`alert alert-${type}`} key={id}>
          <span>{message}</span>
          <button
            onClick={() => {
              dispatch(removeToast(id));
            }}
          >
            close
          </button>
        </div>
      ))}
    </div>
  );
}

export default Toast;
