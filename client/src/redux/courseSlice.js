import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCourseAPI } from '../http/courseAPI';

export const setCourse = createAsyncThunk(
    'course/GET_COURSE',
    getCourseAPI
)

const courseSlice = createSlice({
    name: 'course',
    initialState: { course: {} },
    extraReducers: (builder) => {
        builder.addCase(setCourse.fulfilled, (state, action) => {
            state.course = action.payload
        })
    }
})

// Extract the action creators object and the reducer
const { reducer } = courseSlice
// export const { setCourse } = courseSlice.actions
// Export the reducer, either as a default or named export
export default reducer