/* eslint-disable react/prop-types */
import Tippy from "@tippyjs/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import "tippy.js/animations/scale.css";
import { currentUser } from "../data/data.json";
import { Button, DeleteButton, EditButton, ReplyButton } from "./Buttons";
import Card from "./Card";
import ReplyBox from "./ReplyBox";
import Score from "./Score";

// eslint-disable-next-line react/prop-types
const ToolTipContent = ({ username, avatar }) => {
  return (
    <div className="bg-transparent">
      <div className="flex items-center gap-2 justify-center">
        <img
          className="h-8 w-8 rounded-full"
          src={avatar}
          alt={`${username}'s avatar`}
        />
        <span className="text-sm font-bold">{username}</span>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const Reply = ({
  avatar,
  createdAt,
  username,
  content,
  replyingTo,
  score,
  onEdit,
  onDelete,
  addReply,
  cIndex,
  rIndex,
}) => {
  const [editing, setEditing] = useState(false);
  const [reply, setReply] = useState("");

  const [comment, setComment] = useState(false);

  const toggleComment = () => {
    setComment(!comment);
  };

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const handleReply = (e) => {
    setReply(e.target.value);
  };

  const isMe = (user) => {
    if (user === currentUser.username) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setEditing(false);
  }, [content]);

  useEffect(() => {
    setComment(false);
  }, [addReply]);

  return (
    <div id="replytoreply" className="h-fit flex flex-col relative gap-2">
      <Card className={"group animate-in zoom-in relative z-20"}>
        <div className="w-full lg:w-fit flex items-center justify-between">
          <Score defaultScore={score} />
          <div className="ml-auto lg:hidden">
            {!isMe(username) && (
              <ReplyButton onClick={toggleComment}>Reply</ReplyButton>
            )}
          </div>
          <div className={"flex items-center gap-3 lg:hidden"}>
            {isMe(username) && (
              <DeleteButton onClick={onDelete}>Delete</DeleteButton>
            )}
            {isMe(username) && (
              <EditButton
                disabled={editing ? true : false}
                onClick={toggleEdit}
              >
                Edit
              </EditButton>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full dark:text-white">
          <div className="flex items-center justify-start gap-2">
            <div className="flex items-center gap-3 justify-start">
              <img
                className="h-8 w-8 rounded-full"
                src={avatar}
                alt={`${username}'s avatar`}
              />
              <span className="text-sm font-bold">{username}</span>
            </div>
            {isMe(username) && (
              <div className=" px-1 py-0 rounded-sm text-white text-[12px] bg-indigo-700 dark:bg-yellow-500">
                You
              </div>
            )}
            <span className="text-sm">{createdAt}</span>
            <div className="ml-auto items-center gap-3 hidden lg:flex">
              {!isMe(username) && (
                <ReplyButton onClick={toggleComment}>Reply</ReplyButton>
              )}
              {isMe(username) && (
                <DeleteButton onClick={onDelete}>Delete</DeleteButton>
              )}
              {isMe(username) && (
                <EditButton
                  disabled={editing ? true : false}
                  onClick={toggleEdit}
                >
                  Edit
                </EditButton>
              )}
            </div>
          </div>
          <span className="text-[14px]">
            {!editing && (
              <>
                <Tippy
                  animateFill
                  animation="scale"
                  placement="top-start"
                  className="bg-slate-200 border-2 dark:bg-neutral-700 border-indigo-700 dark:border-yellow-500 text-black dark:text-white shadow-xl"
                  arrow={false}
                  content={
                    <ToolTipContent username={username} avatar={avatar} />
                  }
                >
                  <span className="text-indigo-700 dark:text-yellow-500 font-bold leading-6">
                    {replyingTo ? `@` + replyingTo + " " : ""}
                  </span>
                </Tippy>
                {content}
              </>
            )}
            {isMe(username) && editing && (
              <form className="flex flex-col gap-2">
                <textarea
                  autoFocus
                  defaultValue={
                    replyingTo ? `@` + replyingTo + " " + content : "" + content
                  }
                  onChange={handleReply}
                  placeholder="Add a comment..."
                  className={clsx(
                    "text-[14px] relative focus:outline-none focus-within:outline-none focus-within:ring-1 focus-within:ring-indigo-700 dark:focus-within:ring-yellow-500 max-h-[100px] dark:border-[#555] bg-transparent  min-h-[100px] w-full py-2 px-3 border rounded-md"
                  )}
                ></textarea>
                <Button
                  type="submit"
                  className="ml-auto"
                  onClick={(e) => onEdit(e, reply)}
                >
                  UPDATE
                </Button>
              </form>
            )}
          </span>
        </div>
      </Card>
      {comment ? (
        <ReplyBox
          cIndex={cIndex}
          rIndex={rIndex}
          addReply={addReply}
          replyingTO={username}
        />
      ) : null}
    </div>
  );
};

export default Reply;
