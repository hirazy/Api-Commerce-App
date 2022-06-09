import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'
import { middleware as body } from 'bodymen'
import { password as passwordAuth, master, token } from '../../services/passport'
import Message, { schema } from './model'

const { user, shop, resource, content, isResource } = schema.tree

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
    master(),
    token({ required: true, roles: ['user'] }),
    body({ user, isResource, content }),
    create)

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