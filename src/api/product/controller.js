import { success, notFound } from '../../services/response/'
import Category, { categorySchema } from '../category/model'
import Product, { productSchema } from './model'
import JSZip from 'jszip'

const zip = JSZip()

export const create = ({ body }, res, next) =>
    Product.create(body)
    .then((product) => product.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    Product.find(query, select, cursor)
    .then((products) => products.map((product) => product.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
    Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? product.view() : null)
    .then(success(res))
    .catch(next)

export const getHomeProduct = ({ params }, res, next) =>
    Product.find()
    .then(notFound(res))
    .then((products) => products.map())


export const getRandomProduct = ({ params }, res, next) =>
    Product.aggregate([{ $sample: { size: 10 } }])
    .then((products) => products.map((product) => product.view()))
    .catch(next)
    // Product.count()


export const searchByName = ({ params }, res, next) =>
    Product.populate(
        'name', params.name
    )
    .then(notFound(res))
    .then((products) => products.map((product) => product.view()))
    .catch(next)

export const searchByKeyWord = ({ params }, res, next) =>
    Product.populate(
        'name', params.name
    )
    .then(notFound(res))
    .then((products) => products.map((product) => product.view()))
    .catch(next)

export const searchByCategory = ({ params }, res, next) =>
    Product.populate(
        'category'
    )

export const getAuthenticationProducts = () => {
    // zip.x
    const zipData = zip.file('data_home')

    Product.populate("")
        .find()
}

export const getByCategory = ({}, res, next) => {
    // Product
    //     .populate("category")
    Product.populate("catrgory")
        .find()
}

export const update = ({ body, params }, res, next) =>
    Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? Object.assign(product, body).save() : null)
    .then((product) => product ? product.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
    Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? product.remove() : null)
    .then(success(res, 204))
    .catch(next)