import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column,  ManyToOne, BeforeInsert, BeforeUpdate, BeforeRecover, AfterInsert, AfterUpdate, AfterRecover } from "typeorm";
import { User } from "./user.entity";


@Entity('contacts')
class Contact {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'varchar', length: 69, unique: true})
    full_name: string 

    @Column({type: 'varchar', length: 120, unique: true})
    email: string

    @Column({type: 'varchar', length: 18})
    phone: string

    @Column({type: 'varchar', length: 50, nullable: true})
    nickname: string | undefined | null

    @CreateDateColumn({type: 'date'})
    createdAt: string 

    @ManyToOne(() => User, (user) => user.contacts)
    user: User

    @BeforeInsert()
    @BeforeUpdate()
    @BeforeRecover()
    toLowerCaseName() {
        if (this.full_name) {
            this.full_name = this.full_name.toLowerCase()
        }
    }
 
    @AfterInsert()
    @AfterUpdate()
    @AfterRecover()
    toNormalizeName(){
        if(this.full_name){
             this.full_name = this.full_name.split(' ').map((text: string) => text[0].toUpperCase() + text.slice(1)).join(' ')
          }
    }
}


export {
    Contact
}