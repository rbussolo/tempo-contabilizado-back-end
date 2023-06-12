import { Router } from "express";
import { ensuredAuthenticad } from "../middlewares/EnsureAuthenticated";
import { ListCalendarController } from '../modules/calendar/useCases/list/ListCalendarController';

const calendarRoutes = Router();

const wrap = fn => (...args) => fn(...args).catch(args[2]);

const listCalendarController = new ListCalendarController();

calendarRoutes.get("/", ensuredAuthenticad, wrap(listCalendarController.handle));

export { calendarRoutes };
