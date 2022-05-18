import mongoose, { Schema } from 'mongoose'

const messageSchema = new Schema({
    user: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        default: ""
    },
    isImage: {
        type: Boolean,
        required: true,
        default: false
    },

}, { timestamps: true })

messageSchema.methods = {
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

const model = mongoose.model('Message', messageSchema)

export const schema = model.schema
export default model