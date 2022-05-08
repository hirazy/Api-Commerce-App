import mongoose, { Schema } from 'mongoose'

const creditCardSchema = new Schema({}, { timestamps: true })

creditCardSchema.methods = {
  view (full) {
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

const model = mongoose.model('CreditCard', creditCardSchema)

export const schema = model.schema
export default model
