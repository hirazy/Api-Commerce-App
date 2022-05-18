import mongoose, { Schema } from 'mongoose'

const creditCardSchema = new Schema({
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    card: {
        type: String,
        required: true
    },
    payment_type: {

    },
    expiry: {
        type: Date,
        default: Date.now,
        expires: 3600
    },
    account_no: {
        trim: true,
        type: String,
        default: "",
        trim: true
    },
    provider: {

    }
}, { timestamps: true })

creditCardSchema.methods = {
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

const model = mongoose.model('CreditCard', creditCardSchema)

export const schema = model.schema
export default model