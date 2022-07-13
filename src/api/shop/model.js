import mongoose, { Schema } from 'mongoose'
import { isEmail, isMobilePhone } from 'validator';
import { passwordSecret } from '../../config'
import CryptoJS from 'crypto-js'
import crypto from 'crypto'

const shopSchema = new Schema({
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: false,
        unique: true,
        trim: true,
        // lowercase: true,
        // validate: [isEmail, 'invalid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: []
    },
    name: {
        type: String,
        required: true,
        unique: true,
        default: ''
    },
    // main_industry: {
    //     type: String,
    //     required: true,
    //     default: ''
    // },
    country: {
        type: String,
        required: false,
        default: 'vi',
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: "Category",
    }],
    verified: {
        type: Boolean,
        required: false,
        default: false
    },
    phone: {
        type: String,
        required: true,
    },
    online: {
        type: Date,
        // required: true,
        default: Date.now()
    },
    picture: {
        type: String,
        required: true,
    },
    followers: {
        type: Number,
        required: false,
        default: 0
    },
    reviews: {
        type: Number,
        required: false,
        default: 0
    },
    rating: {
        type: Number,
        default: 5,
        required: false
    },
    image: {
        type: String,
        required: true,
    },
    images: [{
            type: String,
        }]
        // follow: [{
        //     type: Schema.Types.ObjectId,
        //     ref: 'Follow'
        // }]
}, { timestamps: true })

// shopSchema.path('name').validate((name) => {

// })

shopSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next()

    const encryptPassword = CryptoJS.AES.encrypt(this.password, passwordSecret)

    this.password = encryptPassword
    next()
})

shopSchema.methods = {

    viewProduct() {
        const view = {
            id: this.id,
            name: this.name,
            online: this.online,
            picture: this.picture,
            rating: this.rating,
            products: this.products,
        }

        return view
    },

    view(full) {
        const view = {
            // simple view
            id: this.id,
            name: this.name,
            online: this.online,
            picture: this.picture,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }

        return full ? {
            ...view,
            image: this.image,
            followers: this.followers,
            rating: this.rating,
            images: this.images
                // add properties for a full view
        } : view
    }
}

const model = mongoose.model('Shop', shopSchema)

export const schema = model.schema
export default model