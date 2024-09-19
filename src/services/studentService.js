import axiosInstance from "./axios"
export const studentService = {
    endpoint: "/Students",
    getAll: async function () {
        const response = await axiosInstance.get(`${this.endpoint}`);
        return response.data;
    },
    pretraga: async function (search) {
        const { ime, prezime, smer, broj } = search || {}
        const response = await axiosInstance.get(`${this.endpoint}/pretraga`, {
            params: {
                ime: ime || undefined,
                prezime: prezime || undefined,
                smer: smer || undefined,
                broj: broj || undefined
            }
        });
        return response.data;
    },
    patch: async function (id, student) {
        const response = await axiosInstance.patch(`${this.endpoint}/${id}`, student);
        return response.data;
    },
}