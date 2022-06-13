import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'
import { master, token } from '../../services/passport'
import { middleware as body } from 'bodymen'
import Resource, { schema } from './model'

const { key, resourceType } = schema.tree

const router = new Router()

/**
 * @api {post} /resources Create resource
 * @apiName CreateResource
 * @apiGroup Resource
 * @apiSuccess {Object} resource Resource's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Resource not found.
 */
router.post('/',
    master(),
    token({ required: true, roles: ["user", "admin"] }),
    body({ key, resourceType }),
    create)

/**
 * @api {get} /resources Retrieve resources
 * @apiName RetrieveResources
 * @apiGroup Resource
 * @apiUse listParams
 * @apiSuccess {Object[]} resources List of resources.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    master(),
    token({ required: true, roles: ['admin'] }),
    query(),
    index)

/**
 * @api {get} /resources/:id Retrieve resource
 * @apiName RetrieveResource
 * @apiGroup Resource
 * @apiSuccess {Object} resource Resource's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Resource not found.
 */
router.get('/:id',
    master(),
    token({ required: true }),
    show)

/**
 * @api {put} /resources/:id Update resource
 * @apiName UpdateResource
 * @apiGroup Resource
 * @apiSuccess {Object} resource Resource's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Resource not found.
 */
router.put('/:id',
    master(),
    update)

/**
 * @api {delete} /resources/:id Delete resource
 * @apiName DeleteResource
 * @apiGroup Resource
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Resource not found.
 */
router.delete('/:id',
    master(),
    token({ required: true, roles: ['admin'] }),
    destroy)

export default router