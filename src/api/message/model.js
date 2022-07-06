import mongoose, { Schema } from 'mongoose'

const messageSchema = new Schema({
    sender: {
        ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    },
    room: {
        ref: 'Room',
        type: Schema.Types.ObjectId,
        required: true
    },
    resource: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Resource'
    },
    content: {
        type: String,
        default: ""
    },
    isResource: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

messageSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            roomId: this.roomId,
            content: this.content,
            isResource: this.isResource,
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