import { success, notFound } from '../../services/response/'
import Follow, { schema } from './model'

export const create = ({ params, user }, res, next) => {

    // Follow.create(body)
    //     .then((follow) => follow.view(true))
    //     .then(success(res, 201))
    //     .catch(next)

    let isExistFollow = Follow.find({ user: user.id, shop: params.id })
        .then((follows) => {
            if (follows.length > 0) {
                let saved = Object.assign(follows[0], follows[0].changeFollow()).save()
                return res.status(200).json({ follow: follows[0].isFollow() })
            } else {
                Follow.create({ user: user.id, shop: params.id })
                    .then((follow) => {
                        res.status(200).json({ follow: follow.isFollow() })
                    })
                    .catch(next)
            }
        })
        .catch(next)
}

export const getFollowShop = ({ user, params }, res, next) => {
    Follow.find({ user: user.id, shop: params.id })
        .then((follows) => {
            if (follows.length > 0) {
                return res.status(200).json({ follow: follows[0].isFollow() })
            } else {
                return res.status(200).json({ follow: false })
            }
        })
        .catch(next)
}

export const getFollowMe = ({ user }, res, next) => {
    Follow.find({ user: user.id })
        .then((follows) => {

            let count = 0
            for (let follow of follows) {
                if (follow.isFollow()) {
                    count++;
                }
            }
            res.status(200).json({ count: count })
        })
}

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