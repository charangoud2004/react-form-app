import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks for API calls
export const fetchForms = createAsyncThunk('forms/fetchForms', async () => {
  const response = await axios.get('http://localhost:5080/api/forms');
  return response.data.map(form => ({
    id: form._id, // Normalize _id to id
    ...form
  }));
});

export const addForm = createAsyncThunk('forms/addForm', async (newForm) => {
  const response = await axios.post('http://localhost:5080/api/forms', newForm);
  return { id: response.data._id, ...response.data }; // Ensure consistent id usage
});

export const updateForm = createAsyncThunk('forms/updateForm', async (updatedForm) => {
  const response = await axios.put(`http://localhost:5080/api/forms/${updatedForm.id}`, updatedForm);
  return { id: response.data._id, ...response.data }; // Ensure consistent id usage
});

export const softDeleteForm = createAsyncThunk('forms/softDeleteForm', async (id) => {
  await axios.delete(`http://localhost:5080/api/forms/${id}`);
  return id;
});

const formSlice = createSlice({
  name: 'forms',
  initialState: {
    forms: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forms = action.payload;
      })
      .addCase(fetchForms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addForm.fulfilled, (state, action) => {
        state.forms.push(action.payload);
      })
      .addCase(updateForm.fulfilled, (state, action) => {
        const index = state.forms.findIndex((form) => form.id === action.payload.id);
        if (index !== -1) state.forms[index] = action.payload;
      })
      .addCase(softDeleteForm.fulfilled, (state, action) => {
        state.forms = state.forms.filter((form) => form.id !== action.payload);
      });
  },
});

export default formSlice.reducer;
