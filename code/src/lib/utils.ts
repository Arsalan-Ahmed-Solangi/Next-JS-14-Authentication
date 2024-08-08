import { type ClassValue, clsx } from "clsx";
import { Console } from "console";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const connectDB = async () => {
  try {
    if (mongoose.connection && mongoose.connections[0].readyState) return;
    const url = "mongodb+srv://Arsolangi:Arsolangi@developmentcluster.jof4dq7.mongodb.net/?retryWrites=true&w=majority&appName=developmentcluster";
    const { connection } = await mongoose.connect(url, {
      dbName: "NextAuth",
    });

    console.log(`Database Connected ${connection.host}`);
  } catch (error) {
    console.log(error);
    // throw new Error("Error Connecting DB");
  }
};
