import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'
import Timeline, { schema } from './model'

const router = new Router()

/**
 * @api {post} /timelines Create timeline
 * @apiName CreateTimeline
 * @apiGroup Timeline
 * @apiSuccess {Object} timeline Timeline's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Timeline not found.
 */
router.post('/',
    create)

/**
 * @api {get} /timelines Retrieve timelines
 * @apiName RetrieveTimelines
 * @apiGroup Timeline
 * @apiUse listParams
 * @apiSuccess {Object[]} timelines List of timelines.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    query(),
    index)

/**
 * @api {get} /timelines/:id Retrieve timeline
 * @apiName RetrieveTimeline
 * @apiGroup Timeline
 * @apiSuccess {Object} timeline Timeline's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Timeline not found.
 */
router.get('/:id',
    show)

/**
 * @api {put} /timelines/:id Update timeline
 * @apiName UpdateTimeline
 * @apiGroup Timeline
 * @apiSuccess {Object} timeline Timeline's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Timeline not found.
 */
router.put('/:id',
    update)

/**
 * @api {delete} /timelines/:id Delete timeline
 * @apiName DeleteTimeline
 * @apiGroup Timeline
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Timeline not found.
 */
router.delete('/:id',
    destroy)

export default router