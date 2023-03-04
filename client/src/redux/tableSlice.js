import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMeasures = createAsyncThunk(
  'MEASURES/GET_MEASURES',
  async () => {
    const response = await axios.get('http://localhost:5000/api/measure/', { params: { courseId: 6 } })
    return response.data
  }
)

const measureSlice = createSlice({
  name: 'measures',
  initialState: { raw: [], dateSplitData: [] },
  reducers: {
    addYearGroup(state, action) {
      state[action.payload.date] = action.payload.data
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMeasures.fulfilled, (state, action) => {
      state.raw.length = 0;
      state.dateSplitData.length = 0;
      state.raw.push(...action.payload);
      const dates = [... new Set(action.payload.map(item => new Date(item.measure_date).toLocaleDateString()))];
      dates.forEach(
        date => state.dateSplitData.push(
          {
            date,
            data: action.payload.filter(item => new Date(item.measure_date).toLocaleDateString() === date)
          }
        ))
    })
  }
})

// Extract the action creators object and the reducer
const { reducer } = measureSlice
export const { addYearGroup } = measureSlice.actions
// Export the reducer, either as a default or named export
export default reducer