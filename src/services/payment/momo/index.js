import { momoServiceKey } from '../../../config'
const crypto = require('crypto');
const axios = require('axios').default

const partnerCode = "Momo"
const accessKey = ''
const requestId = partnerCode + new Date().getTime()
const orderId = requestId
const orderInfo = "pay with Momo"

var redirectUrl = "https://momo.vn/return";
var ipnUrl = "https://callback.url/notify";

export default payMomo = (amount, orderInfo) => {
    const signature = crypto.createHmac('sha256', secretkey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: 'en'
    })

    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '',
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }

    const req = axios.request(options, res => {
        console.log(`Status Request ${res.status}`)

        return res.on('data', (body) => {
            console.log('Body: ');
            console.log(body);
            console.log('payUrl: ');
            console.log(JSON.parse(body).payUrl);
        });
    })

}