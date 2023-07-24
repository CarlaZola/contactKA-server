import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToMany } from "typeorm";
import { Client } from "./client.entity";


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

    @ManyToMany(() => Client, (client) => client.contacts)
    client: Client
}


export {
    Contact
}