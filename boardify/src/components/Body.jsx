import { useState, useEffect } from "react";
import { like, makeComment } from "../api/post";
import { Link } from "react-router-dom";
import def_prof_pic from '../assets/default_profile.png';
import '../styles/Body.css';
import pass1 from '../assets/boarding_pass_1.jpg';
import 'boxicons/css/boxicons.min.css';

const API_URL = process.env.REACT_APP_API_URL;

// Helper function to convert buffer array to Base64
const arrayBufferToBase64 = (buffer) => {
  if (!buffer) return '';
  const bytes = new Uint8Array(buffer);
  let binary = '';
  bytes.forEach(byte => binary += String.fromCharCode(byte));
  return window.btoa(binary);
};

export default function Body() {
  const username = localStorage.getItem("username");
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});


  const formatLocalTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  // Fetch posts from backend
  useEffect(() => {
    fetch(`${API_URL}/post/getPosts`)
      .then((res) => res.json())
      .then((data) => setPosts(data.postList))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  // Handle likes
  const handleLike = async (postId) => {
    try {
      const likes = await like(postId, username);
      console.log("COUNT:", likes.count);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, liked: !post.liked, likes: likes }
            : post
        )
      );
      console.log(posts);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  // Handle comment posting
  const handleComment = async (postId, commentText) => {
    if (!commentText.trim()) return;

    const newComment = { author: "You", comment: commentText };
    const comments = await makeComment(postId, username, commentText);
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };
  //togling w comment visibility ADDED
  const toggleComments = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Handle comment click
  const handleCommentClick = (postId, commentIndex) => {
    const clickedPost = posts.find((post) => post._id === postId);
    const clickedComment = clickedPost?.comments[commentIndex];
    if (clickedComment) {
      alert(`Comment by ${clickedComment.author}: "${clickedComment.comment}"`);
    }
  };

  return (
    <div className="body">
      <h1>Your Feed</h1>
      <hr />
      <div className="feed">
        <div className="post-container">
          {posts.map((post) => (
            <div key={post._id} className="post-box">
              <div className="post-top">
                <div className="post-profile">
                  <img
                    src={post.profileImg?.url || def_prof_pic}
                    alt="Profile"
                  />
                  <div className="name-username">
                    <Link to={`/profile/${post.username}`}>
                      <h3 className="profile-name">{post.username}</h3>
                    </Link>
                  </div>
                </div>
              </div>
              <img
                src={
                  post.boardingPass 
                    ? `data:${post.boardingPass.contentType};base64,${arrayBufferToBase64(post.boardingPass.image?.data)}`
                    : pass1
                }
                alt="User Post"
                className="post-image"
              />
              <div className="post-bottom">
                <div className="actions-icons">
                  <i
                    className={`bx ${post.likes.likedBy.includes(username) ? ' bxs-heart' : 'bx-heart'}`}
                    onClick={() => handleLike(post._id)}
                  />
                  <i
                    className="bx bx-comment"
                    onClick={() => {
                      document.getElementById(`comment-input-${post._id}`).focus();
                    }}
                  />
                </div>
                <h3 className="likes">{post.likes.count || 0} likes</h3>
                <div className="comment">
                   {/* Show only a few comments if not expanded */}
                   {post.comments.slice(0, expandedPosts[post._id] ? post.comments.length : 2)
                   .map((comment, index) => (
                    <p key={index}>
                      <button
                        className="comment-user-button"
                        onClick={() => handleCommentClick(post._id, index)}
                      >
                        {comment.author}
                      </button>
                      <span>{comment.comment}</span>
                    </p>
                  ))}
                </div>
                <div className="input-comment">
                  <input
                    id={`comment-input-${post._id}`}
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
                {post.comments.length > 2 && (
                  <span
                    className="view-more"
                    onClick={() => toggleComments(post._id)}
                  >
                    {expandedPosts[post._id] ? "Hide comments" : `View all ${post.comments.length} comments`}
                  </span>
                )}
                <span className="post-time">{formatLocalTime(post.timeCreated)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
