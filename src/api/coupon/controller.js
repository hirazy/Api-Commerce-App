import { success, notFound } from '../../services/response/'
import { Coupon } from '.'

export const create = ({ body }, res, next) =>
  Coupon.create(body)
    .then((coupon) => coupon.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Coupon.find(query, select, cursor)
    .then((coupons) => coupons.map((coupon) => coupon.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Coupon.findById(params.id)
    .then(notFound(res))
    .then((coupon) => coupon ? coupon.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Coupon.findById(params.id)
    .then(notFound(res))
    .then((coupon) => coupon ? Object.assign(coupon, body).save() : null)
    .then((coupon) => coupon ? coupon.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Coupon.findById(params.id)
    .then(notFound(res))
    .then((coupon) => coupon ? coupon.remove() : null)
    .then(success(res, 204))
    .catch(next)
