import { sql } from 'slonik'
import { pool } from './../utils/pool'
import { Employees, Departments, SalaryByDept } from './../entities/EMPLOYEES'
import { Query, Resolver } from 'type-graphql'

@Resolver()
export class EmployeesResolver {
  @Query(() => [Employees])
  async employees() {
    const res = await pool.query(sql`
        SELECT * FROM employees;
        `)
    return res.rows
  }

  @Query(() => [Departments])
  async departments() {
    const res = await pool.query(sql`
        SELECT * FROM departments;
        `)
    return res.rows
  }

  @Query(() => [SalaryByDept])
  async salaryByDept() {
    const res = await pool.query(sql`
      SELECT salary, dept 
      FROM employees AS e JOIN Departments as d
      ON e.dept_id = d.dept_id
      ORDER BY salary DESC;
      `)

    return res.rows
  }
}
