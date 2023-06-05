import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { TaskStats } from "./TaskStats";
import { Activity } from "../../activities/entities/Activity";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activity_id: number;

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

  @ManyToOne(() => Activity)
  @JoinColumn({ name: "activity_id" })
  activity: Activity;

  @CreateDateColumn()
  created_at: string;
}