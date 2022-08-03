import { Router } from 'express'
import { master, token } from '../../services/passport'
import { middleware as body } from 'bodymen'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'
import Order, { schema } from './model'
const { address, carts, totalCost } = schema.tree

// const {}

const router = new Router()

/**
 * @api {post} /orders Create order
 * @apiName CreateOrder
 * @apiGroup Order
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.post('/',
    // master(),
    token({ required: true, roles: ["user"] }),
    body({ address, carts, totalCost }),
    create)

/**
 * @api {get} /orders Retrieve orders
 * @apiName RetrieveOrders
 * @apiGroup Order
 * @apiUse listParams
 * @apiSuccess {Object[]} orders List of orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    master(),
    token({ required: true, roles: ['admin'] }),
    query(),
    index)

/**
 * @api {get} /orders/:id Retrieve order
 * @apiName RetrieveOrder
 * @apiGroup Order
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.get('/:id',
    master(),
    token({ required: true }),
    show)

/**
 * @api {put} /orders/:id Update order
 * @apiName UpdateOrder
 * @apiGroup Order
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.put('/:id',
    master(),
    token({ required: true }),
    update)

/**
 * @api {delete} /orders/:id Delete order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Order not found.
 */
router.delete('/:id',
    token({ required: true, roles: ['user'] }),
    destroy)

export default router