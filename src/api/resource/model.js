import mongoose, { Schema } from 'mongoose'

const resourceSchema = new Schema({
    /**
     * Require key not null , save into google cloud storage
     */
    key: {
        type: String,
        required: true,
        default: ''
    },
    type: {
        type: String,
        enum: ['IMAGE', 'AUDIO', 'VIDEO'],
        default: 'IMAGE',
        required: false
    }
}, { timestamps: true })

resourceSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            key: this.key,
        }

        return full ? {
            ...view,
            type: this.type,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        } : view
    }
}

const model = mongoose.model('Resource', resourceSchema)

export const schema = model.schema
export default model