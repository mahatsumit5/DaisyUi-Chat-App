import { RxCross1 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../../hook";
import Profile from "../messages/Profile";
import { toggleDialog } from "../../redux-slice/dialog.slice";

const Dialog = () => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((store) => store.dialog);
  return open ? (
    <div className="h-screen absolute w-screen bg-black/35 flex justify-center items-center transition-all">
      <div className="w-[350px] bg-white rounded p-2 flex flex-col sm:min-w-[500px]">
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
      </div>
    </div>
  ) : null;
};

export default Dialog;
