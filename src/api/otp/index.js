import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { createSms, createEmail, index, show, update, destroy } from './controller'
import { master, token } from '../../services/passport'
import Otp, { schema } from './model'

const router = new Router()

const { email, phone } = schema.tree

/**
 * @api {post} /otps/phone Create otp for Phone - SMS
 * @apiName CreateOtp
 * @apiGroup Otp
 * @apiSuccess {Object} otp Otp's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Otp not found.
 */
router.post('/phone',
    master(),
    body({ phone }),
    createSms)

/**
 * @api {post} /otps/email Create otp for Email - Mail
 * @apiName CreateOtp
 * @apiGroup Otp
 * @apiSuccess {Object} otp Otp's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Otp not found.
 */
router.post('/email',
    master(),
    body({ email }),
    createEmail
)

/**
 * @api {get} /otps Retrieve otps
 * @apiName RetrieveOtps
 * @apiGroup Otp
 * @apiUse listParams
 * @apiSuccess {Object[]} otps List of otps.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    master(),
    token({ required: true, roles: ['admin'] }),
    query(),
    index)

/**
 * @api {get} /otps/:id Retrieve otp
 * @apiName RetrieveOtp
 * @apiGroup Otp
 * @apiSuccess {Object} otp Otp's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Otp not found.
 */
router.get('/:id',
    master(),
    token({ required: true, roles: ['admin'] }),
    show)

/**
 * @api {put} /otps/:id Update otp
 * @apiName UpdateOtp
 * @apiGroup Otp
 * @apiSuccess {Object} otp Otp's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Otp not found.
 */
router.put('/:id',
    master(),
    token({ required: true, roles: ['admin'] }),
    update)

/**
 * @api {delete} /otps/:id Delete otp
 * @apiName DeleteOtp
 * @apiGroup Otp
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Otp not found.
 */
router.delete('/:id',
    master(),
    token({ required: true, roles: ['admin'] }),
    destroy)

export default router