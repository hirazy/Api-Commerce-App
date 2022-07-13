import { success, notFound } from '../../services/response/'
import Review, { schema } from './model'

export const create = async({ body }, res, next) => {
    Review.create(body)
        .then(review => {
            // sign(user.id)
            //     .then((token) => ({ token, user: user.view(true) }))
            //     .then(
            //         // success(res, 201)
            //         (entity) => {
            //             res.status(201).json({
            //                 code: 201,
            //                 status: 'Registered Successfully',
            //                 data: entity
            //             })
            //         }
            //     )
            res.status(200).json(review)
        })
        .catch((err) => {
            /* istanbul ignore else */
            // if (err.name === 'MongoError' && err.code === 11000) {
            //     res.status(409).json({
            //         valid: false,
            //         // param: 'email',
            //         message: err.message
            //     })
            // } else {
            //     next(err)
            // }
        })

    // try {
    //     const review = new Review({
    //         user: body.userId,
    //         product: body.productId,
    //         review: body.review,
    //         rating: body.rating
    //     })

    //     const result = await review.save()

    //     if (result) {
    //         res.status(200).json({
    //             data: review.view()
    //         })
    //     } else {
    //         res.status(400).json({
    //             status: "Warning",
    //             message: "Failure to create Review"
    //         })
    //     }
    // } catch (e) {
    //     res.status(500).json({
    //         status: "error",
    //         message: e.message
    //     })
    // }
}

// Review.create(body)
//     .then((review) => review.view(true))
//     .then(success(res, 201))
//     .catch(next)

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