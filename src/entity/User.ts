import { Field, Int, ObjectType } from "type-graphql";
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity{
    
    @Field()
    @PrimaryGeneratedColumn()
    userNo!: number;

    @Field(() => String)
    @Column()
    id!: string;

    @Field(() => String)
    @Column()
    pw!: string;

    @Field(() => String)
    @Column()
    name!: string;

    @Field(() => String)
    @CreateDateColumn({type:'timestamp'})
    regdate!: string;

    @Field(() => String)
    @CreateDateColumn({type:'timestamp'})
    changeDate!: string;

    @Field(() =>  String)
    @Column()
    role!: string;

    @Field(() => String)
    @Column()
    token!: string;

}