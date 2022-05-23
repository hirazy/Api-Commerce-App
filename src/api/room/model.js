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
    messages: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Message'
    }]
}, { timestamps: true })

roomSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            user: this.user,
            shop: this.shop
        }

        return full ? {
            ...view,
            messages: this.messages
        } : view
    },

    addMessage(message) {
        this.messages = [
            ...this.messages,
            message
        ]

        /**
         * Add Message
         */
        this.save()
    }
}

const model = mongoose.model('Room', roomSchema)

export const schema = model.schema
export default model