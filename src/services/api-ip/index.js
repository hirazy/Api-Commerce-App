import request from 'request'

export const ipExtractor = (ip) =>
    new Promise((resolve) =>
        request('http://ip-api.com/json/' + ip + '?lang=en', { json: true }, (err, res, body) => {
            if (res.statusCode === 200) {
                resolve(body)
            } else {
                resolve(null)
            }
        })
    )