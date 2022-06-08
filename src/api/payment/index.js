import { Router } from 'express'
import { middleware as query } from 'querymen'
import { password as passwordAuth, master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import Payment, { schema } from './model'

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
    master(),
    token({ required: true, roles: ['user', 'admin'] }),
    create)

/**
 * @api {get} /payments Retrieve payments
 * @apiName RetrievePayments
 * @apiGroup Payment
 * @apiUse listParams
 * @apiSuccess {Object[]} payments List of payments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    master(),
    token({ required: true, roles: ['admin'] }),
    query(),
    index)

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