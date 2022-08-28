import { app } from 'firebase-admin'
import { hostNameZalo, } from '../../config'

const axios = require('axios').default

const urlBindingZaloPay = '/v2/agreement/bind'
const urlQueryToken = '/v2/agreement/query'

export const bindingZaloPay = async(body) => {
    const app_id = ''
    const app_trans_id = '12'
    const bindingData = ''
    const bindingType = 'WALLET'
    const identifier = ''
    const max_amount = 0
    const redirectUrl = ''
    const redirectDeepLink = ''
    const callbackUrl = ''
    const reqDate = ''
    const macInput = `${app_id}|${app_trans_id}|${bindingData}|${bindingType}|${identifier}|${max_amount}|${reqDate}`

    const mac = crypto.createHmac('sha256', momoSecretKey)
        .update(rawSignature)
        .digest('hex');


    const bodyRequest = {
        app_id: app_id,
        binding_data: bindingData,
        app_trans_id: app_trans_id,
        binding_type: bindingType,
        identifier: identifier,
        max_amount: max_amount,
        redirect_url: redirectUrl,
        redirect_deep_link: redirectDeepLink,
        callback_url: callbackUrl,
        req_date: reqDate,
        mac: mac
    }

    const response = await axios.post(`${hostNameZalo}${urlBindingZaloPay}`, bodyRequest)
    return response
}