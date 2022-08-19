import { Router } from 'express'
import { master, token } from '../../services/passport'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'
import Purchase, { schema } from './model'

const router = new Router()

/**
 * @api {post} /purchases Create purchase
 * @apiName CreatePurchase
 * @apiGroup Purchase
 * @apiSuccess {Object} purchase Purchase's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Purchase not found.
 */
router.post('/',
    token({ required: true }),
    create)

/**
 * @api {get} /purchases Retrieve purchases
 * @apiName RetrievePurchases
 * @apiGroup Purchase
 * @apiUse listParams
 * @apiSuccess {Object[]} purchases List of purchases.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    query(),
    index)

/**
 * @api {get} /purchases/:id Retrieve purchase
 * @apiName RetrievePurchase
 * @apiGroup Purchase
 * @apiSuccess {Object} purchase Purchase's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Purchase not found.
 */
router.get('/:id',
    token({ required: true }),
    show)

/**
 * @api {put} /purchases/:id Update purchase
 * @apiName UpdatePurchase
 * @apiGroup Purchase
 * @apiSuccess {Object} purchase Purchase's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Purchase not found.
 */
router.put('/:id',
    token({ required: true }),
    update)

/**
 * @api {delete} /purchases/:id Delete purchase
 * @apiName DeletePurchase
 * @apiGroup Purchase
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Purchase not found.
 */
router.delete('/:id',
    destroy)

export default router