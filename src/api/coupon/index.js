import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'
import Coupon, { schema } from './model'

const router = new Router()

/**
 * @api {post} /coupons Create coupon
 * @apiName CreateCoupon
 * @apiGroup Coupon
 * @apiSuccess {Object} coupon Coupon's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Coupon not found.
 */
router.post('/',
    create)

/**
 * @api {get} /coupons Retrieve coupons
 * @apiName RetrieveCoupons
 * @apiGroup Coupon
 * @apiUse listParams
 * @apiSuccess {Object[]} coupons List of coupons.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    query(),
    index)

/**
 * @api {get} /coupons/:id Retrieve coupon
 * @apiName RetrieveCoupon
 * @apiGroup Coupon
 * @apiSuccess {Object} coupon Coupon's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Coupon not found.
 */
router.get('/:id',
    show)

/**
 * @api {put} /coupons/:id Update coupon
 * @apiName UpdateCoupon
 * @apiGroup Coupon
 * @apiSuccess {Object} coupon Coupon's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Coupon not found.
 */
router.put('/:id',
    update)

/**
 * @api {delete} /coupons/:id Delete coupon
 * @apiName DeleteCoupon
 * @apiGroup Coupon
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Coupon not found.
 */
router.delete('/:id',
    destroy)

export default router