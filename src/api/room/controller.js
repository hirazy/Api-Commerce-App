import { success, notFound } from '../../services/response/'
import Room, { schema } from './model'
import Message, { messageSchema } from '../message/model'
import Shop, { shopSchema } from '../shop/model'

export const create = ({ body }, res, next) => {
    Room.create(body)
        .then((room) => room.view(true))
        .then(success(res, 201))
        .catch(next)
}


export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    Room.find(query, select, cursor)
    .then((rooms) => rooms.map((room) => room.view()))
    .then(success(res))
    .catch(next)

export const getShuffle = async({ user }, res, next) => {
    let shuffles = []
    await Room.find({ user: user.id })
        .then((rooms) => rooms.map((room) => room ? room.view() : null))
        .then(async(rooms) => {
            for (let room of rooms) {
                let shopView = await Shop.findById(room.shop)
                    .then((shop) => shop ? shop.view() : null)
                    .catch(next)
                let lastMessage = await Message.find({ room: room.id }).limit(1).sort({ $natural: -1 })
                    .then((message) => message ? message.view() : null)
                    .catch(next)

                shuffles.push({
                    ...room,
                    picture: shopView.picture,
                    name: shopView.name,
                    message: lastMessage,
                })
            }

            res.status(200).json(shuffles)
        })
}

export const getRoomByShop = ({ params, user }, res, next) => {
    Room.find({ user: user.id, shop: params.shop })
        .then(notFound(res))
        .then((rooms) => {
            if (rooms.length > 0) {
                const room = rooms[0]
                res.status(200).json(room)
            }
        })
}

export const show = ({ params, user }, res, next) => {
    Room.findById(params.id)
        .then(notFound(res))
        .then((room) => room ? room.view() : null)
        .then(success(res))
        .catch(next)

}

export const update = ({ body, params }, res, next) =>
    Room.findById(params.id)
    .then(notFound(res))
    .then((room) => room ? Object.assign(room, body).save() : null)
    .then((room) => room ? room.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
    Room.findById(params.id)
    .then(notFound(res))
    .then((room) => room ? room.remove() : null)
    .then(success(res, 204))
    .catch(next)