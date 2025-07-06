import { AbstractEntity } from "@app/common";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Role } from "./role.entity";

@Entity({ name: "user" })
export class User extends AbstractEntity<User> {
  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
