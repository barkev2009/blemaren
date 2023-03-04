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
  initialState: { raw: [], structuredData: [] },
  reducers: {
    addYearGroup(state, action) {
      state[action.payload.date] = action.payload.data
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMeasures.fulfilled, (state, action) => {
      state.raw.length = 0;
      state.structuredData.length = 0;
      state.raw.push(...action.payload);

      const cycles = [... new Set(action.payload.map(item => item.cycle))];

      cycles.forEach(
        cycle => {
          let dates = [... new Set(action.payload.filter(item => item.cycle === cycle).map(
            item => new Date(item.measure_date).toLocaleDateString()
          ))];
          state.structuredData.push(
            {
              cycle,
              cycleData: dates.map(
                date => ({
                  date,
                  data: action.payload.filter(
                    item => new Date(item.measure_date).toLocaleDateString() === date
                      & item.cycle === cycle
                  )
                })
              )
            }
          )
        }
      );
    })
  }
})

// Extract the action creators object and the reducer
const { reducer } = measureSlice
export const { addYearGroup } = measureSlice.actions
// Export the reducer, either as a default or named export
export default reducer