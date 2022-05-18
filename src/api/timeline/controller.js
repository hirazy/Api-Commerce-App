import { success, notFound } from '../../services/response/'
import Timeline, { schema } from './model'

export const create = ({ body }, res, next) =>
    Timeline.create(body)
    .then((timeline) => timeline.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    Timeline.find(query, select, cursor)
    .then((timelines) => timelines.map((timeline) => timeline.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
    Timeline.findById(params.id)
    .then(notFound(res))
    .then((timeline) => timeline ? timeline.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
    Timeline.findById(params.id)
    .then(notFound(res))
    .then((timeline) => timeline ? Object.assign(timeline, body).save() : null)
    .then((timeline) => timeline ? timeline.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
    Timeline.findById(params.id)
    .then(notFound(res))
    .then((timeline) => timeline ? timeline.remove() : null)
    .then(success(res, 204))
    .catch(next)