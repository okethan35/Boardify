import React from "react";
import Pass1 from "../../assets/boarding_pass_1.jpg";

function ProfileContent({ activeTab }) {
  return (
    <div className="mt-2 w-full h-60 flex items-center justify-center">
      {activeTab === 0 && (
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${Pass1})` }}
        />
      )}
      {activeTab === 1 && <span>archive is empty.</span>}
      {activeTab === 2 && <span>favorite is empty.</span>}
    </div>
  );
}

export default ProfileContent;
