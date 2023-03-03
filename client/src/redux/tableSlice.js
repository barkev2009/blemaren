import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getMeasures = createAsyncThunk(
    'MEASURES/GET_MEASURES',
    async () => {
      const response = await axios.get('http://localhost:5000/api/measure/', {params: {courseId: 6}})
      return response.data
    }
  )

const measureSlice = createSlice({
    name: 'measures',
    initialState: [],
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getMeasures.fulfilled, (state, action) => {
            state.length = 0;
            state.push(...action.payload);
        })
    }
  })
  
  // Extract the action creators object and the reducer
  const { reducer } = measureSlice
  // Export the reducer, either as a default or named export
  export default reducer