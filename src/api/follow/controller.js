import { success, notFound } from '../../services/response/'
import Follow, { schema } from './model'

export const create = ({ body }, res, next) =>
    Follow.create(body)
    .then((follow) => follow.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    Follow.find(query, select, cursor)
    .then((follows) => follows.map((follow) => follow.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
    Follow.findById(params.id)
    .then(notFound(res))
    .then((follow) => follow ? follow.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
    Follow.findById(params.id)
    .then(notFound(res))
    .then((follow) => follow ? Object.assign(follow, body).save() : null)
    .then((follow) => follow ? follow.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
    Follow.findById(params.id)
    .then(notFound(res))
    .then((follow) => follow ? follow.remove() : null)
    .then(success(res, 204))
    .catch(next)