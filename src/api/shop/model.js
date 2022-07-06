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
        lowercase: true,
        validate: [isEmail, 'invalid email']
    },
    password: {
        type: String,
        required: false,
        minlength: 8,
        validate: []
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
    }],
    name: {
        type: String,
        required: true,
        default: ''
    },
    main_industry: {
        type: String,
        required: true,
        default: ''
    },
    country: {
        type: String,
        required: true,
        enum: []
    },
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
        required: true,
        default: Date.now()
    },
    picture: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    follow: [{
        type: Schema.Types.ObjectId,
        ref: 'Follow'
    }]
}, { timestamps: true })

shopSchema.path('name').validate((name) => {

})

shopSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next()

    const newPassword = CryptoJS.AES.encrypt(this.password, passwordSecret)

})

shopSchema.methods = {

    viewProduct() {
        const view = {
            id: this.id,
            name: this.name,
            online: this.online,
            picture: this.picture,
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
            rating: this.rating,
            products: this.products
                // add properties for a full view
        } : view
    }
}

const model = mongoose.model('Shop', shopSchema)

export const schema = model.schema
export default model