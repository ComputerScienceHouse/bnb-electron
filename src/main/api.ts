import { initTRPC } from '@trpc/server'
// import { getEntityManager } from './db'
// import { User } from './entities/User'; // Assuming you create a User entity

const t = initTRPC.create();

export const router = t.router({
  user: t.router({
    // Example procedure to get a user by ID
    getUserById: t.procedure
      .input((id: unknown) => id as number)
      .query(async ({ input: id }) => {
        // const em = getEntityManager()
        // const user = await em.findOne(User, { id });
        // return user;

        // For now, returning mock data
        return { id, name: 'John Doe from DB' }
      }),

    // Example procedure to save contact info
    saveContact: t.procedure
      .input((val: unknown) => val as { email?: string; phone?: string })
      .mutation(async ({ input }) => {
        // const em = getEntityManager()
        console.log('Saving user contact info:', input)
        // const newUser = em.create(User, { email: input.email });
        // await em.flush(); // This saves changes to the database
        return { success: true, message: 'Contact info saved successfully.' }
      })
  }),

  // New router for handling authentication
  auth: t.router({
    verifyPassword: t.procedure
      .input((password: unknown) => password as string)
      .mutation(({ input: password }) => {
        // IMPORTANT: In a real application, never hardcode passwords.
        // Use environment variables and hashed password comparison.
        const ADMIN_PASSWORD = 'admin' // Example password
        console.log(password)
        if (password === ADMIN_PASSWORD) {
          return { success: true }
        }
        return { success: false, message: 'Incorrect password.' }
      })
  })
})

export type AppRouter = typeof router
