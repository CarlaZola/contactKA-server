import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, AfterInsert, AfterLoad, AfterUpdate, DeleteDateColumn } from "typeorm";
import * as bcrypt from "bcryptjs"
import { Contact } from "./contact.entity";


@Entity('users')
class User {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'varchar', length: 70, unique: true})
    full_name: string 

    @Column({type: 'varchar', length: 120, unique: true})
    email: string

    @Column({type: 'varchar', length: 120})
    password: string

    @Column({type: 'varchar', length: 18})
    phone: string

    @Column({type: 'varchar', length: 50, nullable: true})
    nickname: string | undefined | null

    @CreateDateColumn({type: 'date'})
    createdAt: string 

    @DeleteDateColumn({type: 'date', nullable: true})
    deletedAt?: string | null | undefined

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
    @BeforeInsert()
    @BeforeUpdate()
    toLowerCaseName() {
        if (this.full_name) {
          return this.full_name = this.full_name.toLowerCase()
        }
    }
 
    @AfterInsert()
    @AfterUpdate()
    @AfterLoad()
    toNormalizeName(){
        if(this.full_name){
            return this.full_name = this.full_name.split(' ').map((text: string) => text[0].toUpperCase() + text.slice(1)).join(' ')
          }
    }
 
}

export {
    User
}