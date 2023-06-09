import { DeleteIcon } from "../Icons/Icons";
import styles from "../../styles/Model.module.css";
import AuthContext from "../../contexts/Auth";
import { dateFormatter } from "../../utils/formatters";
import { useContext } from "react";

function Comment({ comment, onClick }) {
  const authContext = useContext(AuthContext);
  const isUserAdmin = authContext.isUserAdmin;
  return (
    <div
      key={comment._id}
      className={styles["model-comments-list-single-comment"]}
    >
      {isUserAdmin && (
        <span className={styles["model-comments-list-single-comment-delete"]}>
          <button
            onClick={(e) => {
              onClick(e, comment);
            }}
          >
            <DeleteIcon />
          </button>
        </span>
      )}
      <span className="model-comments-list-single-comment-date">
        <small>{dateFormatter(comment.date)}</small>{" "}
      </span>
      <span className={styles["model-comments-list-single-comment-username"]}>
        {comment.creatorUsername}:{" "}
      </span>
      <span className={styles["model-comments-list-single-comment-content"]}>
        {comment.comment}
      </span>
    </div>
  );
}

export default Comment;
