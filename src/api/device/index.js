import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'
import Device, { schema } from './model'

const router = new Router()

/**
 * @api {post} /devices Create device
 * @apiName CreateDevice
 * @apiGroup Device
 * @apiSuccess {Object} device Device's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Device not found.
 */
router.post('/',
    create)

/**
 * @api {get} /devices Retrieve devices
 * @apiName RetrieveDevices
 * @apiGroup Device
 * @apiUse listParams
 * @apiSuccess {Object[]} devices List of devices.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    query(),
    index)

/**
 * @api {get} /devices/:id Retrieve device
 * @apiName RetrieveDevice
 * @apiGroup Device
 * @apiSuccess {Object} device Device's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Device not found.
 */
router.get('/:id',
    show)

/**
 * @api {put} /devices/:id Update device
 * @apiName UpdateDevice
 * @apiGroup Device
 * @apiSuccess {Object} device Device's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Device not found.
 */
router.put('/:id',
    update)

/**
 * @api {delete} /devices/:id Delete device
 * @apiName DeleteDevice
 * @apiGroup Device
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Device not found.
 */
router.delete('/:id',
    destroy)

export default router