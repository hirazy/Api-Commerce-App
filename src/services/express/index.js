import express from 'express'
import forceSSL from 'express-force-ssl'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env } from '../../config'
import { appLimiter } from '../../services/rate-limit/index'

export default (apiRoot, routes) => {
    const app = express()

    /* istanbul ignore next */
    if (env === 'production') {
        app.set('forceSSLOptions', {
            enable301Redirects: false,
            trustXFPHeader: true
        })
        app.use(forceSSL)
    }

    /* istanbul ignore next */
    if (env === 'production' || env === 'development') {
        app.use(cors())
        app.use(compression())
        app.use(morgan('dev'))

        /**
         * Limit Request Access
         */
        app.use(appLimiter)

        /**
         * Limit Body 10kb send
         */
        app.use(express.json({ limit: '30mb' }));
        app.use(helmet())
    }

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(apiRoot, routes)
    app.use(queryErrorHandler())
    app.use(bodyErrorHandler())

    return app
}