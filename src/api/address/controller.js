import { success, notFound } from '../../services/response/'
import Address, { schema } from './model'
import User, { userSchema } from '../user/model'
import mongoose, { Schema } from 'mongoose'

export const create = async({ user, body }, res, next) => {
    // console.log('default ' + body.isDefault)
    let newAddress = {
        user: mongoose.Types.ObjectId(user.id),
        name: body.name,
        phone: body.phone,
        city: body.city,
        street: body.street,
        isHome: body.isHome
    }

    let address = Address.create(newAddress)
        .then((address) => address.view(true))
        .then((address) => {
            if (user.address == null) {
                Object.assign(user, { address: address.id }).save()
            }
            res.status(200).json(address)
        })
        .catch(next)
}

export const getAllUser = ({ user }, res, next) => {

    Address.find({ user: user.id })
        .then((addresses) => addresses.map((address) => address.view()))
        .then(success(res))
        .catch(next)
}

export const getDefault = ({ user }, res, next) => {
    if (user.address != null) {
        Address.findById(user.address)
            .then((address) => {
                res.status(200).json(address.view())
            })
    } else {
        res.status(205).json()
    }
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    Address.find(query, select, cursor)
    .then((addresses) => addresses.map((address) => address.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
    Address.findById(params.id)
    .then(notFound(res))
    .then((address) => address ? address.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
    Address.findById(params.id)
    .then(notFound(res))
    .then((address) => address ? Object.assign(address, body).save() : null)
    .then((address) => address ? address.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
    Address.findById(params.id)
    .then(notFound(res))
    .then((address) => address ? address.remove() : null)
    .then(success(res, 204))
    .catch(next)