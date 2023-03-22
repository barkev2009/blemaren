import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createMeasureAPI, deleteMeasureAPI, getMeasuresAPI } from '../http/measureAPI';
import { enums } from './../enums'

export const getMeasures = createAsyncThunk(
  'measures/GET_MEASURES',
  getMeasuresAPI
)
export const createMeasure = createAsyncThunk(
  'measures/CREATE_MEASURE',
  createMeasureAPI
)
export const deleteMeasure = createAsyncThunk(
  'measures/DELETE_MEASURE',
  deleteMeasureAPI
)

const sortBy = Object.keys(enums);
export const sortByObject = sortBy.reduce((a, c, i) => {
  a[c] = i
  return a
}, {})

const measureSlice = createSlice({
  name: 'measures',
  initialState: { raw: [], structuredData: [], chosenMeasure: null, avgOnly: false, error: null },
  reducers: {
    setChosenMeasure(state, action) {
      state.chosenMeasure = action.payload
    },
    setAvgOnly(state, action) {
      state.avgOnly = action.payload
    },
    removeError(state) {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMeasures.fulfilled, (state, action) => {
      state.raw.length = 0;
      state.structuredData.length = 0;
      state.raw.push(...action.payload);

      const cycles = [...new Set(action.payload.map(item => item.cycle))].reverse();

      cycles.forEach(
        cycle => {
          let dates = [...new Set(action.payload.filter(item => item.cycle === cycle).map(
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
                  ).sort((a, b) => sortByObject[a.day_time] - sortByObject[b.day_time])
                })
              ).sort((a, b) => new Date(a.date) - new Date(b.date))
            }
          )
        }
      );
    });
    builder.addCase(deleteMeasure.fulfilled, (state, action) => {
      if (action.payload.result === 1) {
        state.error = null;
        const measure = action.payload.measure;
        state.chosenMeasure = null;
        state.raw = state.raw.filter(item => Number(item.id) !== Number(measure.id));

        const cycle = state.structuredData.filter(item => Number(item.cycle) === Number(measure.cycle))[0];
        const dateItem = cycle.cycleData.filter(item => item.date === new Date(measure.measure_date).toLocaleDateString())[0];

        dateItem.data = dateItem.data.filter(item => Number(item.id) !== Number(measure.id));
        if (dateItem.data.length === 0) {
          cycle.cycleData = cycle.cycleData.filter(item => item.date !== new Date(measure.measure_date).toLocaleDateString());
        }
        if (cycle.cycleData.length === 0) {
          state.structuredData = state.structuredData.filter(item => Number(item.cycle) !== Number(measure.cycle));
        }
      }
    }
    );
    builder.addCase(createMeasure.fulfilled, (state, action) => {
      const measure = action.payload.measure;
      if (measure) {
        state.raw.push(measure);
        state.error = null;

        const cycle = state.structuredData.filter(item => Number(item.cycle) === Number(measure.cycle))[0];
        if (cycle) {
          const dateItem = cycle.cycleData.filter(item => item.date === new Date(measure.measure_date).toLocaleDateString())[0];
          if (dateItem) {
            dateItem.data.push(measure);
            dateItem.data.sort((a, b) => sortByObject[a.day_time] - sortByObject[b.day_time])
          } else {
            const data = [measure]
            cycle.cycleData.push(
              {
                date: new Date(measure.measure_date).toLocaleDateString(),
                data
              }
            )
          }
        } else {
          state.structuredData.unshift(
            {
              cycle: measure.cycle,
              cycleData: [
                {
                  date: new Date(measure.measure_date).toLocaleDateString(),
                  data: [measure]
                }
              ]
            }
          )
        }
      }
    }
    );
    builder.addCase(
      createMeasure.rejected, (state, action) => {
        console.log(action.error);
        state.error = action.error
      }
    )
  }
})

// Extract the action creators object and the reducer
const { reducer } = measureSlice
export const { setChosenMeasure, setAvgOnly, removeError } = measureSlice.actions
// Export the reducer, either as a default or named export
export default reducer