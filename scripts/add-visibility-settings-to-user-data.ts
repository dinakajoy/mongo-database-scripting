import mongoose from "mongoose";
import dotenv from "dotenv-safe";
import User from "../schema/combined.schema";
import logger from "../logger";
import { UserInfoVisibilityCriteria } from "../constants";

dotenv.config();

const dbURL = process.env.DATABASE_URL || "";

const addVisibilitySettingsToUserData = async () => {
  try {
    await mongoose.connect(dbURL);

    const users = await User.find().lean().cursor({ batchSize: 500 });

    for (
      let user = await users.next();
      user != null;
      user = await users.next()
    ) {
      if (!user) {
        continue;
      }

      await User.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            email: {
              value: user.email,
              privacySetting: {
                criteria: UserInfoVisibilityCriteria.Everyone,
              },
            },
            phone: {
              value: user.phone,
              privacySetting: {
                criteria: UserInfoVisibilityCriteria.Everyone,
              },
            },
            country: {
              value: user.country,
              privacySetting: {
                criteria: UserInfoVisibilityCriteria.Everyone,
              },
            },
          },
        }
      );
    }

    logger.info(
      "Migration of add visibility settings to user data successfully completed for ALL users"
    );
    process.exit(0);
  } catch (e) {
    logger.error(
      "Migration of add visibility settings to user data was not successful with error: ",
      e
    );
    process.exit(1);
  }
};

export default addVisibilitySettingsToUserData;
