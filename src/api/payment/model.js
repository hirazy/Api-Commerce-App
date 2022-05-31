import mongoose, { Schema } from 'mongoose'

const paymentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    payment_type: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    account_no: {
        type: String,
        required: true,
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