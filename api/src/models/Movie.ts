import { model, Schema, Document } from 'mongoose'

interface MovieSchemaInterface extends Document {
  title: string
  desc?: string
  img?: string
  imgTitle?: string
  imgSm?: string
  trailer?: string
  video?: string
  year?: string
  limit?: number
  genre?: string
  isSerial?: boolean
}

const MovieSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: String },
    genre: { type: String },
    isSerial: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export const MovieModel = model<MovieSchemaInterface>('Movie', MovieSchema)
