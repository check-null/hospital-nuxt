import request from '@/utils/request'

const apiName = '/admin/cmn/dict'

export default {
    // 根据dictCode获得下级节点
    findByDictCode(dictCode) {
        return request({
            url: `${apiName}/findByDictCode/${dictCode}`,
            method: 'get',
        })
    },
    // 根据id获得下级节点
    findByParentId(parentId) {
        return request({
            url: `${apiName}/findChildData/${parentId}`,
            method: 'get'
        })
    }
}