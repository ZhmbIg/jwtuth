import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    password: string;
    @Column({unique: true})
    email: string;

    @ManyToMany(() => Role)
    @JoinTable({
        name: 'user_roles',
        joinColumn: {name: 'user_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name:'role_id', referencedColumnName: 'id'},
    })
    roles:Role[];
}