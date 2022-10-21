import mongoose from "mongoose";
import dotenv from 'dotenv-safe';
import User from "../schema/userWithVisibility.schema";
import logger from "../logger";

dotenv.config();

const addUsersWithVisibilityToDb = async () => {
  const usersWithVisibilityToADd = [
    {
      name: "Halley Comet",
      email: { value: "halleycomet@test.com" },
      phone: { value: "+91787655677" },
      country: { value: "India" },
    },
    {
      name: "Hyakutake Comet",
      email: { value: "hyakutakecomet@test.com" },
      phone: { value: "+234787655677" },
      country: { value: "Nigeria" },
    },
    {
      name: "Halley Wild2",
      email: { value: "halleywild2@test.com" },
      phone: { value: "+441787655677" },
      country: { value: "United Kingdom" },
    },
  ];
  try {
    const dbURL = process.env.DATABASE_URL || "";
    await mongoose.connect(dbURL);
    await User.insertMany(usersWithVisibilityToADd);

    logger.info("Users were added successfully");
    process.exit(0);
  } catch (e) {
    logger.error("Users were not added successfully with error: ", e);
    process.exit(1);
  }
};

addUsersWithVisibilityToDb().then(process.exit);
