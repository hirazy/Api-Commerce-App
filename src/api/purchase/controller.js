import { success, notFound } from '../../services/response/'
import { Purchase } from '.'

export const create = ({ body }, res, next) =>
  Purchase.create(body)
    .then((purchase) => purchase.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Purchase.find(query, select, cursor)
    .then((purchases) => purchases.map((purchase) => purchase.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Purchase.findById(params.id)
    .then(notFound(res))
    .then((purchase) => purchase ? purchase.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Purchase.findById(params.id)
    .then(notFound(res))
    .then((purchase) => purchase ? Object.assign(purchase, body).save() : null)
    .then((purchase) => purchase ? purchase.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Purchase.findById(params.id)
    .then(notFound(res))
    .then((purchase) => purchase ? purchase.remove() : null)
    .then(success(res, 204))
    .catch(next)
