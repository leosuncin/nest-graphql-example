import { Resolver, Query, Args } from '@nestjs/graphql';

@Resolver()
export class TodoResolver {
  @Query(() => String)
  hello(@Args('name') name: string): string {
    return `hello, ${name}`;
  }
}
