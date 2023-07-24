import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import * as bcrypt from "bcryptjs"
import { Contact } from "./contact.entity";


@Entity('users')
class User {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'varchar', length: 255, unique: true})
    full_name: string 

    @Column({type: 'varchar', length: 120, unique: true})
    email: string

    @Column({type: 'varchar', length: 120})
    password: string

    @Column({type: 'varchar', length: 11})
    phone: string

    @Column({type: 'varchar', length: 50, nullable: true})
    nickname: string | undefined | null

    @CreateDateColumn({type: 'date'})
    createdAt: string 

    @OneToMany(() => Contact, (contacts) => contacts.user)
    contacts: Contact[]

    @BeforeInsert()
    @BeforeUpdate()
    PassHash(){
        const isEncripted = bcrypt.getRounds(this.password)
        
        if(!isEncripted){
            this.password = bcrypt.hashSync(this.password, 10)
        }
    }

}

export {
    User
}