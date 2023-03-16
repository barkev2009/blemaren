import { $host } from "."

export const getCourseAPI = async () => {
    const { data } = await $host.get(`/api/course/${process.env.REACT_APP_COURSE_ID}`);
    return data
}