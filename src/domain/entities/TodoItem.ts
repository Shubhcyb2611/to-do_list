import { Column, ManyToOne, Relation } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

export class TodoItem extends BaseEntity{
    @Column()
    title : string ;

    @Column({type : "boolean" , default : false})
    completed : boolean

    @Column({nullable : true})
    image : string 

    @Column({nullable : true})
    dateOfCompletion : Date

    @ManyToOne(() => User , user => user.item)
    createdBy : Relation<User> |  string 
}