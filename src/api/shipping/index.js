import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'
import Shipping, { schema } from './model'

const router = new Router()

/**
 * @api {post} /shippings Create shipping
 * @apiName CreateShipping
 * @apiGroup Shipping
 * @apiSuccess {Object} shipping Shipping's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shipping not found.
 */
router.post('/',
    create)

/**
 * @api {get} /shippings Retrieve shippings
 * @apiName RetrieveShippings
 * @apiGroup Shipping
 * @apiUse listParams
 * @apiSuccess {Object[]} shippings List of shippings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    query(),
    index)

/**
 * @api {get} /shippings/:id Retrieve shipping
 * @apiName RetrieveShipping
 * @apiGroup Shipping
 * @apiSuccess {Object} shipping Shipping's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shipping not found.
 */
router.get('/:id',
    show)

/**
 * @api {put} /shippings/:id Update shipping
 * @apiName UpdateShipping
 * @apiGroup Shipping
 * @apiSuccess {Object} shipping Shipping's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shipping not found.
 */
router.put('/:id',
    update)

/**
 * @api {delete} /shippings/:id Delete shipping
 * @apiName DeleteShipping
 * @apiGroup Shipping
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Shipping not found.
 */
router.delete('/:id',
    destroy)

export default router