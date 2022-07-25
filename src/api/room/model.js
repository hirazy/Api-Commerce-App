import mongoose, { Schema } from 'mongoose'

const roomSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    },
    name: {
        type: String,
        required: false
    }
}, { timestamps: true })

roomSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            updatedAt: this.updatedAt,
            user: this.user,
            shop: this.shop
        }

        return full ? {
            ...view
        } : view
    },
}

const model = mongoose.model('Room', roomSchema)

export const schema = model.schema
export default model