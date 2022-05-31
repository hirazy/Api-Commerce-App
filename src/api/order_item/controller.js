import { success, notFound } from '../../services/response/'
import { OrderItem } from '.'

export const create = ({ body }, res, next) =>
  OrderItem.create(body)
    .then((orderItem) => orderItem.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  OrderItem.find(query, select, cursor)
    .then((orderItems) => orderItems.map((orderItem) => orderItem.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  OrderItem.findById(params.id)
    .then(notFound(res))
    .then((orderItem) => orderItem ? orderItem.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  OrderItem.findById(params.id)
    .then(notFound(res))
    .then((orderItem) => orderItem ? Object.assign(orderItem, body).save() : null)
    .then((orderItem) => orderItem ? orderItem.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  OrderItem.findById(params.id)
    .then(notFound(res))
    .then((orderItem) => orderItem ? orderItem.remove() : null)
    .then(success(res, 204))
    .catch(next)
