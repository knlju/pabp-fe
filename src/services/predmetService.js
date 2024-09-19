import axiosInstance from "./axios";

export const predmetService = {
    endpoint: "Predmets",
    getAllPredmets: async function () {
        const response = await axiosInstance.get(`${this.endpoint}`)
        return response.data
    },
}