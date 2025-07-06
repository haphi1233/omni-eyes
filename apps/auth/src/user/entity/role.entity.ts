import { AbstractEntity } from "@app/common";
import { Column, Entity } from "typeorm";

@Entity({ name: "role" })
export class Role extends AbstractEntity<Role> {
  @Column()
  name: string;
}
