import { success, notFound } from '../../services/response/'
import Favorite, { schema } from './model'
import Product, { productSchema } from '../product/model'
import Shop, { shopSchema } from '../shop/model'

export const create = ({ params, user }, res, next) => {
    console.log(`${params.id} ${user.id}`)
    let existFavorite = Favorite.find({ user: user.id, product: params.id })
        .then((favorites) => {
            if (favorites.length > 0) {
                console.log(JSON.stringify(favorites[0]))
                let saved = Object.assign(favorites[0], favorites[0].changeFavorite()).save()
                return res.status(200).json({ favorite: favorites[0].isFavorite() })
            } else {
                Favorite.create({ user: user.id, product: params.id })
                    .then((favorite) => {
                        res.status(200).json({ favorite: favorite.isFavorite() })
                    })
                    .catch(next)
            }
        })
        .catch(next)
}


export const index = ({ querymen: { query, select, cursor } }, res, next) =>
    Favorite.find(query, select, cursor)
    .then((favorites) => favorites.map((favorite) => favorite.view()))
    .then(success(res))
    .catch(next)

export const getFavoriteProduct = ({ params, user }, res, next) => {
    console.log('User Id ' + user.id + " Param Id " + params.id)
    Favorite.find({ user: user.id, product: params.id })
        .then((favorites) => {
            if (favorites.length > 0) {
                return res.status(200).json({ favorite: favorites[0].isFavorite() })
            } else {
                return res.status(200).json({ favorite: false })
            }
        })
        .catch(next)
}

export const updateFavoriteProduct = ({ params }, res, next) => {

}

export const getFavoriteMe = ({ user }, res, next) => {
    Favorite.find({ user: user.id })
        .then((favorites) => {

            let count = 0
            for (let favorite of favorites) {
                if (favorite.isFavorite()) {
                    count++;
                }
            }
            res.status(200).json({ count: count })
        })
}

export const getFavoriteMeDetail = async({ user }, res, next) => {
    Favorite.find({ user: user.id })
        .then((favorites) => favorites.filter((favorite) => favorite.isFavorite() == true))
        .then(async(favorites) => {
            let products = []
            for (let favorite of favorites) {
                let product = await Product.findById(favorite.product)
                    .then(notFound(res))
                    .then((product) => product ? product.view(true) : null)
                    .catch(next)

                let shop = await Shop.findById(product.shop)
                    .then(notFound(res))
                    .then((shop) => shop ? shop.view() : null)
                    .catch(next)

                products.push({
                    product: product.id,
                    shop: product.shop,
                    price: product.price,
                    name: product.name,
                    image: product.image,
                    shopName: shop.name
                })
            }
            res.status(200).json(products)
        })
}


export const show = ({ params }, res, next) =>
    Favorite.findById(params.id)
    .then(notFound(res))
    .then((favorite) => favorite ? favorite.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
    Favorite.findById(params.id)
    .then(notFound(res))
    .then((favorite) => favorite ? Object.assign(favorite, body).save() : null)
    .then((favorite) => favorite ? favorite.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
    Favorite.findById(params.id)
    .then(notFound(res))
    .then((favorite) => favorite ? favorite.remove() : null)
    .then(success(res, 204))
    .catch(next)