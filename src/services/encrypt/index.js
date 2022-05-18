import crypto from "crypto";

export const encrypt = (val, key, iv) => {
    const cipher = crypto.createCipheriv('aes-128-cbc', key.substring(0, 32), Buffer.from(iv, 'utf8'))
    let encrypted = cipher.update(val + '', 'utf8', 'base64')
    encrypted += cipher.final('base64')
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