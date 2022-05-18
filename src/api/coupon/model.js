import mongoose, { Schema } from 'mongoose'

const couponSchema = new Schema({

    description: {
        required: true,
        type: String,
        trim: true
    },
    active: {
        default: true,
        type: Boolean
    }

}, { timestamps: true })

couponSchema.methods = {
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

const model = mongoose.model('Coupon', couponSchema)

export const schema = model.schema
export default model