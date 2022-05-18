import { success, notFound } from '../../services/response/'
import { Shipping } from '.'

export const create = ({ body }, res, next) =>
  Shipping.create(body)
    .then((shipping) => shipping.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Shipping.find(query, select, cursor)
    .then((shippings) => shippings.map((shipping) => shipping.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Shipping.findById(params.id)
    .then(notFound(res))
    .then((shipping) => shipping ? shipping.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Shipping.findById(params.id)
    .then(notFound(res))
    .then((shipping) => shipping ? Object.assign(shipping, body).save() : null)
    .then((shipping) => shipping ? shipping.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Shipping.findById(params.id)
    .then(notFound(res))
    .then((shipping) => shipping ? shipping.remove() : null)
    .then(success(res, 204))
    .catch(next)
