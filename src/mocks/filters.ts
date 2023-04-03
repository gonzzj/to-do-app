import { ETaskFilter } from "../types/TaskFilter";

export const filteringMap = {
    [ETaskFilter.ALL]: [true, false],
    [ETaskFilter.ACTIVE]: [false],
    [ETaskFilter.COMPLETED]: [true],
};