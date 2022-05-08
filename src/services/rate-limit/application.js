import rateLimit from 'express-rate-limit'

export const applicationLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    skipSuccessfulRequests: false,
    keyGenerator: (request, _response) => request.clientIp,
    handler: (_request, response, _next, options) => {
        response.status(options.statusCode).send({ code: options.statusCode, message: options.message })
    }
})