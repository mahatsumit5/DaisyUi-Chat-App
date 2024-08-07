import React from "react";
import { IUser } from "../../types";
import { Avatar } from "../Avatar/Avatar";
import { extractInitial } from "../../utils";

const HomeAllUsers: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <div className="flex justify-between items-center  w-full  p-2  border-b-2">
      <div className="flex gap-2 items-center">
        <Avatar
          initial={extractInitial(user.fName, user.lName)}
          url={user.profile}
          key={user.id}
          classname="w-10 h-auto"
        />
        <span>
          <p className=" text-xs font-bold">
            {user.fName} {user.lName}
          </p>
          <p className=" text-xs text-base-content/70">{user.email} </p>
        </span>
      </div>
      <button className="btn btn-xs btn-primary btn-square">M</button>
    </div>
  );
};

export default HomeAllUsers;
