import { useReducer } from "react";
import { createContext } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  delPost: () => {},
  likePost: () => {},
});

const PostListReducer = (currPostList, action) => {
  const { type, payload } = action;

  if (type === "DELETE_POST") {
    return currPostList.filter((post) => post.id !== payload.postId);
  }
  if (type === "ADD_POST") {
    return [{ ...payload, reactions: 0, likedBy: [], }, ...currPostList];
  }
  if (type === "TOGGLE_LIKE") {
    const { postId, userId } = payload;

    return currPostList.map((post) => {
      if (post.id !== postId) return post;

      const hasLiked = post.likedBy.includes(userId);

      return hasLiked
        ? {
            ...post,
            reactions: post.reactions - 1,
            likedBy: post.likedBy.filter((id) => id !== userId),
          }
        : {
            ...post,
            reactions: post.reactions + 1,
            likedBy: [...post.likedBy, userId],
          };
    });
  }
  return currPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    PostListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postTitle, postContent, images, hastags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postContent,
        img: images,
        reactions: 0,
        userid: userId,
        tags: hastags,
      },
    });
  };

  const delPost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  const toggleLike = (postId, userId) => {
    dispatchPostList({
      type: "TOGGLE_LIKE",
      payload: {
        postId,
        userId,
      },
    });
  };

  return (
    <PostListContext.Provider
      value={{ postList, addPost, delPost, toggleLike }}
    >
      {children}
    </PostListContext.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: 1,
    title: "Going to Mumbai",
    body: "Hi Friends, I am going to Mumbai for my vacations. Hope to enjoy a lot. Peace out.",
    img: "https://images.pexels.com/photos/32972954/pexels-photo-32972954.jpeg",
    reactions: 0,
    userid: "user-5",
    tags: ["#vacation", "#mumbai", "#chill life"],
    likedBy: [],
  },
  {
    id: 2,
    title: "Going to Bali",
    body: "Hi Friends, I am going to Bali for my vacations. Hope to enjoy a lot. Peace out.",
    img: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg",
    reactions: 0,
    userid: "user-12",
    tags: ["#vacation", "#bali"],
    likedBy: [],
  },
];

export default PostListProvider;
