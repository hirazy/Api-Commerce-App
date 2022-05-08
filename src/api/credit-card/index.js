import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'
import CreditCard, { schema } from './model'

const router = new Router()

/**
 * @api {post} /credit-cards Create credit card
 * @apiName CreateCreditCard
 * @apiGroup CreditCard
 * @apiSuccess {Object} creditCard Credit card's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Credit card not found.
 */
router.post('/',
    create)

/**
 * @api {get} /credit-cards Retrieve credit cards
 * @apiName RetrieveCreditCards
 * @apiGroup CreditCard
 * @apiUse listParams
 * @apiSuccess {Object[]} creditCards List of credit cards.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    query(),
    index)

/**
 * @api {get} /credit-cards/:id Retrieve credit card
 * @apiName RetrieveCreditCard
 * @apiGroup CreditCard
 * @apiSuccess {Object} creditCard Credit card's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Credit card not found.
 */
router.get('/:id',
    show)

/**
 * @api {put} /credit-cards/:id Update credit card
 * @apiName UpdateCreditCard
 * @apiGroup CreditCard
 * @apiSuccess {Object} creditCard Credit card's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Credit card not found.
 */
router.put('/:id',
    update)

/**
 * @api {delete} /credit-cards/:id Delete credit card
 * @apiName DeleteCreditCard
 * @apiGroup CreditCard
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Credit card not found.
 */
router.delete('/:id',
    destroy)

export default router