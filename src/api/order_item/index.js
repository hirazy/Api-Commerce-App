import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy, getOrderbyUser, getDetailOrder, updateStatus, cancelOrder } from './controller'
import { password as passwordAuth, master, token } from '../../services/passport'
import OrderItem, { schema } from './model'

const {} = schema.tree

const router = new Router()

/**
 * @api {post} /order_items Create order item
 * @apiName CreateOrderItem
 * @apiGroup OrderItem
 * @apiSuccess {Object} orderItem Order item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order item not found.
 */
router.post('/',
    master(),
    token({ required: true, roles: ["user"] }),
    create)

/**
 * @api {get} /order_items Retrieve order items
 * @apiName RetrieveOrderItems
 * @apiGroup OrderItem
 * @apiUse listParams
 * @apiSuccess {Object[]} orderItems List of order items.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    master(),
    token({ required: true, roles: ["admin"] }),
    query(),
    index)

// /**
//  * @api {get} /order_items/:id Retrieve order item
//  * @apiName RetrieveOrderItem
//  * @apiGroup OrderItem
//  * @apiSuccess {Object} orderItem Order item's data.
//  * @apiError {Object} 400 Some parameters may contain invalid values.
//  * @apiError 404 Order item not found.
//  */
// router.get('/:id',
//     master(),
//     token({ required: true, roles: ["user", "admin"] }),
//     show)

/**
 * @api {get} /order_items Retrieve order items
 * @apiName RetrieveOrderItems
 * @apiGroup OrderItem
 * @apiUse listParams
 * @apiSuccess {Object[]} orderItems List of order items.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/user',
    token({ required: true, roles: ["user"] }),
    getOrderbyUser)

/**
 * @api {get} /order_items Retrieve order items
 * @apiName RetrieveOrderItems
 * @apiGroup OrderItem
 * @apiUse listParams
 * @apiSuccess {Object[]} orderItems List of order items.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/detail/:id',
    token({ required: true, roles: ["user"] }),
    getDetailOrder)

// /**
//  * @api {put} /order_items/:id Update order item
//  * @apiName UpdateOrderItem
//  * @apiGroup OrderItem
//  * @apiSuccess {Object} orderItem Order item's data.
//  * @apiError {Object} 400 Some parameters may contain invalid values.
//  * @apiError 404 Order item not found.
//  */
// router.put('/:id',
//     master(),
//     token({ required: true, roles: ["admin"] }),
//     update)

/**
 * @api {put} /order_items/:id Update order item
 * @apiName UpdateOrderItem
 * @apiGroup OrderItem
 * @apiSuccess {Object} orderItem Order item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order item not found.
 */
router.put('/status/:id',
    // master(),
    token({ required: true, roles: ["admin"] }),
    updateStatus)


/**
 * @api {put} /order_items/:id Update order item
 * @apiName UpdateOrderItem
 * @apiGroup OrderItem
 * @apiSuccess {Object} orderItem Order item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order item not found.
 */
router.put('/cancel/:id',
    token({ required: true, roles: ["admin"] }),
    cancelOrder)


/**
 * @api {delete} /order_items/:id Delete order item
 * @apiName DeleteOrderItem
 * @apiGroup OrderItem
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Order item not found.
 */
router.delete('/:id',
    token({ required: true, roles: ["user"] }),
    destroy)

export default router