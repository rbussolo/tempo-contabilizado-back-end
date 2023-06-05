import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { ActivityStats } from "./ActivityStats";
import { User } from "../../users/entities/User";

@Entity("activities")
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  description: string;

  @Column({
    type: 'date', nullable: true, transformer: {
      from(value: string): Date {
        return new Date(value)
      },
      to(value: Date | string): string {
        return typeof value === 'string' ? value : value.toISOString().substring(0,10)
      }
    } })
  date: string | Date;

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

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  created_at: string;
}