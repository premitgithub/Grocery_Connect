import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const fixIndexes = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        const collection = mongoose.connection.collection('users');

        // Check if index exists before dropping
        const indexes = await collection.indexes();
        const phoneIndex = indexes.find(idx => idx.name === 'phone_1');

        if (phoneIndex) {
            console.log('Found problematic index "phone_1". Dropping it...');
            await collection.dropIndex('phone_1');
            console.log('Index "phone_1" dropped successfully.');
        } else {
            console.log('Index "phone_1" not found.');
        }

        // List remaining indexes
        const remainingIndexes = await collection.indexes();
        console.log('Remaining indexes:', remainingIndexes.map(i => i.name));

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

fixIndexes();
