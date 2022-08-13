import mongoose, { Schema } from 'mongoose'

const messageSchema = new Schema({
    sender: {
        // ref: "User",
        type: Schema.Types.ObjectId,
        required: true
    },
    room: {
        ref: 'Room',
        type: Schema.Types.ObjectId,
        required: true
    },
    resources: [{
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Resource'
    }],
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
        if (this.isResource) {
            const view = {
                // simple view
                id: this.id,
                room: this.room,
                sender: this.sender,
                resources: this.resources,
                isResource: this.isResource,
                createdAt: this.createdAt,
            }
            return full ? {
                ...view
                // add properties for a full view   
            } : view
        }

        const view = {
            // simple view
            id: this.id,
            room: this.room,
            sender: this.sender,
            content: this.content,
            isResource: this.isResource,
            createdAt: this.createdAt,
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