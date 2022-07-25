import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy, getShuffle } from './controller'
import { master, token } from '../../services/passport'
import Room, { schema } from './model'

const { user, shop, } = schema.tree

const router = new Router()

/**
 * @api {post} /rooms Create room
 * @apiName CreateRoom
 * @apiGroup Room
 * @apiSuccess {Object} room Room's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Room not found.
 */
router.post('/',
    // master(),
    token({ required: true }),
    create)

/**
 * @api {get} /rooms Retrieve rooms
 * @apiName RetrieveRooms
 * @apiGroup Room
 * @apiUse listParams
 * @apiSuccess {Object[]} rooms List of rooms.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    master(),
    query(),
    index)

/**
 * @api {get} /rooms Retrieve rooms
 * @apiName RetrieveRooms
 * @apiGroup Room
 * @apiUse listParams
 * @apiSuccess {Object[]} rooms List of rooms.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/shuffle',
    token({ required: true, roles: ['user'] }),
    getShuffle)

/**
 * @api {get} /rooms/:id Retrieve room
 * @apiName RetrieveRoom
 * @apiGroup Room
 * @apiSuccess {Object} room Room's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Room not found.
 */
router.get('/detail/:id',
    master(),
    token({ required: true }),
    show)

/**
 * @api {put} /rooms/:id Update room
 * @apiName UpdateRoom
 * @apiGroup Room
 * @apiSuccess {Object} room Room's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Room not found.
 */
router.put('/:id',
    master(),
    token({ required: true }),
    update)

/**
 * @api {delete} /rooms/:id Delete room
 * @apiName DeleteRoom
 * @apiGroup Room
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Room not found.
 */
router.delete('/:id',
    token({ required: true, roles: ['admin'] }),
    destroy)

export default router