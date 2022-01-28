import { model, Schema, Document } from "mongoose";

export interface UserSchemaInterface {
  // _id: string
 username: string
 email: string
 password: string
 profilePic?: string
 fullname?: string,
 phone?: string,
 birthdate?: string,
 gender?: "male" | 'female' 
 isAdmin?: boolean
}

export type UserSchemaDocumentInterface = UserSchemaInterface & Document

const UserSchema = new Schema<UserSchemaInterface>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, defaut: "" },
    fullname: { type: String },
    phone: { type: String},
    gender: {type: String},
    birthdate: { type: String},
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }  }, 
);

export const UserModel = model<UserSchemaDocumentInterface>('User', UserSchema)