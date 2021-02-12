import { sql } from 'slonik'
import { pool } from './../utils/pool'
import { Employees, Departments, SalaryByDept } from './../entities/EMPLOYEES'
import { Arg, Int, Query, Resolver } from 'type-graphql'

// testing aggregators in sql

@Resolver()
export class LibUsageResolver {
  @Query(() => Int)
  async countRows(@Arg('year', () => Int) year: 2009 | 2014) {
    if (year === 2009) {
      const res = await pool.query(sql`
        SELECT count(*) FROM lib_usage_2009;
        `)

      return res.rows[0].count
    }
    const res = await pool.query(sql`
      SELECT count(*) FROM lib_usage_2014;
      `)

    return res.rows[0].count
  }
}
