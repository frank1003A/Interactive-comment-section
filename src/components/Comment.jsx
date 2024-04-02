/* eslint-disable react/prop-types */
import { QuoteIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { currentUser } from "../data/data.json";
import { getImage } from "../utils/image-utils";
import { Button, DeleteButton, EditButton, ReplyButton } from "./Buttons";
import Card from "./Card";
import ReplyBox from "./ReplyBox";
import Score from "./Score";

// eslint-disable-next-line react/prop-types
const Comment = ({
  avatar,
  createdAt,
  username,
  content,
  score,
  handleComment,
  onDelete,
  onEdit,
  addReply,
  handleQuote,
  quoteValue,
  cIndex,
}) => {
  const [reply, setReply] = useState(false);
  const [editing, setEditing] = useState(false);
  const [quoteContent] = useState(content);
  const [active] = useState(cIndex);

  const toggleComment = () => {
    setReply(!reply);
  };

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const quoteComment = () => {
    handleQuote(quoteContent);
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
    setReply(false);
  }, [addReply]);

  return (
    <div
      id="comment"
      className="transition-all h-fit flex flex-col relative gap-2"
    >
      <Card
        className={clsx(
          "group  z-10 gap-3 animate-in zoom-in relative",
          !reply && "animate-in zoom-in",
          reply && "animate-in zoom-in"
        )}
      >
        <div className="w-full md:w-fit flex items-center justify-between">
          <Score defaultScore={score} />
          <div className="ml-auto md:hidden">
            {!isMe(username) && (
              <ReplyButton onClick={toggleComment}>Reply</ReplyButton>
            )}
          </div>
          <div className={"flex items-center gap-3 md:hidden"}>
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
          <div className="flex items-center justify-start gap-2 w-full">
            <div className="flex items-center gap-3 justify-start">
              {getImage(avatar, username)}
              <span className="text-sm font-bold">{username}</span>
            </div>
            {isMe(username) && (
              <div className=" px-1 py-0 rounded-sm text-white text-[12px] bg-indigo-700 dark:bg-yellow-500">
                You
              </div>
            )}
            <span className="text-sm">{createdAt}</span>
            <div className="ml-auto hidden md:flex items-center gap-3">
              <div className="hidden md:block">
                {!isMe(username) && (
                  <ReplyButton onClick={toggleComment}>Reply</ReplyButton>
                )}
              </div>
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
          {quoteValue ? (
            <div className="text-[14px] bg-slate-100 dark:bg-neutral-800/30 dark:text-white border-l-4 p-3 rounded-md border-indigo-700 dark:border-yellow-500">
              <p className="line-clamp-2">{quoteValue}</p>
            </div>
          ) : null}
          {isMe(username) && editing ? (
            <form className="flex flex-col gap-2">
              <textarea
                autoFocus
                defaultValue={content}
                onChange={handleComment}
                placeholder="Reply to a reply..."
                className={clsx(
                  "text-[14px] relative focus:outline-none focus-within:outline-none focus-within:ring-1 focus-within:ring-indigo-700 dark:focus-within:ring-yellow-500 max-h-[100px] dark:border-[#555] bg-transparent  min-h-[100px] w-full py-2 px-3 border rounded-md"
                )}
              ></textarea>
              <Button type="submit" className="ml-auto" onClick={onEdit}>
                UPDATE
              </Button>
            </form>
          ) : (
            <span className="text-[14px] leading-6">{content}</span>
          )}
        </div>
        {!isMe(username) && (
          <button
            aria-label="Sun Settings"
            className={clsx(
              "opacity-0 group-hover:opacity-100 focus:opacity-100 flex transition-all items-center justify-center shadow-2xl absolute -right-5 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 rounded-md bg-indigo-700 dark:bg-yellow-500 text-white"
            )}
            onClick={quoteComment}
          >
            <QuoteIcon className="group-hover:rotate-180 h-4 w-4" />
          </button>
        )}
      </Card>
      {reply ? (
        <ReplyBox
          cIndex={cIndex}
          active={active}
          addReply={addReply}
          replyingTO={username}
        />
      ) : null}
    </div>
  );
};

export default Comment;
