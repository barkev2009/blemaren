import { $authHost, $host } from "."

export const getCourseAPI = async (courseId) => {
    const { data } = await $authHost.get(`/api/course/${courseId}`);
    return data
}

export const getCoursesByLoginAPI = async (login) => {
    const { data } = await $authHost.get(`/api/course?login=${login}`);
    return data
}

export const createCourseAPI = async (courseData) => {
    const { data } = await $authHost.post(`/api/course`, courseData);
    return data
}

export const deleteCourseAPI = async (id) => {
    const { data } = await $authHost.delete(`/api/course/${id}`)
    return data
}