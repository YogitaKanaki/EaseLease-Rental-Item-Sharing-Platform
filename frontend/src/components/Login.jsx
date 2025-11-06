import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser } = useAppContext();
  const [state, setState] = React.useState("login"); // login | register | forgot
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    

    if (state === "register" && name.trim() === "") {
      toast.error("Name is required");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email address");
      return;
    }
    if ((state === "login" || state === "register") && password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (state === "forgot" && newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    const endpoint =
      state === "login"
        ? "login"
        : state === "register"
        ? "register"
        : "forgot-password";

    try {
      const res = await fetch(`http://localhost:8080/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          state === "login"
            ? { email, password }
            : state === "register"
            ? { name, email, password }
            : { email, newPassword }
        ),
      });

      const data = await res.json();

      if (res.ok) {
        if (state === "login" && data.email) {
          setUser({
            email: data.email,
            name: data.name,
            profileImage: data.profileImage || null, // store profile image
          });
          setShowUserLogin(false);
          toast.success("Login successful!");
        } else if (state === "register") {
          toast.success("Registration successful!");
          setState("login");
        } else if (state === "forgot") {
          toast.success("Password updated successfully!");
          setState("login");
        }
      } else {
        toast.error(data.error || data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto p-8 py-12 w-80 rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login"
            ? "Login"
            : state === "register"
            ? "Sign Up"
            : "Forgot Password"}
        </p>

        {state === "register" && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            className="border p-2 rounded w-full"
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          type="email"
          className="border p-2 rounded w-full"
        />

        {(state === "login" || state === "register") && (
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            type="password"
            className="border p-2 rounded w-full"
          />
        )}

        {state === "forgot" && (
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            placeholder="New Password"
            type="password"
            className="border p-2 rounded w-full"
          />
        )}

        {state === "register" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setState("login")} className="text-primary cursor-pointer">
              Login
            </span>
          </p>
        ) : state === "login" ? (
          <p>
            Create an account?{" "}
            <span onClick={() => setState("register")} className="text-primary cursor-pointer">
              Sign Up
            </span>{" "}
            |{" "}
            <span onClick={() => setState("forgot")} className="text-primary cursor-pointer">
              Forgot Password
            </span>
          </p>
        ) : (
          <p>
            Back to{" "}
            <span onClick={() => setState("login")} className="text-primary cursor-pointer">
              Login
            </span>
          </p>
        )}

        <button className="bg-primary text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register"
            ? "Create Account"
            : state === "login"
            ? "Login"
            : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default Login;
