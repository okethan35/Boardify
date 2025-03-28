const API_URL = process.env.REACT_APP_API_URL; 

const registerUser = async (username, email, password) => {
  console.log("API_URL:", API_URL);
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Registration Successful:", data.message);
    } else {
      console.error("Registration Error:", data.message);
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log(response)

    const data = await response.json();
    if (response.ok) {
        console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      console.log("Login Successful, Token:", data.token, "Username:". data.username);
    } else {
      console.error("Login Error:", data.message);
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

const getUserId = async (username) => {
  try {
    const response = await fetch(`${API_URL}/auth/userid`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${username}`
      }
    });
    console.log(response);

    const data = await response.json();
    if (response.ok) {
        console.log(data);
      console.log("Login Successful, UserID Token:", data.token);
      return data.token;
    } else {
      console.error("Request Error:", data.message);
    }
  } catch (error) {
    console.error("Error Finding User:", error);
  }
};

/*const accessProtectedRoute = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/protected`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Access Granted:", data);
    } else {
      console.error("Access Denied:", data.message);
    }
  } catch (error) {
    console.error("Error accessing protected route:", error);
  }
};
*/
export { registerUser, loginUser, getUserId/*, accessProtectedRoute*/ };
