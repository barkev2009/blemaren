import { $host } from "."

export const getMeasuresAPI = async (courseId) => {
    const { data } = await $host.get('/api/measure/', { params: { courseId } });
    localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_KEY_COURSE, courseId);
    return data
}

export const createMeasureAPI = async (measureData) => {
    try {
        const { data } = await $host.post(`/api/measure/`, measureData);
        return data
    } catch (error) {
        throw error.response.data;
    }   
}

export const deleteMeasureAPI = async (id) => {
    const { data } = await $host.delete(`/api/measure/${id}`)
    return data
}
