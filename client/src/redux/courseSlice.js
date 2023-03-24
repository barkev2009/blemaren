import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCourseAPI, deleteCourseAPI, getCourseAPI, getCoursesByLoginAPI } from '../http/courseAPI';

export const setCourse = createAsyncThunk(
    'course/GET_COURSE',
    getCourseAPI
)

export const getCoursesByLogin = createAsyncThunk(
    'course/GET_COURSE_BY_LOGIN',
    getCoursesByLoginAPI
)

export const createCourse = createAsyncThunk(
    'course/CREATE',
    createCourseAPI
)

export const deleteCourse = createAsyncThunk(
    'course/DELETE',
    deleteCourseAPI
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
        );
        builder.addCase(
            createCourse.fulfilled, (state, action) => {
                state.courses.push(action.payload);
            }  
        );
        builder.addCase(
            deleteCourse.fulfilled, (state, action) => {
                state.course = {};
                state.courses = state.courses.filter(course => course.uuid !== action.payload.course.uuid );
            }
        );
    }
})

// Extract the action creators object and the reducer
const { reducer } = courseSlice
// export const { setCourse } = courseSlice.actions
// Export the reducer, either as a default or named export
export default reducer