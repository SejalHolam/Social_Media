import { useContext, useRef } from "react";
import { PostListContext } from "../store/post-list-store";

const CreatePost = () => {
  const { addPost } = useContext(PostListContext);

  const userIdElement = useRef();
  console.log(userIdElement);
  const postTitleElement = useRef();
  const postContentElement = useRef();
  const imagesElement = useRef();
  const hastagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postContent = postContentElement.current.value;
    const images = imagesElement.current.value.split(",");
    const hastags = hastagsElement.current.value
      .split(",")
      .map((tag) => tag.trim());

    userIdElement.current.value = " ";
    postTitleElement.current.value = " ";
    postContentElement.current.value = " ";
    imagesElement.current.value = " ";
    hastagsElement.current.value = " ";

    addPost(userId, postTitle, postContent, images, hastags);
  };

  return (
    <>
      <form className="form-content" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User id:
          </label>
          <input
            type="text"
            ref={userIdElement}
            className="form-control"
            id="user-id"
            placeholder="Enter you user-id here"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Post Title:
          </label>
          <input
            type="text"
            ref={postTitleElement}
            className="form-control"
            id="title"
            placeholder="Title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Post Content:
          </label>
          <textarea
            rows={3}
            cols={3}
            type="text"
            ref={postContentElement}
            className="form-control"
            id="content"
            placeholder="Enter here"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Add Images:
          </label>
          <input
            type="text"
            ref={imagesElement}
            className="form-control"
            id="Add image urls here"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Hashtags:
          </label>
          <input
            type="text"
            ref={hastagsElement}
            className="form-control"
            id="tags"
            placeholder="tag1, tag2, tag3"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </>
  );
};
export default CreatePost;
