import mongoose from "mongoose";
import dotenv from "dotenv-safe";
import User from "../schema/combined.schema";
import logger from "../logger";

dotenv.config();

const dbURL = process.env.DATABASE_URL || "";

const removeVisibilitySettingsFromUserData = async () => {
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
            email: user.email?.value,
            phone: user.phone?.value,
            country: user.country?.value,
          },
        }
      );
    }

    logger.info(
      "Migration of remove visibility settings to user data successfully completed for ALL incubators"
    );
    process.exit(0);
  } catch (e) {
    logger.error(
      "Migration of remove visibility settings to user data was not successful with error: ",
      e
    );
    process.exit(1);
  }
};

export default removeVisibilitySettingsFromUserData;
