import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'
import { master, token } from '../../services/passport'
import Cart, { schema } from './model'

// const { product, user, } = schema.tree

const router = new Router()

/**
 * @api {post} /carts Create cart
 * @apiName CreateCart
 * @apiGroup Cart
 * @apiSuccess {Object} cart Cart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cart not found.
 */
router.post('/',
    master(),
    token({ required: true }),
    create)

/**
 * @api {get} /carts Retrieve carts
 * @apiName RetrieveCarts
 * @apiGroup Cart
 * @apiUse listParams
 * @apiSuccess {Object[]} carts List of carts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    query(),
    master(),
    token({ required: true, roles: ['admin'] }),
    index)

/**
 * @api {get} /carts/:id Retrieve cart
 * @apiName RetrieveCart
 * @apiGroup Cart
 * @apiSuccess {Object} cart Cart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cart not found.
 */
router.get('/:id',
    master(),
    token({ required: true }),
    show)

/**
 * @api {put} /carts/:id Update cart
 * @apiName UpdateCart
 * @apiGroup Cart
 * @apiSuccess {Object} cart Cart's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cart not found.
 */
router.put('/:id',
    master(),
    token({ required: true }),
    update)

/**
 * @api {delete} /carts/:id Delete cart
 * @apiName DeleteCart
 * @apiGroup Cart
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Cart not found.
 */
router.delete('/:id',
    master(),
    token({ required: true, roles: ['admin'] }),
    destroy)

export default router