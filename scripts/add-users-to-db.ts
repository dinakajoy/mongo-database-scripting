import mongoose from "mongoose";
import dotenv from 'dotenv-safe';
import User from "../schema/user.schema";
import logger from "../logger";

dotenv.config();

const addUsersToDb = async () => {
  const usersToADd = [
    {
      name: "Halley Comet",
      email: "halleycomet@test.com",
      phone: "+91787655677",
      country: "India",
    },
    {
      name: "Hyakutake Comet",
      email: "hyakutakecomet@test.com",
      phone: "+234787655677",
      country: "Nigeria",
    },
    {
      name: "Halley Wild2",
      email: "halleywild2@test.com",
      phone: "+441787655677",
      country: "United Kingdom",
    },
  ];
  try {
    const dbURL = process.env.DATABASE_URL || "";
    await mongoose.connect(dbURL);
    await User.insertMany(usersToADd);

    logger.info("Users were added successfully");
    process.exit(0);
  } catch (e) {
    logger.error("Users were not added successfully with error: ", e);
    process.exit(1);
  }
};

addUsersToDb().then(process.exit);
