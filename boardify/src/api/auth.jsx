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

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      console.log("Login Successful, Token:", data.token);
    } else {
      console.error("Login Error:", data.message);
    }
  } catch (error) {
    console.error("Error logging in:", error);
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
export { registerUser, loginUser/*, accessProtectedRoute*/ };
