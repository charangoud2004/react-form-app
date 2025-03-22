import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addForm } from "./features/formSlice"; // Ensure correct path

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.forms);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("All fields are required!");
      return;
    }

    dispatch(addForm({ name, email, message }));

    // Reset form after submission
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Submit"}
      </button>

      {status === "failed" && <p style={{ color: "red" }}>Error: {error}</p>}
    </form>
  );
};

export default Form;
