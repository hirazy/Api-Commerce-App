import { success, notFound } from '../../services/response/'
import { Favorite } from '.'

export const create = ({ body }, res, next) =>
  Favorite.create(body)
    .then((favorite) => favorite.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Favorite.find(query, select, cursor)
    .then((favorites) => favorites.map((favorite) => favorite.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Favorite.findById(params.id)
    .then(notFound(res))
    .then((favorite) => favorite ? favorite.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Favorite.findById(params.id)
    .then(notFound(res))
    .then((favorite) => favorite ? Object.assign(favorite, body).save() : null)
    .then((favorite) => favorite ? favorite.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Favorite.findById(params.id)
    .then(notFound(res))
    .then((favorite) => favorite ? favorite.remove() : null)
    .then(success(res, 204))
    .catch(next)
