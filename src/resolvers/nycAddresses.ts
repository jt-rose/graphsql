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
}
