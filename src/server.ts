import 'reflect-metadata'
import { TeachersResolver } from './resolvers/teachers'
import { EmployeesResolver } from './resolvers/employees'
import { NYC_Addresses_Resolver } from './resolvers/nycAddresses'
import { LibUsageResolver } from './resolvers/libUsage'
//import { createTeachersTable, insertTeachers } from './sql/buildSchema'
//import { createDeptTable, createEmployeesTable } from './sql/employeesSchema'
//import { pool } from './utils/pool'
//import { sql } from 'slonik'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { apolloLogger } from './utils/apolloLogger'

/* ------------------------ set up async main wrapper ----------------------- */

const main = async () => {
  const app = express()

  /* ---------------------------- connect to apollo --------------------------- */

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        TeachersResolver,
        EmployeesResolver,
        NYC_Addresses_Resolver,
        LibUsageResolver,
      ],
      validate: false,
    }),
    plugins: [apolloLogger],
    //plugins: [ApolloLogPlugin({})],
    // context
  })

  apolloServer.applyMiddleware({ app })

  /* ----------------------------- listen on port ----------------------------- */

  app.listen(5000, () => console.log('listening on port 5000'))
}

main()
