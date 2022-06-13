import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'
export Favorite, { schema } from './model'

const router = new Router()

/**
 * @api {post} /favorites Create favorite
 * @apiName CreateFavorite
 * @apiGroup Favorite
 * @apiSuccess {Object} favorite Favorite's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Favorite not found.
 */
router.post('/',
  create)

/**
 * @api {get} /favorites Retrieve favorites
 * @apiName RetrieveFavorites
 * @apiGroup Favorite
 * @apiUse listParams
 * @apiSuccess {Object[]} favorites List of favorites.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /favorites/:id Retrieve favorite
 * @apiName RetrieveFavorite
 * @apiGroup Favorite
 * @apiSuccess {Object} favorite Favorite's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Favorite not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /favorites/:id Update favorite
 * @apiName UpdateFavorite
 * @apiGroup Favorite
 * @apiSuccess {Object} favorite Favorite's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Favorite not found.
 */
router.put('/:id',
  update)

/**
 * @api {delete} /favorites/:id Delete favorite
 * @apiName DeleteFavorite
 * @apiGroup Favorite
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Favorite not found.
 */
router.delete('/:id',
  destroy)

export default router
