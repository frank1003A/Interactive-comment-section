import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Comment from "./components/Comment";
import CommentBox from "./components/CommentBox";
import CancelModal from "./components/Modal";
import Reply from "./components/Reply";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { comments as commentContents, currentUser } from "./data/data.json";

function App() {
  const [comments, setComments] = useState([...commentContents]);
  const [comment, setComment] = useState("");
  const [quote, setQuote] = useState(false);
  const [quoteContent, setQuoteContent] = useState();
  const [activeReply, setActive] = useState();
  const [activeComment, setActiveComment] = useState();
  const [rId, setRid] = useState();

  const reset = () => {
    setComment(""), setQuote(false);
    setQuoteContent("");
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleQuote = (content) => {
    setQuote(true);
    setQuoteContent(content);
  };

  const addComment = (e) => {
    e.preventDefault();
    let cms = [...comments];

    let newComment = {
      id: Math.random() * 10,
      content: comment,
      createdAt: `${new Date().getSeconds()} seconds ago`,
      score: 1,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp,
        },
        username: currentUser.username,
      },
      quote: quoteContent ? quoteContent : "",
    };
    cms.push(newComment);
    setComments(cms);
    toast.success("Comment Posted!", {
      position: "bottom-right",
    });
    reset();
  };

  const addReplyToComment = (e, reply, index) => {
    console.log(index);
    e.preventDefault();
    let cms = comments.concat();
    let newReply = {
      id: Math.random() * 10,
      content: reply,
      createdAt: `${new Date().getSeconds()} seconds ago`,
      score: 1,
      replyingTo: cms[index].user.username,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp,
        },
        username: currentUser.username,
      },
    };
    cms[index].replies.push(newReply);
    setComments(cms);
    toast.success("Reply Posted!", {
      position: "bottom-right",
    });
  };

  const addReplyToReply = (e, reply, cIndex, rIndex) => {
    e.preventDefault();
    let cms = comments.concat();
    let newReply = {
      id: Math.random() * 10,
      content: reply,
      createdAt: `${new Date().getSeconds()} seconds ago`,
      score: 1,
      replyingTo: cms[cIndex].replies[rIndex].user.username,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp,
        },
        username: currentUser.username,
      },
    };
    cms[cIndex].replies.push(newReply);
    setComments(cms);
    toast.success("Reply Posted!", {
      position: "bottom-right",
    });
  };

  const deleteComment = (commentId, cIndex, replyId) => {
    console.log(replyId ? replyId : 0);
    setActive(commentId);
    setActiveComment(cIndex);
    setRid(replyId);
    onOpenModal();
  };

  const handleDelete = () => {
    if (activeComment === undefined && activeReply) {
      let cms = comments.concat();
      let cm = cms.filter((c) => c.id !== activeReply);
      setComments(cm);
    } else {
      let cms = comments.concat();
      cms.at(activeComment).replies = cms
        .at(activeComment)
        .replies.filter((r) => r.id !== rId);
      setComments(cms);
    }
    toast.success("Comment Deleted!", {
      position: "bottom-right",
    });
    onCloseModal();
  };

  const editComment = (e, id, index) => {
    e.preventDefault();
    let cms = comments.concat();
    if (id !== cms.at(index).id || comment === "") {
      return;
    }
    cms.at(index).content = comment;
    setComments(cms);
    toast.success("Comment Updated!", {
      position: "bottom-right",
    });
  };

  const editReply = (e, content, cIndex, rIndex) => {
    e.preventDefault();
    let cms = comments.concat();
    cms[cIndex].replies.at(rIndex).content = content;
    setComments(cms);
    toast.success("Reply Updated!", {
      position: "bottom-right",
    });
  };

  const getReplyToImage = (replyingTo, cIndex, rIndex) => {
    let cms = comments.concat();

    if (rIndex === null) {
      return;
    }

    if (rIndex === 0) return cms.at(cIndex).user.image.png;

    return cms
      .at(cIndex)
      .replies.filter((r) => r.user.username === replyingTo)
      .at(0).user.image.png;
  };

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <>
      <h1 className="sr-only">Interactive Comment Section</h1>
      <main className="flex flex-col items-center justify-center w-full h-full p-3 lg:p-6 md:py-20 md:px-0 dark:bg-neutral-800">
        <div className="flex flex-col gap-5 max-w-screen-sm">
          {comments.map((comment, cIndex) => {
            return (
              <div key={comment.id} className="flex flex-col gap-2">
                <Comment
                  avatar={comment.user.image.png}
                  createdAt={comment.createdAt}
                  username={comment.user.username}
                  content={comment.content}
                  score={comment.score}
                  handleComment={handleComment}
                  onDelete={() => deleteComment(comment.id)}
                  onEdit={(e) => editComment(e, comment.id, cIndex)}
                  addReply={addReplyToComment}
                  handleQuote={handleQuote}
                  quoteValue={comment.quote}
                  cIndex={cIndex}
                />
                {Array.isArray(comment.replies) &&
                comment.replies.length !== 0 ? (
                  <div className="flex">
                    <div className="w-0 border-r-2 mx-4 md:mx-6 mt-5 dark:border-r-[#555]" />
                    <div className="flex flex-col gap-5 mt-5 w-full">
                      {comment.replies.map((reply, rIndex) => {
                        let replyImg = getReplyToImage(
                          reply.replyingTo,
                          cIndex,
                          rIndex
                        );
                        return (
                          <Reply
                            key={reply.id}
                            avatar={reply.user.image.png}
                            createdAt={reply.createdAt}
                            username={reply.user.username}
                            content={reply.content}
                            replyingTo={reply.replyingTo}
                            repImage={replyImg}
                            score={reply.score}
                            cIndex={cIndex}
                            rIndex={rIndex}
                            onEdit={(e, c) => editReply(e, c, cIndex, rIndex)}
                            onDelete={() =>
                              deleteComment(comment.id, cIndex, reply.id)
                            }
                            addReply={addReplyToReply}
                          />
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
          <CommentBox
            content={quoteContent}
            quote={quote}
            isMain
            handleComment={handleComment}
            comment={comment}
            addComment={addComment}
          />
        </div>
        <ThemeSwitcher />
      </main>
      <ToastContainer
        toastClassName={
          " bg-indigo-700 dark:bg-yellow-500 text-white rounded-md"
        }
        toastStyle={{
          fontFamily: "inherit",
        }}
        closeButton={<CrossCircledIcon className="text-white h-6 w-6" />}
        progressStyle={{ backgroundColor: "white" }}
        closeOnClick
        hideProgressBar
        pauseOnHover
        icon={<CheckCircledIcon className="text-white h-8 w-8" />}
      />
      <CancelModal
        open={open}
        onCloseModal={onCloseModal}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default App;
