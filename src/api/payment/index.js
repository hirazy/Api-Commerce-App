import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { password as passwordAuth, master, token } from '../../services/passport'
import { create, index, show, update, destroy, getPaymentUser, connectMomoPayment, createMomoPayment } from './controller'
import Payment, { schema } from './model'

const {
    amount,
    extraData,
    ipnUrl,
    redirectUrl,
    orderId,
    requestType,
    callbackToken,
} = schema.tree

const router = new Router()

/**
 * @api {post} /payments Create payment
 * @apiName CreatePayment
 * @apiGroup Payment
 * @apiSuccess {Object} payment Payment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Payment not found.
 */
router.post('/',
    master(),
    token({ required: true, roles: ['user'] }),
    create)

/**
 * @api {post} /payments Create payment
 * @apiName CreatePayment
 * @apiGroup Payment
 * @apiSuccess {Object} payment Payment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Payment not found.
 */
router.post('/momo',
    token({ required: true, roles: ['user', 'admin'] }),
    body({ amount, extraData, ipnUrl, redirectUrl, orderId, requestType }),
    connectMomoPayment)

/**
 * @api {post} /payments Create payment
 * @apiName CreatePayment
 * @apiGroup Payment
 * @apiSuccess {Object} payment Payment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Payment not found.
 */
router.post('/momo/token',
    token({ required: true, roles: ['user', 'admin'] }),
    body({ callbackToken }),
    createMomoPayment)

/**
 * @api {post} /payments Create payment
 * @apiName CreatePayment
 * @apiGroup Payment
 * @apiSuccess {Object} payment Payment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Payment not found.
 */
router.post('/momo/ipn/',
    token({ required: true, roles: ['user', 'admin'] }),
    body({ amount, extraData, ipnUrl, redirectUrl, orderId, requestType }),
    connectMomoPayment)

// /**
//  * @api {get} /payments Retrieve payments
//  * @apiName RetrievePayments
//  * @apiGroup Payment
//  * @apiUse listParams
//  * @apiSuccess {Object[]} payments List of payments.
//  * @apiError {Object} 400 Some parameters may contain invalid values.
//  */
// router.get('/',
//     master(),
//     token({ required: true, roles: ['admin'] }),
//     query(),
//     index)

/**
 * @api {get} /payments Retrieve payments
 * @apiName RetrievePayments
 * @apiGroup Payment
 * @apiUse listParams
 * @apiSuccess {Object[]} payments List of payments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    token({ required: true, roles: ['user'] }),
    getPaymentUser
)

/**
 * @api {get} /payments/:id Retrieve payment
 * @apiName RetrievePayment
 * @apiGroup Payment
 * @apiSuccess {Object} payment Payment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Payment not found.
 */
router.get('/:id',
    master(),
    token({ required: true, roles: ['user', 'admin'] }),
    show)

/**
 * @api {put} /payments/:id Update payment
 * @apiName UpdatePayment
 * @apiGroup Payment
 * @apiSuccess {Object} payment Payment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Payment not found.
 */
router.put('/:id',
    master(),
    token({ required: true, roles: ['user', 'admin'] }),
    update)

/**
 * @api {delete} /payments/:id Delete payment
 * @apiName DeletePayment
 * @apiGroup Payment
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Payment not found.
 */
router.delete('/:id',
    master(),
    token({ required: true, roles: ['admin'] }),
    destroy)

export default router