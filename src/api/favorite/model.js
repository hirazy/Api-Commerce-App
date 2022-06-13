import mongoose, { Schema } from 'mongoose'

const favoriteSchema = new Schema({
    product: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

}, { timestamps: true })

favoriteSchema.methods = {
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

const model = mongoose.model('Favorite', favoriteSchema)

export const schema = model.schema
export default model