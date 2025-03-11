const API_URL = process.env.REACT_APP_API_URL; 

//TODO: add makePost route here
const makePost = async (userId, username, profileImg) => {
    try {
      const response = await fetch(`${API_URL}/post/makePost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, username, profileImg }),
      });
      console.log(response)
  
      if (response.ok) {
        console.log("Post Creation Successful:", data.message);
      } else {
        console.error("Post Creation Error:", data.message);
      }
      } catch (error) {
          console.error("Error Creating Post:", error);
      }
  };

const getPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/post/getPosts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if (response.ok) {
        console.log(data.postList);
      console.log("GET Successful, Posts:", data.postList);
      return data.postList;
    } else {
      console.error("Request Error:", data.message);
    }
  } catch (error) {
    console.error("Error Getting Posts:", error);
  }
};

const like = async (postId, username) => {
  try {
    const response = await fetch(`${API_URL}/post/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, username }),
    });
    console.log(response)

    const data = await response.json();
    if (response.ok) {
        console.log(data);
        return data;
    } else {
        throw new Error(data.message || "Something went wrong");
    }
    } catch (error) {
        console.error("Error handling like:", error);
    }
};

const makeComment = async (postId, username, comment) => {
    try {
        const response = await fetch(`${API_URL}/post/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, username, comment }),
        });
        console.log(response)

        const data = await response.json();
        if (response.ok) {
            console.log(data);
            return data;
        } else {
            throw new Error(data.message || "Something went wrong");
        }
    } catch (error) {
      console.error("Error handling comment:", error);
    }
};