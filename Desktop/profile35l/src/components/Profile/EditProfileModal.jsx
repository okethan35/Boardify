import React, { useState } from "react";

const EditProfileModal = ({
  username,
  displayName,
  bio,
  setUsername,
  setDisplayName,
  setBio,
  closeModal,
}) => {
  // State lokal untuk form
  const [tempUsername, setTempUsername] = useState(username);
  const [tempDisplayName, setTempDisplayName] = useState(displayName);
  const [tempBio, setTempBio] = useState(bio);

  // Fungsi untuk menyimpan perubahan dan menutup modal
  const handleSave = () => {
    setUsername(tempUsername);
    setDisplayName(tempDisplayName);
    setBio(tempBio);
    closeModal();
  };

  return (
    // Overlay modal dengan latar belakang hitam transparan
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {/* Kontainer modal */}
      <div className="bg-black p-6 text-[#FFD700] rounded-md w-80">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        {/* Field untuk Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#FFD700] mb-1">
            Username (@)
          </label>
          <input
            type="text"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
            className="w-full bg-transparent border border-[#FFD700] text-white p-2 rounded"
          />
        </div>

        {/* Field untuk Display Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#FFD700] mb-1">
            Display Name
          </label>
          <input
            type="text"
            value={tempDisplayName}
            onChange={(e) => setTempDisplayName(e.target.value)}
            className="w-full bg-transparent border border-[#FFD700] text-white p-2 rounded"
          />
        </div>

        {/* Field untuk Bio */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#FFD700] mb-1">
            Bio
          </label>
          <textarea
            value={tempBio}
            onChange={(e) => setTempBio(e.target.value)}
            className="w-full bg-transparent border border-[#FFD700] text-white p-2 rounded"
            rows={3}
          ></textarea>
        </div>

        {/* Tombol Cancel dan Save */}
        <div className="flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-[#FFD700] rounded hover:bg-[#333]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
