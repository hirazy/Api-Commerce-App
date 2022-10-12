import { success, notFound } from '../../services/response/'
import { middleware as body } from 'bodymen'
import Message, { schema } from './model'
import Room, { roomSchema } from '../room/model'
import Resource, { resourceSchema } from '../resource/model'
import { uploadFile, getFileStream } from '../../services/s3'
const fs = require("fs");
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)


/**
 * Import Socket
 * @param {*} param0 
 * @param {*} res 
 * @param {*} next 
 */

export const create = ({ bodymen: { body }, user }, res, next) => {
    console.log('Create Text Message')
    Room.find({ shop: body.shop, user: user.id })
        .then((rooms) => {
            if (rooms.length > 0) {
                const room = rooms[0]
                const messageBody = {
                    sender: user.id,
                    room: room.id,
                    content: body.content
                }
                Message.create(messageBody)
                    .then((message) => {
                        /**
                         * Create Successfull => Emit message
                         */
                        res.status(200).json(message.view())
                    })
                    .catch(next)
            } else {
                console.log(body.shop)
                const roomBody = {
                    user: user.id,
                    shop: body.shop
                }
                Room.create(roomBody)
                    .then((room) => {
                        const messageBody = {
                            sender: user.id,
                            room: room.id,
                            content: body.content
                        }
                        Message.create(messageBody)
                            .then((message) => {
                                res.status(200).json(message.view())

                                /**
                                 * Create Successfull => Emit message
                                 */
                            })
                    })
                    .catch(next)
            }
        })
        .catch(next)
}

export const createResourceMessage = async({ user, params, files }, res, next) => {
    console.log('Create Resource Message')
        // const files = req.files
    console.log('Length ' + files.length)
    let resources = []
    for (const file of files) {
        const result = await uploadFile(file)
        await unlinkFile(file.path)
            // const description = req.body.description
        const bodyResource = {
            key: result.key,
        }

        let resource = await Resource.create(bodyResource)
            .then((resource) => resource.view(true))
            .catch(next)

        resources.push(resource.id)
    }

    Room.find({ shop: params.shop, user: user.id })
        .then((rooms) => {
            if (rooms.length > 0) {
                const room = rooms[0]
                const messageBody = {
                    resources: resources,
                    isResource: true,
                    sender: user.id,
                    room: room.id
                }
                Message.create(messageBody)
                    .then((message) => {
                        res.status(200).json(message.view())
                    })
                    .catch(next)
            } else {
                console.log(params.shop)
                const roomBody = {
                    user: user.id,
                    shop: params.shop
                }
                Room.create(roomBody)
                    .then((room) => {
                        const messageBody = {
                            resources: resources,
                            isResource: true,
                            sender: user.id,
                            room: room.id
                        }
                        Message.create(messageBody)
                            .then((message) => {
                                res.status(200).json(message.view())
                            })
                    })
                    .catch(next)
            }
        })
        .catch(next)
}

export const createShopMessage = ({ bodymen: { body }, params }, res, next) => {
    Room.findById(params.room)
        .then(notFound(res))
        .then((room) => {
            const messageBody = {
                isResource: false,
                sender: room.shop,
                room: room.id,
                content: body.content
            }
            Message.create(messageBody)
                .then((message) => {
                    res.status(200).json(message.view())
                })
        })
        .catch(next)
}


export const getMessageByShop = ({ user, params }, res, next) => {
    Room.find({ user: user.id, shop: params.shop })
        .then((rooms) => {
            if (rooms.length > 0) {
                const room = rooms[0]

                Message.find({ room: room.id })
                    .then((messages) => messages.map((message) => message.view()))
                    .then((messages) => {
                        res.status(200).json(messages)
                    })
            }
        })
}

export const getLoadMore = ({ user, params }, res, next) => {
    console.log(params.length)
    Message.find({ room: params.room })
        .limit(parseInt(params.length) + 20)
        .sort({ $natural: -1 })
        .then((messages) => messages.map((message) => message.view()))
        .then((messages) => {
            res.status(200).json(messages)
        })
        // Message.find({ room: params.room })
        //     .then((messages) => messages.map((message) => message.view()))
        //     .then((messages) => {
        //         res.status(200).json(messages)
        //     })
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    Message.find(query, select, cursor)
    .then((messages) => messages.map((message) => message.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
    Message.findById(params.id)
    .then(notFound(res))
    .then((message) => message ? message.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
    Message.findById(params.id)
    .then(notFound(res))
    .then((message) => message ? Object.assign(message, body).save() : null)
    .then((message) => message ? message.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
    Message.findById(params.id)
    .then(notFound(res))
    .then((message) => message ? message.remove() : null)
    .then(success(res, 204))
    .catch(next)