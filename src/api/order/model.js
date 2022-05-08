import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({

    total_amount: {
        required: true,
        type: Number,
        validate: []
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    }

}, { timestamps: true })

orderSchema.methods = {
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

const model = mongoose.model('Order', orderSchema)

export const schema = model.schema
export default model