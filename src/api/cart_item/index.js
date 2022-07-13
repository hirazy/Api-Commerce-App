import { Router } from 'express'
import { middleware as query } from 'querymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import CartItem, { schema } from './model'

const router = new Router()

/**
 * @api {post} /cart_items Create cart item
 * @apiName CreateCartItem
 * @apiGroup CartItem
 * @apiSuccess {Object} cartItem Cart item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cart item not found.
 */
router.post('/',
    create)

/**
 * @api {get} /cart_items Retrieve cart items
 * @apiName RetrieveCartItems
 * @apiGroup CartItem
 * @apiUse listParams
 * @apiSuccess {Object[]} cartItems List of cart items.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/user/:id',
    master(),
    query(),
    index)

/**
 * @api {get} /cart_items Retrieve cart items
 * @apiName RetrieveCartItems
 * @apiGroup CartItem
 * @apiUse listParams
 * @apiSuccess {Object[]} cartItems List of cart items.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    query(),
    index)

/**
 * @api {get} /cart_items/:id Retrieve cart item
 * @apiName RetrieveCartItem
 * @apiGroup CartItem
 * @apiSuccess {Object} cartItem Cart item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cart item not found.
 */
router.get('/:id',
    show)

/**
 * @api {put} /cart_items/:id Update cart item
 * @apiName UpdateCartItem
 * @apiGroup CartItem
 * @apiSuccess {Object} cartItem Cart item's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cart item not found.
 */
router.put('/:id',
    update)

/**
 * @api {delete} /cart_items/:id Delete cart item
 * @apiName DeleteCartItem
 * @apiGroup CartItem
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Cart item not found.
 */
router.delete('/:id',
    destroy)

export default router