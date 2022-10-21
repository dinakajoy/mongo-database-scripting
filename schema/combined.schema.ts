import mongoose from 'mongoose';
import { UserInfoVisibilityCriteria } from "../constants";

export interface IUserVisibility {
  value: string;
  privacySetting: {
    criteria?: string;
  };
}

export interface UserDocument {
  name: String,
  email: String | IUserVisibility,
  phone: String | IUserVisibility,
  country: String | IUserVisibility,
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

const userWithVisibilitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      value: {
        type: String,
        required: true,
      },
      privacySetting: {
        criteria: {
          type: String,
          enum: Object.values(UserInfoVisibilityCriteria),
          default: UserInfoVisibilityCriteria.Everyone,
        },
      },
    },
    country: {
      value: {
        type: String,
        required: true,
      },
      privacySetting: {
        criteria: {
          type: String,
          enum: Object.values(UserInfoVisibilityCriteria),
          default: UserInfoVisibilityCriteria.Everyone,
        },
      },
    },
    phone: {
      value: {
        type: String,
        required: true,
      },
      privacySetting: {
        criteria: {
          type: String,
          enum: Object.values(UserInfoVisibilityCriteria),
          default: UserInfoVisibilityCriteria.Everyone,
        },
      },
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<UserDocument>('User', userWithVisibilitySchema || userSchema);

export default UserModel;