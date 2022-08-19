import mongoose, { Schema } from 'mongoose'

const purchaseSchema = new Schema({
    payment: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Payment'
    },
    orderInfo: {
        type: String,
        required: true
    }
}, { timestamps: true })

purchaseSchema.methods = {
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

const model = mongoose.model('Purchase', purchaseSchema)

export const schema = model.schema
export default model