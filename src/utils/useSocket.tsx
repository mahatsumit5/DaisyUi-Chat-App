import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { setTyping } from "../redux/reducer/socket.slice";
import { setOnlineUsers } from "../redux/reducer/AllUsers.slice";
import { toggleDialog } from "../redux/dialog.slice";
import {
  useGetAllChatRoomQuery,
  useGetAllUsersQuery,
  useGetFriendRequestQuery,
  useGetSentFriendRequestQuery,
} from "../redux";

const useSocketSetup = () => {
  const { currentRoom } = useAppSelector((store) => store.rooms);
  const chatRoom = useGetAllChatRoomQuery();
  const allUsers = useGetAllUsersQuery();
  const sentRequest = useGetSentFriendRequestQuery(null);
  const { refetch } = useGetFriendRequestQuery(null);
  const dispatch = useAppDispatch();
  const { socket } = useAppSelector((store) => store.socket);

  useEffect(() => {
    socket.on("connect_error", (err) => {
      console.log(err.message);
    });

    socket.on("typing", (email) => {
      dispatch(setTyping({ person: email, typing: true }));
    });
    socket.on("stopped_typing", (email) => {
      dispatch(setTyping({ person: email, typing: false }));
    });
    socket.on("getOnlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
    socket.on("receive_friend_request", (sender) => {
      dispatch(
        toggleDialog(
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl text-black font-bold">Notification</h1>
            <p>You have a new friend request from {sender}</p>
            <div className="flex w-full justify-end">
              <button
                className="btn btn-ghost "
                onClick={() => {
                  refetch();
                }}
              >
                View
              </button>
            </div>
          </div>
        )
      );
      // refetch();
    });

    socket.on("friend_req_accepted_notification", () => {
      chatRoom.refetch();
      allUsers.refetch();
      sentRequest.refetch();
    });

    socket.on("disconnect", () => {});
    return () => {
      socket.off("connect_error");
    };
  }, [
    dispatch,
    currentRoom?.id,
    allUsers,
    chatRoom,
    sentRequest,
    refetch,
    socket,
  ]);
};

export default useSocketSetup;
