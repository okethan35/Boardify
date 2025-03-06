import React, { useRef, useState } from "react";
import PencilIcon from "./PencilIcon";
import Modal from "./Modal";
import EditProfileModal from "./EditProfileModal";
import ProfileHeader from "./ProfileHeader";
import TabNavigation from "./TabNavigation";
import ProfileContent from "./ProfileContent";
import BottomNav from "./BottomNav";

function Profile() {
  const avatarUrl = useRef("https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1741212173~exp=1741215773~hmac=f78c25a738882c86ca4507b8448a95e459dd92a79ae8700485a9b072114319d8&w=740");
  const [modalOpen, setModalOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  
  const [username, setUsername] = useState("username");
  const [displayName, setDisplayName] = useState("Display Name");
  const [bio, setBio] = useState("Bio Goes Here");
  
  const [followingCount, setFollowingCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);

  const [activeTab, setActiveTab] = useState(0);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  return (
    <div className="relative max-w-2xl mx-auto my-3 min-h-screen bg-black text-[#FFD700] p-4">
      {/* Top Nav */}
      <div className="flex items-center justify-between py-3">
      <button className="p-2 hover:bg-[#222] rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        <a href="#" className="flex gap-1 items-center">
          <span className="font-bold">@{username}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
         {/* placeholder for notification bell icon and messages icon maybe */}
        <div className="w-6" />
      </div>

      {/* Header */}
      <ProfileHeader
        avatarUrl={avatarUrl}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        PencilIcon={PencilIcon}
        displayName={displayName}
        followingCount={followingCount}
        followerCount={followerCount}
        bio={bio}
        editProfileOpen={editProfileOpen}
        setEditProfileOpen={setEditProfileOpen}
      />

      {/* Middle Navigation */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content (Posts, Archive, Favorite) */}
      <ProfileContent activeTab={activeTab} />

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Modal Ganti Avatar */}
      {modalOpen && (
        <Modal updateAvatar={updateAvatar} closeModal={() => setModalOpen(false)} />
      )}

      {/* Modal Edit Profile */}
      {editProfileOpen && (
        <EditProfileModal
          username={username}
          displayName={displayName}
          bio={bio}
          setUsername={setUsername}
          setDisplayName={setDisplayName}
          setBio={setBio}
          closeModal={() => setEditProfileOpen(false)}
        />
      )}
    </div>
  );
}

export default Profile;
