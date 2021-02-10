import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class NYC_Addresses {
  @Field(() => Int)
  longitude: number

  @Field(() => Int)
  latitude: number

  @Field()
  street_number: string

  @Field()
  street: string

  @Field()
  unit: string

  @Field()
  postcode: string

  @Field(() => Int)
  id: number
}
