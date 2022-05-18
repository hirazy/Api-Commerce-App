import { Router } from 'express'
import user from './user'
import auth from './auth'
import passwordReset from './password-reset'
import product from './product'
import category from './category'
import order from './order'
import rateLimit from 'express-rate-limit'
import cart from './cart'
import tag from './tag'
import shop from './shop'
import coupon from './coupon'
import review from './review'
import creditCard from './credit-card'
import shipping from './shipping'
import image from './image'
import address from './address'
import version from './version'
import follow from './follow'
import message from './message'
import timeline from './timeline'
import resource from './resource'

const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 30,
    message: 'Too many connection',
});

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */

router.use('/', apiLimiter)
router.use('/users', user)
router.use('/auth', auth)
router.use('/password-resets', passwordReset)
router.use('/products', product)
router.use('/categories', category)
router.use('/orders', order)
router.use('/carts', cart)
router.use('/tags', tag)
router.use('/shops', shop)
router.use('/coupons', coupon)
router.use('/reviews', review)
router.use('/credit-cards', creditCard)
router.use('/shippings', shipping)
router.use('/images', image)
router.use('/addresses', address)
router.use('/versions', version)
router.use('/follows', follow)
router.use('/messages', message)
router.use('/timelines', timeline)
router.use('/resources', resource)

export default router