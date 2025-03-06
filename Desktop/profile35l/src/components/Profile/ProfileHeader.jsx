import React from "react";

function ProfileHeader({
  avatarUrl,
  modalOpen,
  setModalOpen,
  PencilIcon,
  displayName,
  followingCount,
  followerCount,
  bio,
  editProfileOpen,
  setEditProfileOpen,
}) {
  return (
    <div className="flex flex-col justify-center items-center my-5">
      {/* Avatar Section */}
      <div className="relative">
        <img
          src={avatarUrl.current}
          alt="Avatar"
          className="w-[150px] h-[150px] rounded-full border-2 border-[#FFD700]"
        />
        <button
          className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-[#333] hover:bg-[#444] border border-[#FFD700]"
          title="Change photo"
          onClick={() => setModalOpen(true)}
        >
          <PencilIcon />
        </button>
      </div>
      <span className="my-3 text-lg font-semibold">{displayName}</span>
      <div className="flex gap-10 text-sm">
        <div className="flex flex-col items-center">
          <span className="font-bold">{followingCount}</span>
          <span>Following</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">{followerCount}</span>
          <span>Followers</span>
        </div>
      </div>
      <button
        className="my-5 px-5 py-2 font-semibold text-sm border border-[#FFD700] bg-transparent hover:bg-[#333]"
        onClick={() => setEditProfileOpen(true)}
      >
        Edit profile
      </button>
      <p className="mb-3 text-center">{bio}</p>
    </div>
  );
}

export default ProfileHeader;
