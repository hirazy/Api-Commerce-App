import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        required: true,
        type: String,
        trim: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        required: true
    }],
}, { timestamps: true })

categorySchema.methods = {
    view(full) {
        const view = {
            // simple viewd
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }

        return full ? {
            ...view
            // add properties for a full view
        } : view
    },

    viewResource() {

    }
}

const model = mongoose.model('Category', categorySchema)

export const schema = model.schema
export default model