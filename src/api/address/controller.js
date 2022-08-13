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

export const getAddress = ({ params, user }, res, next) => {
    if (params.id === 'user') {
        Address.find({ user: user.id })
            .then((addresses) => addresses.map((address) => address.view()))
            .then(success(res))
            .catch(next)
    } else if (params.id === 'default') {
        Address.findById(user.address)
            .then((address) => {
                res.status(200).json(address.view())
            })
            .catch(next)
    } else {
        Address.findById(params.id)
            .then(notFound(res))
            .then((address) => {
                if (address.user != user.id) {
                    res.status(401).json({
                        'status': 'Not Authorized'
                    })
                } else {
                    return address.view()
                }
            })
            .then(success(res))
            .catch(next)
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

export const update = ({ body, params, user }, res, next) => {
    Address.findById(params.id)
        .then(notFound(res))
        .then((address) => {
            if (address.user != user.id) {
                res.status(401).json({
                    'status': 'UnAuthorized'
                })
            } else if (body.isDefault == true) {
                if (user.address != address.id) {
                    user.address = address.id
                    user.save()
                }
            } else if (body.isDefault == false) {
                if (user.address == address.id) {
                    res.status(409).json({
                        'status': 'Cannot change default address! Please select other addresses to use as default address!'
                    })
                    return null
                }
            }
            console.log('Name ' + body.name)
            const bodyAddress = {
                "name": body.name,
                "phone": body.phone,
                "city": body.city,
                "street": body.street,
                "isHome": body.isHome
            }
            return address ? Object.assign(address, bodyAddress).save() : null
        })
        .then((address) => address ? address.view() : null)
        .then(success(res))
        .catch(next)
}

export const changeDefaultAddress = ({ params, user }, res, next) => {
    Address.findById(params.id)
        .then(notFound(res))
        .then((address) => {
            if (address.user != user.id) {
                res.status(401).json({
                    'status': 'UnAuthorized. You cannot change other\'s address'
                })
            } else {
                if (user.address != address.id) {
                    user.address = address.id
                    user.save()
                }
            }
            return address
        })
        .then((address) => address ? address.view() : null)
        .then(success(res))
        .catch(next)
}


export const destroy = ({ params, user }, res, next) => {
    Address.findById(params.id)
        .then(notFound(res))
        .then((address) => {
            if (address == null) {
                return null
            }
            if (address.user != user.id) {
                res.status(401).json({
                    'status': 'No Authorize'
                })

                // return null
            } else if (user.address == address.id) {
                res.status(409).json({
                    'status': 'You cannot remove default address!'
                })

                // return null
            } else {
                console.log('Remove')
                address.remove()
                res.status(204).json({
                    'status': 'Delete Successfully!'
                })
            }
        })
        .catch(next)
}