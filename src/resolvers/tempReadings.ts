import { sql } from 'slonik'
import { pool } from './../utils/pool'
import { TempReadings } from './../entities/TEMP_READINGS'
import { Arg, Int, Query, Resolver } from 'type-graphql'

@Resolver()
export class TempReadingsResolver {
  @Query(() => Int)
  async tempAverage(@Arg('stationName') stationName: string) {
    const res = await pool.query(sql`
        SELECT AVG(max_temp)::numeric(10,0) FROM temperature_readings
        WHERE station_name = ${stationName}
        `)
    return res.rows[0].avg
  }
}
