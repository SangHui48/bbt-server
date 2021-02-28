import { Field, Int, ObjectType } from "type-graphql";
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class Omr extends BaseEntity{
    
    @Field()
    @Column()
    questionNo!: number;

    @Field()
    @Column()
    userNo!: number;

    @Field()
    @Column()
    score!: number;

    @Field()
    @Column()
    level!: number;

    @Field(() => String)
    @CreateDateColumn({type:'timestamp'})
    regDate!: string;
    
}