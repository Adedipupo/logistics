import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Auth } from "../auth/auth.entity";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid') // Use UUID as the primary key
    id: string;
  
    @Column()
    username: string;
  
    @Column({ nullable: true })
    firstName: string;
  
    @Column({ nullable: true })
    lastName: string;
  
    @Column({ nullable: true })
    address: string;
   
    @Column({ nullable: true })
    photo: string;

    @OneToOne(() => Auth, (auth) => auth.profile)
    auth: Auth;

}
