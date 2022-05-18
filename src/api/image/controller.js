import { success, notFound } from '../../services/response/'
import Image, { schema } from './model'

export const create = ({ body }, res, next) =>
    Image.create(body)
    .then((image) => image.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    Image.find(query, select, cursor)
    .then((images) => images.map((image) => image.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
    Image.findById(params.id)
    .then(notFound(res))
    .then((image) => image ? image.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
    Image.findById(params.id)
    .then(notFound(res))
    .then((image) => image ? Object.assign(image, body).save() : null)
    .then((image) => image ? image.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
    Image.findById(params.id)
    .then(notFound(res))
    .then((image) => image ? image.remove() : null)
    .then(success(res, 204))
    .catch(next)