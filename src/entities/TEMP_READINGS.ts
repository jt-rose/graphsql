import { Field, Int, ObjectType, ObjectType } from 'type-graphql'

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
