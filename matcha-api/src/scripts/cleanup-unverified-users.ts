import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cron from 'node-cron';

import User from '../models/User';

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/matcha_dev';

export const cleanupUnverifiedUsers = async () => {
  try {
    const result = await User.deleteMany({
      isEmailVerified: false,
      emailVerificationTokenExpires: { $lte: new Date() },
    });

    console.log(`[Cleanup] Deleted ${result.deletedCount} unverified user(s)`);
  } catch (error) {
    console.error('[Cleanup] Error deleting unverified users:', error);
  }
};

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const isManualRun = process.argv.includes('--once');

    if (isManualRun) {
      await cleanupUnverifiedUsers();
      await mongoose.disconnect();
      process.exit(0);
    }

    // Automatic cron mode (runs every hour)
    cron.schedule('0 * * * *', async () => {
      console.log(`[Cron] Running user cleanup at ${new Date().toISOString()}`);
      await cleanupUnverifiedUsers();
    });
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

start();
