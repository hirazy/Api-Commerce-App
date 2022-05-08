import { success, notFound } from '../../services/response/'
import { CreditCard } from '.'

export const create = ({ body }, res, next) =>
  CreditCard.create(body)
    .then((creditCard) => creditCard.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  CreditCard.find(query, select, cursor)
    .then((creditCards) => creditCards.map((creditCard) => creditCard.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  CreditCard.findById(params.id)
    .then(notFound(res))
    .then((creditCard) => creditCard ? creditCard.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  CreditCard.findById(params.id)
    .then(notFound(res))
    .then((creditCard) => creditCard ? Object.assign(creditCard, body).save() : null)
    .then((creditCard) => creditCard ? creditCard.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  CreditCard.findById(params.id)
    .then(notFound(res))
    .then((creditCard) => creditCard ? creditCard.remove() : null)
    .then(success(res, 204))
    .catch(next)
