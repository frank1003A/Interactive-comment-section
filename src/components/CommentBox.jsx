/* eslint-disable react/prop-types */
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { currentUser } from "../data/data.json";
import { getImage } from "../utils/image-utils";
import { Button } from "./Buttons";
import Card from "./Card";

const CommentBox = ({
  replyingTO,
  addComment,
  handleComment,
  comment,
  isMain,
  content,
  quote,
}) => {
  const [shouldScrollIntoView, setShouldScrollIntoView] = useState(false);
  const inputRef = useRef(null);
  const componentRef = useRef(null);
  useEffect(() => {
    if (shouldScrollIntoView && componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: "smooth" });
      inputRef.current.focus();
      setShouldScrollIntoView(false);
    }
  }, [shouldScrollIntoView]);

  useEffect(() => {
    setShouldScrollIntoView(true);
  }, [quote]);

  return (
    <Card ref={componentRef} className={"animate-in slide-in-from-top "}>
      <form className="w-full flex flex-col gap-3">
        {quote ? (
          <div className="text-[14px] bg-slate-100 dark:bg-neutral-800/30 dark:text-white border-l-4 p-3 rounded-md border-indigo-700 dark:border-yellow-500">
            <p className="line-clamp-2">{content}</p>
          </div>
        ) : null}
        <div className="flex gap-2 w-full">
          {getImage(currentUser.image.png, currentUser.username, true)}
          <label className="sr-only">Post a Comment</label>
          <textarea
            ref={inputRef}
            autoFocus
            onChange={handleComment}
            placeholder="Add a comment..."
            defaultValue={`${!isMain || replyingTO ? `@` + replyingTO : ""}`}
            className={clsx(
              "text-[14px] relative focus:outline-none focus-within:outline-none focus-within:ring-1 focus-within:ring-indigo-700 dark:focus-within:ring-yellow-500 max-h-[100px] min-h-[100px] w-full py-2 px-3 border dark:border-[#555] rounded-md dark:bg-transparent dark:text-white"
            )}
          ></textarea>
          <Button
            type="submit"
            className={"hidden md:flex"}
            disabled={!comment ? true : false}
            onClick={addComment}
          >
            SEND
          </Button>
        </div>
        <div className="w-full flex justify-between md:hidden">
          {getImage(currentUser.image.png, currentUser.username)}
          <Button
            type="submit"
            disabled={!comment ? true : false}
            onClick={addComment}
          >
            SEND
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CommentBox;
