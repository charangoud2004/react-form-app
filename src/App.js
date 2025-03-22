import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Form";
import FormList from "./FormList";
import EditForm from "./EditForm";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <h1>My Form App</h1>
        <Routes>
          <Route path="/" element={
            <>
              <Form />
              <FormList />
            </>
          } />
          <Route path="/edit/:id" element={<EditForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
