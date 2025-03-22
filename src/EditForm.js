import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "./features/formSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forms } = useSelector((state) => state.forms);

  // Find the form by ID
  const form = forms.find((f) => f._id === id);

  // Local state for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (form) {
      setFormData({
        name: form.name,
        email: form.email,
        message: form.message,
      });
    }
  }, [form]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateForm({ id, ...formData }));
    navigate("/"); // Redirect to home after updating
  };

  if (!form) return <p>Form not found!</p>;

  return (
    <div>
      <h2>Edit Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditForm;
