import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy, getFavoriteProduct, getFavoriteMe, getFavoriteMeDetail } from './controller'
import Favorite, { schema } from './model'

const { user, product } = schema.tree

const router = new Router()

/**
 * @api {post} /favorites Create favorite
 * @apiName CreateFavorite
 * @apiGroup Favorite
 * @apiSuccess {Object} favorite Favorite's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Favorite not found.
 */
router.post('/product/:id',
    // master(),
    token({ required: true, roles: ["user"] }),
    // body({ product }),
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
router.get('/product/:id',
    token({ required: true }),
    getFavoriteProduct)

// /**
//  * @api {get} /favorites/:id Retrieve favorite
//  * @apiName RetrieveFavorite
//  * @apiGroup Favorite
//  * @apiSuccess {Object} favorite Favorite's data.
//  * @apiError {Object} 400 Some parameters may contain invalid values.
//  * @apiError 404 Favorite not found.
//  */
// router.get('/:id',
//     show)

// /**
//  * @api {get} /favorites/:id Retrieve favorite
//  * @apiName RetrieveFavorite
//  * @apiGroup Favorite
//  * @apiSuccess {Object} favorite Favorite's data.
//  * @apiError {Object} 400 Some parameters may contain invalid values.
//  * @apiError 404 Favorite not found.
//  */
// router.get('/product/:user/:product',
//     master(),
//     token({ required: true, }),
//     show)

/**
 * @api {get} /favorites Retrieve favorites
 * @apiName RetrieveFavorites
 * @apiGroup Favorite
 * @apiUse listParams
 * @apiSuccess {Object[]} favorites List of favorites.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/me',
    // master(),
    token({ required: true, roles: ['user'] }),
    // query(),
    getFavoriteMe)

/**
 * @api {get} /favorites Retrieve favorites Detail
 * @apiName RetrieveFavorites
 * @apiGroup Favorite
 * @apiUse listParams
 * @apiSuccess {Object[]} favorites List of favorites.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/me/detail',
    // master(),
    token({ required: true, roles: ['user'] }),
    // query(),
    getFavoriteMeDetail)

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