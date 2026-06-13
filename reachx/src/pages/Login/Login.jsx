import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    if (
      username === "admin" &&
      password === "admin123"
    ) {

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      navigate("/");
    }

    else {

      alert(
        "Invalid Username or Password"
      );

    }
  };

  return (

    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "#F8FAFC",
      }}
    >

      <div
        className="card p-5 shadow"
        style={{
          width: "400px",
          borderRadius: "20px",
        }}
      >

        <h2 className="mb-4 text-center">
          ReachX Login
        </h2>

        <input
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="btn btn-primary"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;