import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "../../users/entities/User";
import { Task } from "../../tasks/entities/Task";
import { CalendarStats } from "./CalendarStats";
import { Activity } from "../../activities/entities/Activity";

@Entity("calendar")
export class Calendar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({
    type: 'date', nullable: true, transformer: {
      from(value: string): Date {
        return new Date(value)
      },
      to(value: Date | string): string {
        return typeof value === 'string' ? value : value.toISOString().substring(0, 10)
      }
    }
  })
  date: string | Date;

  @Column({
    type: "enum",
    enum: CalendarStats,
    default: CalendarStats.NoActivity,
    nullable: true
  })
  stats: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(type => Activity, activity => activity.calendar)
  activities: Activity[];

  @CreateDateColumn()
  created_at: string;
}