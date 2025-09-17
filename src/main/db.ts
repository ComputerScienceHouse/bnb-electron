import { MikroORM } from '@mikro-orm/core'
import { SqliteDriver } from '@mikro-orm/sqlite'
import path from 'node:path'
import { app } from 'electron'

// Define your entities here
// Example: import { User } from './entities/User';

let orm: MikroORM<SqliteDriver>

export async function initializeDatabase() {
  if (orm) {
    return orm
  }

  // Use the app's user data path to store the database file
  const dbPath = path.join(app.getPath('userData'), 'app.db')

  orm = await MikroORM.init({
    driver: SqliteDriver,
    dbName: dbPath,
    entities: [], // Add your entity classes here, e.g., [User]
    debug: process.env.NODE_ENV !== 'production' // Log SQL in development
  })

  // This is useful to ensure the schema is up-to-date during development
  await orm.getSchemaGenerator().updateSchema()

  return orm
}

// A helper function to easily access the entity manager
export function getEntityManager() {
  if (!orm) {
    throw new Error('Database has not been initialized.')
  }
  // Forking the entity manager is a best practice for each request
  return orm.em.fork()
}
