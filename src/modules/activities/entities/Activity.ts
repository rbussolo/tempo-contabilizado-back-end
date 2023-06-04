import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { ActivityStats } from "./ActivityStats";
import { type } from "os";

@Entity("activities")
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({
    type: 'date', nullable: true, transformer: {
      from(value: string): Date {
        return new Date(value)
      },
      to(value: string): string {
        return value
      }
    } })
  date: string;

  @Column({ nullable: true })
  startTime: string;

  @Column({ nullable: true })
  stopTime: string;

  @Column({ nullable: true })
  duration: number;

  @Column({
    type: "enum",
    enum: ActivityStats,
    default: ActivityStats.InProgress,
    nullable: true
  })
  stats: string;

  @Column({ type: "text", array: true, default: [] })
  tags: string[];

  @CreateDateColumn()
  created_at: string;
}