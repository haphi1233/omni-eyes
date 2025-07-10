import { AbstractEntity } from "@app/common";
import { Column, Entity } from "typeorm";

@Entity()
export class Area extends AbstractEntity<Area> {
  @Column()
  name: string;

  @Column()
  description: string;
}

