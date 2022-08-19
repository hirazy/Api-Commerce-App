import crypto from "crypto";
import { momoPublicKey } from '../../config'
const NodeRSA = require('node-rsa');

export const encrypt = (val, key, iv) => {
    const cipher = crypto.createCipheriv('aes-128-cbc', key.substring(0, 32), Buffer.from(iv, 'utf8'))
    let encrypted = cipher.update(val + '', 'utf8', 'base64')
    encrypted += cipher.final('base64')
    return encrypted
}

export const encryptRSA = (val) => {
    const pubKey = '-----BEGIN PUBLIC KEY-----' +
        momoPublicKey +
        '-----END PUBLIC KEY-----';

    const key = new NodeRSA(pubKey, { encryptionScheme: 'pkcs1' });

    // const jsonData = {
    //     "partnerCode": "MOMOV2OF20180515",
    //     "partnerRefId": "caa5a630-8a3a-11e8-884c-653db95e86a6",
    //     "amount": 500000,
    //     "partnerTransId": "caa5a630-8a3a-11e8-884c-653db95e86a6"
    // };
    const encrypted = key.encrypt(JSON.stringify(val), 'base64');
    return encrypted
}

export const decrypt = (encrypted, key, iv) => {
    try {
        const decipher = crypto.createDecipheriv('aes-128-cbc', key.substring(0, 32), Buffer.from(iv, 'utf8'))
        const decrypted = decipher.update(encrypted, 'base64', 'utf8')
        return decrypted + decipher.final('utf8')
    } catch {
        return encrypted
    }
}