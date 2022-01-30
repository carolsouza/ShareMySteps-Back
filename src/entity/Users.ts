import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    name: string;

    @Column({unique: true, default: ''})
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ type: 'timestamp'})
    birthday: Date;

    @CreateDateColumn({ type: 'timestamp'})
    creationDate: Date;

}
