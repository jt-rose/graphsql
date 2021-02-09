import { sql } from 'slonik'
import { pool } from './../utils/pool'
import { Teachers } from './../entities/TEACHERS'
import { Arg, Int, Query, Resolver } from 'type-graphql'

@Resolver(Teachers)
export class TeachersResolver {
  @Query(() => [Teachers])
  async teachers() {
    const res = await pool.query(sql`
        SELECT * FROM teachers;
        `)
    return res.rows
  }

  @Query(() => [Teachers])
  async teacher(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string
  ) {
    const res = await pool.query(sql`
    SELECT * FROM Teachers
    WHERE first_name = ${firstName}
    AND last_name = ${lastName};
    `)
    return res.rows
  }

  @Query(() => [Int])
  async salaries() {
    const res = await pool.query(sql`
      SELECT salary FROM teachers;
      `)
    return res.rows.map((teacher) => teacher.salary)
  }
}
