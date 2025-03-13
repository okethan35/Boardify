import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import def_prof_pic from '../assets/default_profile.png';

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
            const response = await fetch(`${API_URL}/post/getPost?postId=${postId}`, {
              method: 'GET',
              headers: { 
                  'Content-Type': 'application/json'
              }
            });
            const data = await response.json();
            console.log("BOARDINGPASSDATA:", data);
            if (response.ok) {
              setPost(data); // QR Code as base64
            }
          } catch (error) {
            console.error("Error fetching post:", error);
          }
        };
    
        fetchPost();
    }, [postId]);
    console.log("POST:",post);

    return (
        <>
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
            <img src={`data:${post.boardingPass.contentType};base64,${arrayBufferToBase64(post.boardingPass.image?.data)}`} alt="Boarding Pass" />);
        </>
    )
};

export default BoardingPassDisplay;