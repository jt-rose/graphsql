import 'reflect-metadata'
import { TeachersResolver } from './resolvers/teachers'
import { EmployeesResolver } from './resolvers/employees'
//import { createTeachersTable, insertTeachers } from './sql/buildSchema'
//import { createDeptTable, createEmployeesTable } from './sql/employeesSchema'
//import { pool } from './utils/pool'
//import { sql } from 'slonik'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

/* ------------------------ set up async main wrapper ----------------------- */

const main = async () => {
  const app = express()

  /* ---------------------------- connect to apollo --------------------------- */

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TeachersResolver, EmployeesResolver],
      validate: false,
    }),
    // context
  })

  apolloServer.applyMiddleware({ app })

  /* ----------------------------- listen on port ----------------------------- */

  app.listen(5000, () => console.log('listening on port 5000'))
}

main()
