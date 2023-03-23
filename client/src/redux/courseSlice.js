import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCourseAPI, getCoursesByLoginAPI } from '../http/courseAPI';

export const setCourse = createAsyncThunk(
    'course/GET_COURSE',
    getCourseAPI
)

export const getCoursesByLogin = createAsyncThunk(
    'course/GET_COURSE_BY_LOGIN',
    getCoursesByLoginAPI
)

const courseSlice = createSlice({
    name: 'course',
    initialState: { course: {}, courses: [] },
    extraReducers: (builder) => {
        builder.addCase(setCourse.fulfilled, (state, action) => {
            state.course = action.payload
        });
        builder.addCase(
            getCoursesByLogin.fulfilled, (state, action) => {
                state.courses = action.payload
            }
        )
    }
})

// Extract the action creators object and the reducer
const { reducer } = courseSlice
// export const { setCourse } = courseSlice.actions
// Export the reducer, either as a default or named export
export default reducer