import { sql } from 'slonik'
import { pool } from './../utils/pool'
import { Teachers } from './../entities/TEACHERS'
import { Query, Resolver } from 'type-graphql'

@Resolver(Teachers)
export class TeachersResolver {
  @Query(() => [Teachers])
  async teachers() {
    const res = await pool.query(sql`
        SELECT * FROM teachers;
        `)
    return res.rows
  }
}
