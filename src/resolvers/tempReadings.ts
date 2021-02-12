import { sql } from 'slonik'
import { pool } from './../utils/pool'
import { TempDescriptions, TempReadings } from './../entities/TEMP_READINGS'
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

  @Query(() => [TempDescriptions])
  async tempDescriptions() {
    const res = await pool.query(sql`
      SELECT max_temp,
        CASE WHEN max_temp >= 90 THEN 'Hot'
            WHEN max_temp BETWEEN 70 AND 89 THEN 'Warm'
            WHEN max_temp BETWEEN 50 AND 69 THEN 'Pleasant'
            WHEN max_temp BETWEEN 33 AND 49 THEN 'Cold'
            WHEN max_temp BETWEEN 20 AND 32 THEN 'Freezing'
            ELSE 'Inhumane'
        END AS temperature_description
      FROM temperature_readings;
      `)

    return res.rows
  }
}
