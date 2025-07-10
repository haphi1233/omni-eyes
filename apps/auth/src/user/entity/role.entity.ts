import { AbstractEntity } from "@app/common";
import { Column, Entity } from "typeorm";

@Entity()
export class Role extends AbstractEntity<Role> {
  @Column({ default: "USER" })
  name: string;
}
