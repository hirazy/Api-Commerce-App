import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import Shop, { schema } from './model'

const { email, password, name, picture } = schema.tree

const router = new Router()

/**
 * @api {post} /shops Create shop
 * @apiName CreateShop
 * @apiGroup Shop
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 */
router.post('/',
    master(),
    create)

/**
 * @api {get} /shops Retrieve shops
 * @apiName RetrieveShops
 * @apiGroup Shop
 * @apiUse listParams
 * @apiSuccess {Object[]} shops List of shops.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    master(),
    query(),
    index)

/**
 * @api {get} /shops/:id Retrieve shop
 * @apiName RetrieveShop
 * @apiGroup Shop
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 */
router.get('/:id',
    master(),
    show)

/**
 * @api {put} /shops/:id Update shop
 * @apiName UpdateShop
 * @apiGroup Shop
 * @apiSuccess {Object} shop Shop's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Shop not found.
 */
router.put('/:id',
    update)

/**
 * @api {delete} /shops/:id Delete shop
 * @apiName DeleteShop
 * @apiGroup Shop
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Shop not found.
 */
router.delete('/:id',
    destroy)

export default router