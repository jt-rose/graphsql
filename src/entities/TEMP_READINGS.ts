import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class TempReadings {
  @Field(() => Int)
  reading_id: number

  @Field()
  station_name: string

  /*@Field(() => Int)
    observation_date: date*/

  @Field(() => Int)
  max_temp: number

  @Field(() => Int)
  min_temp: number
}

@ObjectType()
export class TempDescriptions {
  @Field(() => Number)
  max_temp: number

  @Field()
  temperature_description: string
}

@ObjectType()
export class TempVariation {
  @Field()
  station_name: string

  @Field()
  max_temperature_group: string

  @Field(() => Int)
  count: number
}
