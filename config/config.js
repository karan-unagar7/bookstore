import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3001;

export const DB_ATLAS = process.env.DB_ATLAS;

export const SECRET_KEY = process.env.SECRET_KEY;