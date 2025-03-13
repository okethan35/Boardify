import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import def_prof_pic from '../assets/default_profile.png';
import Navbar from "../components/NavBar.jsx";
import "../styles/BoardingPassDisplay.css";

const API_URL = process.env.REACT_APP_API_URL;

const BoardingPassDisplay = () => {
    const { postId } = useParams();
    const [ post, setPost ] = useState();

    const arrayBufferToBase64 = (buffer) => {
        if (!buffer) return '';
        const bytes = new Uint8Array(buffer);
        let binary = '';
        bytes.forEach(byte => binary += String.fromCharCode(byte));
        return window.btoa(binary);
      };
    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await fetch(`${API_URL}/post/getPost`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ postId })
            });

            console.log("Response status:", response.status);

            const data = await response.json();
            console.log("BOARDINGPASSDATA:", data);
            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch post");
            }
            setPost(data);
            console.log("fetched data:", data);
          } catch (error) {
            console.error("Error fetching post:", error);
          }
        };

        fetchPost();
    }, [postId]);
    console.log("POST:",post);

    return (
        <>
            <Navbar/>
            {post ? (
                <div className="bpd-container">
                    <div className="bpd-post-profile">
                        <img
                            src={post.profileImg?.url || def_prof_pic}
                            alt="Profile"
                        />
                        <div className="bpd-name-username">
                            <Link to={`/profile/${post.username}`}>
                                <h3 className="bpd-profile-name">{post.username}</h3>
                            </Link>
                        </div>
                    </div>
                <div className="bpd-boarding-pass-container">
                        <img
                            className="bpd-boarding-pass"
                            src={`data:${post.boardingPass.contentType};base64,${arrayBufferToBase64(post.boardingPass.image?.data)}`}
                            alt="Boarding Pass"
                        />
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default BoardingPassDisplay;