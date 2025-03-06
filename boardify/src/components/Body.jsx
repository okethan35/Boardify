import '../styles/Body.css';
import pass1 from '../assets/boarding_pass_1.jpg';
import pass2 from '../assets/boarding_pass_2.jpg';
import heart_icon from '../assets/heart-regular.svg';
import comment_icon from '../assets/comment-regular.svg';
import AuthenticateButton from './AuthenticateButton';

export default function Body() {
  return (
    <>
      <div className="body">
        <AuthenticateButton />
        <h1>Your Feed</h1>
        <hr />
        <div className="feed">
          <div className="post-container">
            {/* Post 1 */}
            <div className="post-box">
              <div className="post-top">
                <div className="post-profile">
                  <img src="img/profile1.jpg" alt="Profile" />
                  <div className="name-location">
                    <h3 className="profile-name">Bloopy</h3>
                    <span className="location">New York</span>
                  </div>
                </div>
                <i className="bx bx-dots-vertical-rounded info-icon"></i>
              </div>
              <img src={pass1} alt="Boarding Pass 1" className="post-image" />
              <div className="post-bottom">
                <div className="actions-icons">
                  <input type="image" src={heart_icon} alt="Like" />
                  <input type="image" src={comment_icon} alt="Comment" />
                </div>
                <h3 className="likes">8,148 likes</h3>
                <div className="comment">
                  <p>
                    <a href="#">Lilypa</a>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum deleniti, quis mollitia adipisci dolore doloremque!{' '}
                      <span className="hashtag">#iron</span>
                    </span>
                  </p>
                </div>
                <span className="view-more">view all 148 comments</span>
                <span className="post-time">12 hours ago</span>
              </div>
            </div>

            {/* Post 2 */}
            <div className="post-box">
              <div className="post-top">
                <div className="post-profile">
                  <img src="img/profile2.jpg" alt="Profile" />
                  <div className="name-location">
                    <h3 className="profile-name">Jono</h3>
                    <span className="location">Los Angeles</span>
                  </div>
                </div>
                <i className="bx bx-dots-vertical-rounded info-icon"></i>
              </div>
              <img src={pass2} alt="Boarding Pass 2" className="post-image" />
              <div className="post-bottom">
                <div className="actions-icons">
                  <input type="image" src={heart_icon} alt="Like" />
                  <input type="image" src={comment_icon} alt="Comment" />
                </div>
                <h3 className="likes">5,312 likes</h3>
                <div className="comment">
                  <p>
                    <a href="#">Juna</a>
                    <span>
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{' '}
                      <span className="hashtag">#travel</span>
                    </span>
                  </p>
                </div>
                <span className="view-more">view all 120 comments</span>
                <span className="post-time">8 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
