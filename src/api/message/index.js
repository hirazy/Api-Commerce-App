import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy, createResourceMessage, getMessageByShop, getLoadMore, createShopMessage } from './controller'
import { middleware as body } from 'bodymen'
import { password as passwordAuth, master, token } from '../../services/passport'
import Message, { schema } from './model'
const multer = require('multer')
const fs = require("fs");
const util = require('util')
const upload = multer({ dest: 'uploads/' })

const { sender, shop, resource, content, room, isResource } = schema.tree

const router = new Router()

/**
 * @api {post} /messages Create message
 * @apiName CreateMessage
 * @apiGroup Message
 * @apiSuccess {Object} message Message's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 */
router.post('/',
    token({ required: true, roles: ['user'] }),
    body({ shop, content }),
    create)

/**
 * @api {post} /image Upload image
 * @apiName Upload Image
 * @apiGroup Image
 * @apiPermission master
 * @apiHeader {String} Upload image to folder /uploads 
 * @apiParam {String} access_token Master access_token.
 * @apiSuccess (Success 201) {String} name of saved file to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Master access only or invalid credentials.
 */
router.post('/resource/:shop',
    token({ required: true, roles: ['user'] }),
    upload.array('image', 4),
    createResourceMessage
)

/**
 * @api {post} /image Upload image
 * @apiName Upload Image
 * @apiGroup Image
 * @apiPermission master
 * @apiHeader {String} Upload image to folder /uploads 
 * @apiParam {String} access_token Master access_token.
 * @apiSuccess (Success 201) {String} name of saved file to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Master access only or invalid credentials.
 */
router.post('/shop/:room',
    // token({ required: true, roles: ['user'] }),
    // upload.array('image', 4),
    master(),
    body({ content }),
    createShopMessage
)

/**
 * @api {post} /messages Create message
 * @apiName CreateMessage
 * @apiGroup Message
 * @apiSuccess {Object} message Message's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 */
router.get('/more/:room/:length',
    token({ required: true, roles: ['user'] }),
    getLoadMore)


/**
 * @api {post} /messages Create message
 * @apiName CreateMessage
 * @apiGroup Message
 * @apiSuccess {Object} message Message's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 */
router.get('/shop/:shop',
    token({ required: true, roles: ['user'] }),
    getMessageByShop)

/**
 * @api {get} /messages Retrieve messages
 * @apiName RetrieveMessages
 * @apiGroup Message
 * @apiUse listParams
 * @apiSuccess {Object[]} messages List of messages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    master(),
    token({ required: true, roles: ["admin"] }),
    query(),
    index)

/**
 * @api {get} /messages/:id Retrieve message
 * @apiName RetrieveMessage
 * @apiGroup Message
 * @apiSuccess {Object} message Message's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 */
router.get('/:id',
    show)

/**
 * @api {put} /messages/:id Update message
 * @apiName UpdateMessage
 * @apiGroup Message
 * @apiSuccess {Object} message Message's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 */
router.put('/:id',
    update)

/**
 * @api {delete} /messages/:id Delete message
 * @apiName DeleteMessage
 * @apiGroup Message
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Message not found.
 */
router.delete('/:id',
    destroy)

export default router