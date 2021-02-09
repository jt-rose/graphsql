import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class Departments {
  @Field(() => Int)
  dept_id: number

  @Field()
  dept: string

  @Field()
  city: string
}

@ObjectType()
export class Employees {
  @Field(() => Int)
  emp_id: number

  @Field()
  first_name: string

  @Field()
  last_name: string

  @Field(() => Int)
  salary: number
}

@ObjectType()
export class SalaryByDept {
  @Field(() => Int)
  salary: string

  @Field()
  dept: string
}
