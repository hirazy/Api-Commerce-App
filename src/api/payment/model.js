import mongoose, { Schema } from 'mongoose';

const paymentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    payment_type: {
        type: String,
        required: false,
        enum: ['Momo'],
        default: 'Momo'
    },
    payment_status: {
        type: String,
        required: true,
        enum: ['Token', 'Payment'],
        default: 'Payment'
    },
    provider: {
        type: String,
        required: true,
        default: ''
    },
    account_no: {
        type: String,
        required: true,
    },
    requestId: {
        type: String,
        required: false,
    },
    accessToken: {
        type: String,
        required: false
    },
    expiry: {
        type: Date,
        required: true
    }
}, { timestamps: true })

paymentSchema.methods = {
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

const model = mongoose.model('Payment', paymentSchema)

export const schema = model.schema
export default model