import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class Teachers {
  @Field(() => Int)
  id: number

  @Field({})
  first_name: string

  @Field()
  last_name: string

  @Field()
  school: string

  @Field()
  hire_date: string

  @Field(() => Int)
  salary: number
}
