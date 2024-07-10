import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { auth, provider } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/home");
          toast.success("You logged in account");
        })
        .catch((err) => {
          if (err.code === "auth/invalid-credential") {
            toast.error(err.code);
            setIsError(true);
          }
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/home");
          toast.info("Your account has created");
        })
        .catch((err) => toast.error(err.code));
    }
  };

  const sendMail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => toast.info("Password reset email sent"))
      .catch((err) => console.log(err));
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => navigate("/home"))
      .catch((err) => console.log(err));
  };

  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-xl">
        <div className="flex justify-center">
          <img src="/x-logo.webp" className="h-16" />
        </div>
        <h1 className="text-center text-2xl font-bold">
          {isLogin ? "Login Twitter" : "Sign Up Twitter"}
        </h1>
        <button
          onClick={loginWithGoogle}
          className="bg-white text-black flex items-center gap-2 py-2 px-8 rounded-full hover:opacity-90"
        >
          <img src="google-logo.svg" className="h-5" />
          <span>Login with Google</span>
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="p-1 rounded text-black"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="p-1 rounded text-black"
              required
            />
          </div>
          <button className="bg-white text-black font-bold py-1 rounded-full mt-4">
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <div className="flex gap-2">
            <span className="text-neutral-600">
              {isLogin ? "Don't have an account" : "Already have an account?"}
            </span>
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </div>
        </form>
        {isError && (
          <p
            onClick={sendMail}
            className="text-red-600 text-center cursor-pointer hover:underline"
          >
            Forgot Password?
          </p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
