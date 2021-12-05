import request from '@/utils/request'

const api_name = '/oauth'

export default {
    getLoginParam() {
        return request({
            url: `${api_name}/render/qq`,
            method: 'get'
        })
    }
}