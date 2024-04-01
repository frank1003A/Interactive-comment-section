/* eslint-disable react/prop-types */
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { currentUser } from "../data/data.json";
import { getImage } from "../utils/image-utils";
import { Button } from "./Buttons";
import Card from "./Card";

const ReplyBox = ({ replyingTO, addReply, isMain, cIndex, rIndex }) => {
  const [reply, setReply] = useState("");
  const [activeComment] = useState(cIndex);
  const [activeReply] = useState(rIndex);

  const handleReply = (e) => {
    let text = e.currentTarget.textContent.slice(replyingTO.length + 2);
    setReply(text);
  };

  const editorRef = useRef(null);
  const fixedTextRef = useRef(null);
  useEffect(() => {
    const editorDiv = editorRef.current;
    const fixedTextNode = fixedTextRef.current?.firstChild;

    if (editorDiv && fixedTextNode) {
      const fixedTextLength = fixedTextNode.textContent.length;

      editorDiv.addEventListener("beforeinput", (event) => {
        const { inputType, data } = event;

        if (inputType === "deleteContentBackward") {
          const selection = window.getSelection();
          const range = selection.getRangeAt(0);
          const startOffset = range.startOffset;

          if (startOffset <= fixedTextLength) {
            event.preventDefault();
            positionCursorAfterFixedText(fixedTextLength);
          }
        } else if (data === null && inputType === "deleteContent") {
          const selection = window.getSelection();
          const range = selection.getRangeAt(0);
          const endOffset = range.endOffset;

          if (endOffset <= fixedTextLength) {
            event.preventDefault();
            positionCursorAfterFixedText(fixedTextLength);
          }
        }
      });

      const positionCursorAfterFixedText = (fixedTextLength) => {
        const selection = window.getSelection();
        const range = document.createRange();
        range.setStart(fixedTextNode, fixedTextLength);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      };

      positionCursorAfterFixedText(fixedTextLength);
    }
  }, []);

  const formSubmit = (e) => {
    addReply(e, reply, activeComment, activeReply);
  };

  return (
    <Card className={"animate-in slide-in-from-top "}>
      <form className="w-full flex flex-col gap-3 lg:gap-0">
        <div className="flex gap-2 w-full">
          {getImage(currentUser.image.png, currentUser.username)}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            aria-label="Reply to comment"
            aria-multiline
            role="textbox"
            onInput={handleReply}
            placeholder="Add a comment..."
            className={clsx(
              "text-[14px] dark:text-white relative focus:outline-none focus-within:outline-none focus-within:ring-1 focus-within:ring-indigo-700 dark:focus-within:ring-yellow-500 max-h-[100px] min-h-[100px] w-full py-2 px-3 border dark:border-[#555] rounded-md dark:bg-transparent"
            )}
          >
            <span ref={fixedTextRef}>
              {`${!isMain || replyingTO ? `@` + replyingTO + "," : ""}`}
            </span>
          </div>
          <Button
            id="replybtn"
            type="submit"
            className={"hidden lg:flex"}
            disabled={!reply ? true : false}
            onClick={formSubmit}
          >
            Reply
          </Button>
        </div>
        <div className="w-full flex justify-between lg:hidden">
          {getImage(currentUser.image.png, currentUser.username)}
          <Button
            type="submit"
            disabled={!reply ? true : false}
            onClick={formSubmit}
          >
            SEND
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ReplyBox;

/** <form className="w-full">
        <div className="flex gap-2 w-full">
          <img
            className="h-8 w-8 rounded-full"
            src={currentUser.image.png}
            alt={`${currentUser.username}'s avatar`}
          />
          <label htmlFor="replyinput" id="replylabel" className="sr-only">
            Reply to comment
          </label>
          <textarea
            id="replyinput"
            aria-describedby="replylabel"
            autoFocus
            onChange={handleReply}
            placeholder="Add a comment..."
            defaultValue={`${!isMain || replyingTO ? `@` + replyingTO : ""}`}
            className={clsx(
              "text-[14px] relative focus-within:outline-none focus-within:ring-1 focus-within:ring-indigo-700 max-h-[100px] min-h-[100px] w-full py-2 px-3 border rounded-md"
            )}
          ></textarea>
          <button
            type="submit"
            className="hover:opacity-30 p-3 h-9 flex items-center justify-center rounded-md center bg-indigo-700 text-white disabled:opacity-25"
            disabled={comment && comment.length === 0 ? true : false}
            onClick={(e) => addReply(e, reply, index)}
          >
            Reply
          </button>
        </div>
      </form> */
