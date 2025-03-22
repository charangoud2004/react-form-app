import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchForms, softDeleteForm } from "./features/formSlice";
import { useNavigate } from "react-router-dom";

const FormList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forms, status, error } = useSelector((state) => state.forms);

  useEffect(() => {
    dispatch(fetchForms());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      dispatch(softDeleteForm(id));
    }
  };

  if (status === "loading") return <p>Loading forms...</p>;
  if (status === "failed") return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Form Entries</h2>
      {forms.length === 0 ? (
        <p>No forms found.</p>
      ) : (
        <div className="entries">
          {forms.map((form) => (
            <div key={form._id} className="entry-card">
              <div className="entry-details">
                <p><strong>Name:</strong> {form.name}</p>
                <p><strong>Email:</strong> {form.email}</p>
                <p><strong>Message:</strong> {form.message}</p>
              </div>
              <div className="entry-buttons">
                <button onClick={() => navigate(`/edit/${form._id}`)}>Edit</button>
                <button onClick={() => handleDelete(form._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormList;