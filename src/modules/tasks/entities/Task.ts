import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { TaskStats } from "./TaskStats";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  startTime: string;

  @Column({ nullable: true })
  stopTime: string;

  @Column({ nullable: true })
  duration: number;

  @Column({
    type: "enum",
    enum: TaskStats,
    default: TaskStats.InProgress,
    nullable: true
  })
  stats: string;

  @CreateDateColumn()
  created_at: string;
}