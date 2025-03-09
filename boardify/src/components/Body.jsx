import { useState, useEffect } from "react";
import '../styles/Body.css';
import pass1 from '../assets/boarding_pass_1.jpg';
import pass2 from '../assets/boarding_pass_2.jpg';
//import heart_icon from '../assets/heart-regular.svg';
//import comment_icon from '../assets/comment-regular.svg';
import AuthenticateButton from './AuthenticateButton';
import 'boxicons/css/boxicons.min.css';

export default function Body() {
  const [posts, setPosts] = useState([
      {
        id: 1,
        username: "Bloopy",
        profileImage: "img/profile1.jpg",
        imageUrl: pass1,
        likes: 8148,
        liked: false,
        comments: [
          { user: "Bloopy", text: "i don't know why this is my top artist..." },
        ],
        timestamp: "12 hours ago",
      },
      {
        id: 2,
        username: "Juna",
        profileImage: "img/profile2.jpg",
        imageUrl: pass2,
        likes: 5312,
        liked: false,
        comments: [
          { user: "Juna", text: "Look at my Boardify for this month!" },
        ],
        timestamp: "8 hours ago",
      },
    ]);
    

  //fetching user's post form backend
  useEffect(() => {
    fetch("backendAPI") //backend API insersion needed
    .then((res) => res.json())
    .then((data) => setPosts(data))
    .catch((err) => console.error("Error in fetching posts:", err))
  }, []);

    //likes handle
    const handleLike = async (postId) => {
      setPosts((prevPosts)=>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, 
        liked: !post.liked, 
        likes: post.liked ? post.likes - 1 : post.likes + 1 } :post)
      );

      await fetch(`backendAPI/${postId}/like`, {
        method: "POST",
        headers: {"Content-Type": "application/json" },
      }).crach((err) => console.error("Error liking post:", err));
    };

    //handle comment postings
    const handleComment = async (postId, commentText) => {
      if(!commentText.trim()) return;

      const newComment = {user: "You", text: commentText};
      setPosts((prevPosts) => 
      prevPosts.map((post) => post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      )
    );
    await fetch('backendurl', {
      method: "POST",
      headers: {"Content_Type": "application/json" },
      body: JSON.stringify({text: commentText }),
      }).catch((err) => console.error("Error adding comment:", err));
    };

    //comment click
    const handleCommentClick = (postId, commentIndex) => {
      const clickedComment = posts.find((post) => post.id === postId).comments[commentIndex];
      alert(`Comment by ${clickedComment.user}: "$clickedComment.text}"`);

    };

    return(
      <>
        <div className="body">
          <AuthenticateButton />
          <h1>Your Feed</h1>
          <hr />
          <div className="feed">
            <div className="post-container">
              {posts.map((post) => (
                <div key={post.id} className="post-box">
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
                    <i className="bx bx-dots-vertical-rounded info-icon"></i>
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
                      onClick={() => handleLike(post.id)}
                     />
                     <i
                        className="bx bx-comment"
                      onClick={() => handleComment(post.id, "Wow! What's your playlist?")}
                    ></i>
                    </div>
                    <h3 className="likes">{post.likes} likes</h3>
                    <div className="comment">
                      {post.comments.map((comment, index) => (
                        <p key={index}>
                          <button
                          className= "comment-user-button"
                          onclicl={() => handleCommentClick(post.id, index)}
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
                      placeholder= "Leave a comment!"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleComment(post.id, e.target.value);
                          e.target.value ="";
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
      </>
    );
  }
