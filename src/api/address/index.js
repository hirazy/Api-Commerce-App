import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { master, token } from '../../services/passport'
import Address, { schema } from './model'

const { name, company, phone, province, district, ward, address, isDefault } = schema.tree

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
    master(),
    token({ required: true }),
    body({ name, company, phone, province, district, ward, address, isDefault }),
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
    master(),
    token({ required: true, roles: ['admin'] }),
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
    master(),
    token({ required: true }),
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
    master(),
    token({ required: true }),
    update)

/**
 * @api {delete} /addresses/:id Delete address
 * @apiName DeleteAddress
 * @apiGroup Address
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Address not found.
 */
router.delete('/:id',
    master(),
    token({ required: true, roles: ['admin'] }),
    destroy)

export default router