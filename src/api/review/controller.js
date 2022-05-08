import { success, notFound } from '../../services/response/'
import { Review } from '.'

export const create = ({ body }, res, next) =>
  Review.create(body)
    .then((review) => review.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Review.find(query, select, cursor)
    .then((reviews) => reviews.map((review) => review.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Review.findById(params.id)
    .then(notFound(res))
    .then((review) => review ? review.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Review.findById(params.id)
    .then(notFound(res))
    .then((review) => review ? Object.assign(review, body).save() : null)
    .then((review) => review ? review.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Review.findById(params.id)
    .then(notFound(res))
    .then((review) => review ? review.remove() : null)
    .then(success(res, 204))
    .catch(next)
