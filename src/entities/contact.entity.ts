import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column,  ManyToOne } from "typeorm";
import { User } from "./user.entity";


@Entity('contacts')
class Contact {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'varchar', length: 255, unique: true})
    full_name: string 

    @Column({type: 'varchar', length: 120, unique: true})
    email: string

    @Column({type: 'varchar', length: 11})
    phone: string

    @Column({type: 'varchar', length: 50, nullable: true})
    nickname: string | undefined | null

    @CreateDateColumn({type: 'date'})
    createdAt: string 

    @ManyToOne(() => User, (user) => user.contacts)
    user: User
}


export {
    Contact
}