import { MdCancel } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useContext } from "react";
import { PostListContext } from "../store/post-list-store";

const Post = ({ post }) => {
  const { delPost, toggleLike } = useContext(PostListContext);

  const loggedInUser = "user-12";

  const isLiked = (post.likedBy || []).includes(loggedInUser);

  return (
    <>
      <div className="card post-card" style={{ width: "18rem" }}>
        <div className="img-wrapper">
          <img src={post.img} className="card-img-top" alt="..." />
          <MdCancel className="delete-icon" onClick={() => delPost(post.id)} />
        </div>
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.body}</p>
          <div className="reactions-wrapper">
            {isLiked ? (
              <FaHeart
                className="heart-icon"
                onClick={() => toggleLike(post.id, loggedInUser)}
                style={{ cursor: "pointer", color: "red" }}
              />
            ) : (
              <FaRegHeart
                className="heart-icon"
                onClick={() => toggleLike(post.id, loggedInUser)}
                style={{ cursor: "pointer" }}
              />
            )}
            <span className="reaction-count">{post.reactions}</span>
          </div>
          <div>
            {post.tags.map((tag) => (
              <span key={tag} className="badge hastags text-bg-primary">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Post;
