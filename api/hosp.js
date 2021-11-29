import request from '@/utils/request'

const apiName = '/api/hosp/hospital'

export default {
    // 查询医院列表
    getPageList(page, limit, searchObj) {
        return request({
            url: `${apiName}/findHospList/${page}/${limit}`,
            method: 'get',
            params: searchObj
        })
    },
    // 根据医院名称模糊查询
    getByHosname(hosname) {
        return request({
            url: `${apiName}/findByHosName/${hosname}`,
            method: 'get'
        })
    },
    // 根据医院编号查医院详情
    show(hospCode) {
        return request({
            url: `${apiName}/findHospDetail/${hospCode}`,
            method: 'get'
        });
    },
    // 根据医院编号查科室
    findDepartment(hospCode) {
        return request({
            url: `${apiName}/department/${hospCode}`,
            method: 'get'
        })
    }
}