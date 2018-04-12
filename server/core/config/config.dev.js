import path from 'path';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config = {};

config.logFileDir = path.join(__dirname, '../../log');
config.logFileName = 'app.log';
config.dbHost = process.env.dbHost || 'localhost';
config.dbPort = process.env.dbPort || '27017';
config.dbName = process.env.dbName || 'slack_chat';
config.dbUser = process.env.dbUser || 'root';
config.dbPassword = process.env.dbPassword || 'password';
config.serverPort = process.env.serverPort || 3000;
config.SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR || 10;
config.JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET'

export default config;
