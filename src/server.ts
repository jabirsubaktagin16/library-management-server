import http from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

// Handle synchronous exceptions
process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Declare the server variable
let server: http.Server | undefined;

// Handle unhandled promise rejections
process.on('unhandledRejection', error => {
  console.error('Unhandled Rejection detected. Closing the server...', error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully.');
  if (server) {
    server.close();
  }
});

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database connection established');

    // Assign the server correctly
    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to connect Database:', err);
    process.exit(1); // Exit if DB connection fails
  }
}

bootstrap();
