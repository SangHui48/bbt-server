import { Field, Int, ObjectType } from "type-graphql";
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity} from "typeorm";

interface answerForm {
    no: number;
    answer: string;
    point: number;
}

@ObjectType()
@Entity()
export class Question extends BaseEntity{
    
    @Field()
    @PrimaryGeneratedColumn()
    questionNo!: number;

    @Field(() => String)
    @Column()
    title!: string;

    @Field(() => String)
    @Column()
    level!: string;

    @Field(() => String)
    @Column()
    url!: string;

    @Field(() => String)
    @Column({type: 'json'})
    answerSheet!: answerForm;
}