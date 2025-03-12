import { useState, useEffect } from "react";
import '../styles/Body.css';
import pass1 from '../assets/boarding_pass_1.jpg';
import pass2 from '../assets/boarding_pass_2.jpg';
import AuthenticateButton from './AuthenticateButton';
import 'boxicons/css/boxicons.min.css';

export default function Body() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from backend
  useEffect(() => {
    fetch("/api/posts/getPosts")
      .then((res) => res.json())
      .then((data) => setPosts(data.postList))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  // Handle likes
  const handleLike = async (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );

    try {
      await fetch(`/api/posts/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  // Handle comment posting
  const handleComment = async (postId, commentText) => {
    if (!commentText.trim()) return;

    const newComment = { user: "You", text: commentText };
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );

    await fetch(`/api/posts/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, username: "You", comment: commentText }),
    }).catch((err) => console.error("Error adding comment:", err));
  };

  // Handle comment click
  const handleCommentClick = (postId, commentIndex) => {
    const clickedPost = posts.find((post) => post._id === postId);
    const clickedComment = clickedPost?.comments[commentIndex];
    if (clickedComment) {
      alert(`Comment by ${clickedComment.user}: "${clickedComment.text}"`);
    }
  };

  return (
    <div className="body">
      <AuthenticateButton />
      <h1>Your Feed</h1>
      <hr />
      <div className="feed">
        <div className="post-container">
          {posts.map((post) => (
            <div key={post._id} className="post-box">
              <div className="post-top">
                <div className="post-profile">
                  <img
                    src={post.profileImage || "img/default-profile.jpg"}
                    alt="Profile"
                  />
                  <div className="name-username">
                    <h3 className="profile-name">{post.username}</h3>
                  </div>
                </div>
              </div>
              <img
                src={post.imageUrl || pass1}
                alt="User Post"
                className="post-image"
              />
              <div className="post-bottom">
                <div className="actions-icons">
                  <i
                    className={`bx bx-heart ${post.liked ? 'liked' : ''}`}
                    onClick={() => handleLike(post._id)}
                  />
                  <i
                    className="bx bx-comment"
                    onClick={() => handleComment(post._id, "Wow! What's your playlist?")}
                  ></i>
                </div>
                <h3 className="likes">{post.likes} likes</h3>
                <div className="comment">
                  {post.comments.map((comment, index) => (
                    <p key={index}>
                      <button
                        className="comment-user-button"
                        onClick={() => handleCommentClick(post._id, index)}
                      >
                        {comment.user}
                      </button>
                      <span>{comment.text}</span>
                    </p>
                  ))}
                </div>
                <div className="input-comment">
                  <input
                    type="text"
                    placeholder="Leave a comment!"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleComment(post._id, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                </div>
                <span className="view-more">
                  View all {post.comments.length} comments
                </span>
                <span className="post-time">{post.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}