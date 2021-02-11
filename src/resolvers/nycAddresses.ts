import { sql } from 'slonik'
import { pool } from './../utils/pool'
import { NYC_Addresses } from './../entities/NYC_ADDRESSES'
import { Arg, Int, Query, Resolver } from 'type-graphql'

@Resolver()
export class NYC_Addresses_Resolver {
  @Query(() => [String])
  async streetsByZipCode(@Arg('zipCode', () => Int) zipCode: number) {
    const res = await pool.query(sql`
        SELECT DISTINCT street FROM new_york_addresses
        WHERE postcode = ${zipCode}
        ORDER BY street;
        `)

    return res.rows.map((x) => x.street)
  }

  @Query(() => [String])
  async analyzeStreetsByName(@Arg('streetName') streetName: string) {
    const res = await pool.query(sql`
      EXPLAIN ANALYZE SELECT * FROM new_york_addresses
      WHERE street = ${streetName};
      `)

    return res.rows.map((x) => JSON.stringify(x))
    // CREATE INDEX street_idx ON new_york_addresses (street)
    // indexes speed up search, good for WHERE columns and FK joins
  }
}
