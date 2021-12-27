import { model, Schema, Document } from 'mongoose'

interface ListSchemaInterface extends Document {
  title: string
  type: string
  genre: string
  content?: string[]
}

const ListSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String },
    genre: { type: String },
    content: { type: Array },
  },
  { timestamps: true },
)

export const ListModel = model<ListSchemaInterface>('List', ListSchema)
