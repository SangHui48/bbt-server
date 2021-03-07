import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";

const bcrypt = require('bcrypt')

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
        const check = await User.findOne({id: variables.id});
        if(check) throw new Error('id is already in use');
        const hashedPassword = await bcrypt.hash(variables.pw, 10);
        const data = variables;
        data.pw = hashedPassword;
        const newUser = User.create(data);
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