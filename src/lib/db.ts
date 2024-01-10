const { PrismaClient } = require('@prisma/client');

declare global {
  var prisma: typeof PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
