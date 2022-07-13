import { success, notFound } from '../../services/response/'
import CartItem, { schema } from './model'

export const create = ({ body }, res, next) =>
    CartItem.create(body)
    .then((cartItem) => cartItem.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    CartItem.find(query, select, cursor)
    .then((cartItems) => cartItems.map((cartItem) => cartItem.view()))
    .then(success(res))
    .catch(next)

export const findByUserId = ({ querymen: { query, select, cursor } }, res, next) =>
    CartItem.find(query, select, cursor)
    .then((cartItems) => cartItems.map((cartItem) => cartItem.view()))
    .then(success(res))
    .catch(next)


export const show = ({ params }, res, next) =>
    CartItem.findById(params.id)
    .then(notFound(res))
    .then((cartItem) => cartItem ? cartItem.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
    CartItem.findById(params.id)
    .then(notFound(res))
    .then((cartItem) => cartItem ? Object.assign(cartItem, body).save() : null)
    .then((cartItem) => cartItem ? cartItem.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
    CartItem.findById(params.id)
    .then(notFound(res))
    .then((cartItem) => cartItem ? cartItem.remove() : null)
    .then(success(res, 204))
    .catch(next)