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
        // index: true,
        trim: true,
        validate: [isMobilePhone]
    },
    city: {
        type: String,
        default: '',
        required: true
    },
    country: {
        type: String,
        default: 'VI',
        required: false
    },
    district: {
        type: String,
        required: false,
        default: ''
    },
    postal_code: {
        type: String,
        default: ''
    },
    zipCode: {
        required: false,
        type: String,
        default: ''
    },
    street: {
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

}, { timestamps: true })

addressSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            name: this.name,
            phone: this.phone,
            city: this.city,
            street: this.street,
            isHome: this.isHome
        }

        return full ? {
            ...view
            // add properties for a full view
        } : view
    }
}

// addressSchema.index({ name: 1, phone: 1, }, { unique: true })

const model = mongoose.model('Address', addressSchema)

export const schema = model.schema
export default model