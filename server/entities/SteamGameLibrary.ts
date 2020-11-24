import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SteamGameLibrary {
  @PrimaryGeneratedColumn()
  appid!: number;

  @Column()
  name!: string;

  @Column()
  image!: string;
}
