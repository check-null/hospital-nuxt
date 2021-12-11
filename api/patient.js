import request from '@/utils/request'

const api_name = `/api/user/patient`

export default {
    findList() {
        return request({
            url: `${api_name}/auth/findAll`,
            method: `get`
        })
    },
    save(patient) {
        return request({
            url: `${api_name}/auth/save`,
            method: `post`,
            data: patient
        })
    },
    getById(id) {
        return request({
            url: `${api_name}/auth/get/${id}`,
            method: `get`
        })
    },
    removeById(id) {
        return request({
            url: `${api_name}/auth/remove/${id}`,
            method: `get`
        })
    },
    updateById(patient) {
        return request({
            url: `${api_name}/auth/update`,
            method: `post`,
            data: patient
        })
    },

}