import { Between } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { Calendar } from "../../entities/Calendar";


interface IDay {
  day: number;
  date: Date;
  currentMonth: boolean;
  calendar?: Calendar;
}

interface ICalendar {
  weeks: [IDay[]];
}

export class ListCalendarService {
  async execute({ user_id, date_initial, date_final }): Promise<ICalendar> {
    const repo = AppDataSource.getRepository(Calendar);
    
    const calendars = await repo.find({ where: { user_id, date: Between(date_initial, date_final) }, order: { date: "ASC" } });
    
    const calendar: ICalendar = {
      weeks: [[]]
    }
    
    const date = new Date(date_initial);
    const lastDayOfWeek = 6;
    const currentMonth = date.getMonth();
    
    let week = 0;

    // Volta para o ultimo dia do mês anterior
    date.setDate(0);

    // Verifica se não é sabado
    if (date.getDay() < 6) {
      const lastDayOfPreviewMonth = date.getDate();
      date.setDate(date.getDate() - date.getDay());
      const lessDayOfPreviewMonth = date.getDate();

      for (let i = lessDayOfPreviewMonth; i <= lastDayOfPreviewMonth; i++) {
        const day: IDay = {
          currentMonth: false,
          date: new Date(date),
          day: date.getDate()
        }

        calendar.weeks[week].push(day);

        // Vai para o proximo dia
        date.setDate(date.getDate() + 1);
      }
    } else {
      // Apenas avança e vai para o proximo mês
      date.setDate(date.getDate() + 1);
    }

    // Agora volta para o mês atual e começa adicionar os dias de acordo com a semana
    while (week < 6) {
      const currentDayOfWeek = date.getDay();

      for (let i = currentDayOfWeek; i <= lastDayOfWeek; i++) {
        let c: Calendar = undefined;
        
        for (let i = 0; i < calendars.length; i++) {
          const d = new Date(calendars[i].date);

          if (d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear()) {
            c = calendars[i];
          }
        }

        const day: IDay = {
          currentMonth: date.getMonth() === currentMonth,
          calendar: c,
          date: new Date(date),
          day: date.getDate()
        }

        calendar.weeks[week].push(day);

        // Vai para o proximo dia
        date.setDate(date.getDate() + 1);
      }

      if (week < 6) {
        week += 1;
        calendar.weeks.push([]);
      }
    }
    
    return calendar;
  }
}