import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";
import { compare, hash } from "bcrypt";

@InputType()
class UserInput {
    
    @Field(() => String)
    id!:string;

    @Field(() => String)
    pw!: string;

    @Field(() => String)
    name!: string;

}

@InputType()
class login {
    @Field(() => String)
    id!:string;

    @Field(() => String)
    pw!:string;
}

@Resolver()
export class UserResolver {

    @Mutation(() => User)
    async createUser(
       @Arg("variables", () => UserInput) variables: UserInput
    ){  
        const check = await User.findOne({id: variables.id});
        if(check) throw new Error('id is already in use');
        const hashedPassword = await hash(variables.pw, 10);
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

    @Query(() =>Boolean)
    async login( @Arg('data', () => login) data:login): Promise<Boolean> {
        
            const user = await User.findOne({ id: data.id });
            if (!user) {
                throw new Error(`The user with id: ${data.id} does not exist!`);
                return false;
            }
            // 비밀번호 확인
            const valid = await compare(data.pw, user.pw);
            if (!valid) {
                throw new Error(`Password not mached!`);
                return false;
            }
            // accessToken 발급
            return true;
        
    }
}