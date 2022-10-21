import mongoose from "mongoose";
import { UserInfoVisibilityCriteria } from "../constants";

export interface IUserVisibility {
  value: string;
  privacySetting: {
    criteria?: string;
  };
}

export interface UserWithVisibilityDocument {
  name: String;
  email?: IUserVisibility;
  phone?: IUserVisibility;
  country?: IUserVisibility;
  createdAt: Date;
  updatedAt: Date;
}

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

const UserWithVisibilityModel = mongoose.model<UserWithVisibilityDocument>(
  "User",
  userWithVisibilitySchema
);

export default UserWithVisibilityModel;
