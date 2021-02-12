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

  @Query(() => Int)
  async countSalaryRows(@Arg('year', () => Int) year: 2009 | 2014) {
    if (year === 2009) {
      const res = await pool.query(sql`
        SELECT count(salaries) FROM lib_usage_2009;
        `)

      return res.rows[0].count
    }
    const res = await pool.query(sql`
      SELECT count(salaries) FROM lib_usage_2014;
      `)

    return res.rows[0].count
  }

  // to keep things simple for this project, I will just return a stringified result
  // rather than setting up custom typings like in a production app
  @Query(() => String)
  async salaryRange(@Arg('year', () => Int) year: 2009 | 2014) {
    if (year === 2009) {
      const res = await pool.query(sql`
        SELECT min(salaries), max(salaries) FROM lib_usage_2009;
        `)

      return JSON.stringify(res.rows)
    }
    const res = await pool.query(sql`
      SELECT min(salaries), max(salaries) FROM lib_usage_2014;
      `)

    return JSON.stringify(res.rows)
  }

  @Query(() => String)
  async librariesByState(@Arg('year', () => Int) year: 2009 | 2014) {
    if (year === 2009) {
      const res = await pool.query(sql`
        SELECT stabr, count(*) 
        FROM lib_usage_2009
        GROUP BY stabr
        ORDER BY count(*) DESC;
        ;
        `)

      return JSON.stringify(res.rows)
    }
    const res = await pool.query(sql`
        SELECT stabr, count(*) 
        FROM lib_usage_2014
        GROUP BY stabr
        ORDER BY count(*) DESC;
      `)

    return JSON.stringify(res.rows)
  }

  @Query(() => String)
  async totalVisits() {
    const res = await pool.query(sql`
      SELECT lib14.stabr AS state,
      sum(lib09.visits) AS visits_09, 
      sum(lib14.visits) AS visits_14,
      round( (CAST(sum(lib14.visits) AS DECIMAL(10,1)) - sum(lib09.visits)) / sum(lib09.visits) * 100, 2 ) AS percent_change
      FROM lib_usage_2009 AS lib09
      JOIN lib_usage_2014 AS lib14
      ON lib09.fscskey = lib14.fscskey
      WHERE lib09.visits >= 0
      AND lib14.visits >= 0
      GROUP BY lib14.stabr
      ORDER BY percent_change DESC;
      `)

    return JSON.stringify(res.rows)
  }
}
