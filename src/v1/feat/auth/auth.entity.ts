import { Entity, PrimaryGeneratedColumn, Column, OneToOne,JoinColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Profile } from "../user/user-entity";

@Entity()
export class Auth {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @Column({ enum: ["admin", "user", "merchant", "support"], default: "user" })
  role: string;

  @OneToOne(() => Profile, (profile) => profile.auth, { cascade: true })
  @JoinColumn()
  profile!: Profile;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
