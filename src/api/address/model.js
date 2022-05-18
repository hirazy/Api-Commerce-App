import mongoose, { Schema } from 'mongoose'
import { isEmail, isMobilePhone } from 'validator';

const addressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        index: true,
        trim: true,
        unique: true,
        validate: [isMobilePhone]
    },
    isDefault: {
        type: Boolean,
        required: false
    },
    city: {
        type: String,
        default: '',
        required: true
    },
    country: {
        type: String,
        default: '',
        required: true
    },
    district: {
        type: String,
        required: true,
        default: ''
    },
    postal_code: {
        type: String,
    },
    zipCode: {
        type: String,
        default: ''
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        required: true
    },

    /**
     * Home or Company
     */
    isHome: {
        type: Boolean,
        required: true
    }
    // addressLine1: {
    //     type: String,
    //     required: true,
    // },
    // addressLine2: {
    //     type: String,
    //     required: false
    // }

}, { timestamps: true })

addressSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }

        return full ? {
            ...view
            // add properties for a full view
        } : view
    }
}

const model = mongoose.model('Address', addressSchema)

export const schema = model.schema
export default model