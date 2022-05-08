import mongoose, { Schema, SchemaTypes } from 'mongoose'

const productSchema = new Schema({
    name: {
        type: String,
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop"
    },
    image: {
        type: String,
    },
    images: [{
        type: String
    }],
    prices: [

    ],
    description: {
        type: String,
        default: "",
        trim: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    images: [{}],
}, { timestamps: true })

productSchema.methods = {
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

const model = mongoose.model('Product', productSchema)

export const schema = model.schema
export default model