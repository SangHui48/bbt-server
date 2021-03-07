import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";

@InputType()
class UserInput {
    
    @Field(() => String)
    id!:string;

    @Field(() => String)
    pw!: string;

    @Field(() => String)
    name!: string;

}

@Resolver()
export class UserResolver {

    @Mutation(() => User)
    async createUser(
       @Arg("variables", () => UserInput) variables: UserInput
    ){
        const newUser = User.create(variables);
        console.log(newUser);
        return await newUser.save();
    }

    @Query(() => [User])
    users(){
        return User.find();
    }

    @Query(() => User)
    user(
        @Arg("id",()=>String) id:string
    ){  
        return User.findOne({id:id});
    }   

}