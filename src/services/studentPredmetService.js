import axiosInstance from "./axios";

export const studentPredmetService = {
    endpoint: "StudentPredmets",
    getByStudentId: async function (studentId) {
        const response = await axiosInstance.get(`${this.endpoint}/${studentId}/Predmets`)
        return response.data
    },
    getUnpassedByStudentId: async function (studentId) {
        const response = await axiosInstance.get(`${this.endpoint}/Student/${studentId}/Prijava`)
        return response.data
    },
    deleteSP: async function (studentId, predmetId, skolskaGodina) {
        const response = await axiosInstance.delete(`${this.endpoint}/Student/${studentId}/Predmet/${predmetId}/SkolskaGodina/${encodeURIComponent(skolskaGodina)}`);
        return response
    },
    postSP: async function (studentId, predmetId, skolskaGodina) {
        const response = await axiosInstance.post(`${this.endpoint}`, {
            idStudenta: studentId,
            idPredmeta: predmetId,
            skolskaGodina
        });
        return response
    },
}