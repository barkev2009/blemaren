import { $host } from "."

export const getMeasuresAPI = async () => {
    const { data } = await $host.get('/api/measure/', { params: { courseId: 6 } })
    return data
}

export const createMeasureAPI = async (measureData) => {
    const { data } = await $host.post(`/api/measure/`, measureData)
    return data
}

export const deleteMeasureAPI = async (id) => {
    const {data} = await $host.delete(`/api/measure/${id}`)
    return data
}
