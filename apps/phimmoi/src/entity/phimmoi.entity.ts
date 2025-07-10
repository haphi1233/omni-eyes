import { AbstractEntity } from "@app/common";
import { Column, Entity } from "typeorm";

@Entity()
export class Phimmoi extends AbstractEntity<Phimmoi>  {
  @Column()
  timeStamp: Date;

  @Column()
  authorId: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column()
  type: string;
}
