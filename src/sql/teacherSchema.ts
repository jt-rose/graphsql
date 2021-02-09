import { pool } from '../utils/pool'
import { sql } from 'slonik'

export const createTeachersTable = async () => {
  try {
    await pool.query(sql`

    CREATE TABLE teachers (
    id BIGSERIAL, /* BIGSERIAL: auto-increment */
    first_name VARCHAR(25),
    last_name VARCHAR(50),
    school VARCHAR(50),
    hire_date DATE,
    salary NUMERIC );

    `)
    await pool.end()
  } catch (err) {
    console.log('ERROR: ', err.message)
  }
}

export const insertTeachers = async () => {
  try {
    await pool.query(sql`

        INSERT INTO teachers (first_name, last_name, school, hire_date, salary)
        VALUES ('Janet', 'Smith', 'F.D. Roosevelt HS', '2011-10-30', 36200),
       ('Lee', 'Reynolds', 'F.D. Roosevelt HS', '1993-05-22', 65000),
       ('Samuel', 'Cole', 'Myers Middle School', '2005-08-01', 43500),
       ('Samantha', 'Bush', 'Myers Middle School', '2011-10-30', 36200),
       ('Betty', 'Diaz', 'Myers Middle School', '2005-08-30', 43500),
       ('Kathleen', 'Roush', 'F.D. Roosevelt HS', '2010-10-22', 38500);
        
        `)
    await pool.end()
  } catch (err) {
    console.log('ERROR: ', err.message)
  }
}
