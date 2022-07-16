import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy, getFollowShop, getFollowMe } from './controller'
import { password as passwordAuth, master, token } from '../../services/passport'
import Follow, { schema } from './model'

const router = new Router()

/**
 * @api {post} /follows Create follow
 * @apiName CreateFollow
 * @apiGroup Follow
 * @apiSuccess {Object} follow Follow's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Follow not found.
 */
router.post('/shop/:id',
    // master(),
    token({ required: true, roles: ['user'] }),
    create)

/**
 * @api {get} /favorites/:id Retrieve favorite
 * @apiName RetrieveFavorite
 * @apiGroup Favorite
 * @apiSuccess {Object} favorite Favorite's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Favorite not found.
 */
router.get('/shop/:id',
    token({ required: true }),
    getFollowShop)

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
    getFollowMe)

/**
 * @api {get} /follows Retrieve follows
 * @apiName RetrieveFollows
 * @apiGroup Follow
 * @apiUse listParams
 * @apiSuccess {Object[]} follows List of follows.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    master(),
    query(),
    index)

/**
 * @api {get} /follows/:id Retrieve follow
 * @apiName RetrieveFollow
 * @apiGroup Follow
 * @apiSuccess {Object} follow Follow's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Follow not found.
 */
router.get('/:id',
    master(),
    show)

/**
 * @api {put} /follows/:id Update follow
 * @apiName UpdateFollow
 * @apiGroup Follow
 * @apiSuccess {Object} follow Follow's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Follow not found.
 */
router.put('/:id',
    master(),
    token({ required: true, roles: ['user', 'admin'] }),
    update)

/**
 * @api {delete} /follows/:id Delete follow
 * @apiName DeleteFollow
 * @apiGroup Follow
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Follow not found.
 */
router.delete('/:id',
    master(),
    token({ required: true, roles: ['admin'] }),
    destroy)

export default router