import { hostNameMomo, momoAccessKey, momoSecretKey, momoPartnerCode, momoPartnerName } from '../../config'
import { v4 as uuidv4 } from 'uuid';
import { encryptRSA } from '../../services/encrypt'
const https = require('https');
const http = require('http')
const axios = require('axios').default
const crypto = require('crypto');

const urlConnectWallet = '/v2/gateway/api/create'
const urlTokenization = '/v2/gateway/api/tokenization/bind'
const urlTokenizationPay = '/v2/gateway/api/tokenization/pay'

/**
 * 
 * @param {*} body
 * Connect Momo Wallet 
 */
export const connectMomoWallet = (body) => {

    let requestId = uuidv4()
    let orderInfo = "Link Wallet"
    let amount = body.amount
    let orderId = uuidv4()
    let redirectUrl = body.redirectUrl;
    let ipnUrl = "https://callback.url/notify";
    let extraData = body.extraData
    let requestType = body.requestType
    let partnerClientId = body.partnerClientId

    var rawSignature = "accessKey=" + momoAccessKey +
        "&amount=" + amount +
        "&extraData=" + extraData +
        "&ipnUrl=" + ipnUrl +
        "&orderId=" + orderId +
        "&orderInfo=" + orderInfo +
        "&partnerClientId=" + partnerClientId +
        "&partnerCode=" + momoPartnerCode +
        "&redirectUrl=" + redirectUrl +
        "&requestId=" + requestId +
        "&requestType=" + requestType

    var signature = crypto.createHmac('sha256', momoSecretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        "partnerCode": momoPartnerCode,
        "accessKey": momoAccessKey,
        "requestId": requestId,
        "amount": amount,
        "orderId": orderId,
        "ipnUrl": ipnUrl,
        "redirectUrl": redirectUrl,
        "partnerClientId": partnerClientId,
        "orderInfo": orderInfo,
        "extraData": extraData,
        "requestType": "linkWallet",
        "lang": "vi",
        "signature": signature
    })

    const options = {
        hostname: hostNameMomo,
        port: 443,
        path: urlConnectWallet,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }

    const req = https.request(options)
    req.write(requestBody);

    console.log("Sending....")
    return req
}

/**
 * Request Token Payment - Momo
 */
export const requestTokenConnect = (body) => {

    let callbackToken = body.callbackToken
    let orderId = body.orderId
    let partnerClientId = body.partnerClientId
    let requestId = uuidv4()

    var rawSignature = "accessKey=" + momoAccessKey +
        "&callbackToken=" + callbackToken +
        "&orderId=" + orderId +
        "&partnerClientId=" + partnerClientId +
        "&partnerCode=" + momoPartnerCode +
        "&requestId=" + requestId

    var signature = crypto.createHmac('sha256', momoSecretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        "partnerCode": momoPartnerCode,
        "requestId": requestId,
        "callbackToken": callbackToken,
        "orderId": orderId,
        "requestType": "queryToken",
        "partnerClientId": partnerClientId,
        "lang": "vi",
        "signature": signature
    })

    const options = {
        hostname: hostNameMomo,
        port: 443,
        path: urlTokenization,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }

    const req = https.request(options)

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });

    console.log("Sending....")
    req.write(requestBody);
    return req
}

export const purchaseByToken = (body) => {
    let requestId = uuidv4()
    let orderInfo = uuidv4()
    let amount = body.amount
    let orderId = body.orderId
    let redirectUrl = body.redirectUrl;
    let ipnUrl = "https://callback.url/notify";
    let extraData = body.extraData
    let partnerClientId = body.partnerClientId
    let token = body.token

    var rawSignature = "accessKey=" + momoAccessKey +
        "&amount=" + amount +
        "&extraData=" + extraData +
        "&ipnUrl=" + ipnUrl +
        "&orderId=" + orderId +
        "&orderInfo=" + orderInfo +
        "&partnerClientId=" + partnerClientId +
        "&partnerCode=" + momoPartnerCode +
        "&requestId=" + requestId +
        "&token=" + token

    var signature = crypto.createHmac('sha256', momoSecretKey)
        .update(rawSignature)
        .digest('hex');

    let tokenEncrypted = encryptRSA({ token: token })

    const requestBody = JSON.stringify({
        "token": tokenEncrypted,
        "partnerCode": momoPartnerCode,
        "partnerName": momoPartnerName,
        "storeId": momoPartnerCode,
        "requestId": requestId,
        "amount": amount,
        "orderId": orderId,
        "ipnUrl": ipnUrl,
        "redirectUrl": redirectUrl,
        "autoCapture": true,
        "partnerClientId": partnerClientId,
        "orderInfo": orderInfo,
        "extraData": "",
        "lang": "vi",
        "signature": signature
    })

    const options = {
        hostname: hostNameMomo,
        port: 443,
        path: urlTokenizationPay,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }

    const req = https.request(options)

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });

    console.log("Sending....")
    req.write(requestBody);
    return req
}