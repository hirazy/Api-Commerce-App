import mongoose, { Schema } from 'mongoose'

const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true })

tagSchema.methods = {
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

const model = mongoose.model('Tag', tagSchema)

export const schema = model.schema
export default model