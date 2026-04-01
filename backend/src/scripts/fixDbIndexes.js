import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const fixIndexes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        const collection = mongoose.connection.collection("users");

        // List indexes to confirm
        const indexes = await collection.indexes();
        console.log("Current Indexes:", indexes);

        // Drop the problematic index
        const phoneIndex = indexes.find(idx => idx.key.phone === 1);
        if (phoneIndex) {
            console.log(`Dropping index: ${phoneIndex.name}`);
            await collection.dropIndex(phoneIndex.name);
            console.log("Index dropped successfully");
        } else {
            console.log("phone_1 index not found");
        }

        console.log("Done");
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

fixIndexes();
