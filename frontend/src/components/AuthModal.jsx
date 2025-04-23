import { useState } from "react";

export default function AuthModal({ setShowAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "/api/login" : "/api/signup";
    const body = isLogin ? { email, password } : { email, password, confirmPassword };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        alert(isLogin ? "Logged in successfully" : "Signed up successfully");
        setShowAuth(false);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-content">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleAuthSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign Up" : "Login"}</button>
        </p>
        <button className="close-auth-btn" onClick={() => setShowAuth(false)}>
          Close
        </button>
      </div>
    </div>
  );
}