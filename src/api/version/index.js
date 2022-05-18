import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'
import Version, { schema } from './model'

const router = new Router()

/**
 * @api {post} /versions Create version
 * @apiName CreateVersion
 * @apiGroup Version
 * @apiSuccess {Object} version Version's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Version not found.
 */
router.post('/',
    create)

/**
 * @api {get} /versions Retrieve versions
 * @apiName RetrieveVersions
 * @apiGroup Version
 * @apiUse listParams
 * @apiSuccess {Object[]} versions List of versions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    query(),
    index)

/**
 * @api {get} /versions/:id Retrieve version
 * @apiName RetrieveVersion
 * @apiGroup Version
 * @apiSuccess {Object} version Version's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Version not found.
 */
router.get('/:id',
    show)

/**
 * @api {put} /versions/:id Update version
 * @apiName UpdateVersion
 * @apiGroup Version
 * @apiSuccess {Object} version Version's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Version not found.
 */
router.put('/:id',
    update)

/**
 * @api {delete} /versions/:id Delete version
 * @apiName DeleteVersion
 * @apiGroup Version
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Version not found.
 */
router.delete('/:id',
    destroy)

export default router