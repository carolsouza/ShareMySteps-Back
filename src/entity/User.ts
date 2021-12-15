import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    firstName: string;

    @Column({default: ''})
    lastName: string;

    @Column({unique: true, default: ''})
    email: string;

    @CreateDateColumn({ type: 'timestamp'})
    birthday: Date;

    @CreateDateColumn({ type: 'timestamp'})
    creationDate: Date;

}
