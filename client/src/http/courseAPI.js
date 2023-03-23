import { $host } from "."

export const getCourseAPI = async ({courseId}) => {
    const { data } = await $host.get(`/api/course/${courseId}`);
    return data
}

export const getCoursesByLoginAPI = async (login) => {
    const { data } = await $host.get(`/api/course?login=${login}`);
    return data
}