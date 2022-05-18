import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'
import Address, { schema } from './model'

const router = new Router()

/**
 * @api {post} /addresses Create address
 * @apiName CreateAddress
 * @apiGroup Address
 * @apiSuccess {Object} address Address's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Address not found.
 */
router.post('/',
    create)

/**
 * @api {get} /addresses Retrieve addresses
 * @apiName RetrieveAddresses
 * @apiGroup Address
 * @apiUse listParams
 * @apiSuccess {Object[]} addresses List of addresses.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    query(),
    index)

/**
 * @api {get} /addresses/:id Retrieve address
 * @apiName RetrieveAddress
 * @apiGroup Address
 * @apiSuccess {Object} address Address's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Address not found.
 */
router.get('/:id',
    show)

/**
 * @api {put} /addresses/:id Update address
 * @apiName UpdateAddress
 * @apiGroup Address
 * @apiSuccess {Object} address Address's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Address not found.
 */
router.put('/:id',
    update)

/**
 * @api {delete} /addresses/:id Delete address
 * @apiName DeleteAddress
 * @apiGroup Address
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Address not found.
 */
router.delete('/:id',
    destroy)

export default router