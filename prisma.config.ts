import path from 'node:path'
import { config } from 'dotenv'
import { defineConfig } from 'prisma/config'

// Cargar variables de entorno desde .env
config()

export default defineConfig({
    schema: path.join(__dirname, 'prisma', 'schema.prisma'),
    migrations: {
        seed: 'npx tsx prisma/seed.ts',
    },
    datasource: {
        url: process.env.DATABASE_URL!,
    },
})
