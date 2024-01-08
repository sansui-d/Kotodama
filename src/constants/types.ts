import { BLOODLINE_ORIGIN, RISK_LEVEL, USER } from './enum'

export interface ICardProps {
    index?: number;
    name?: string;
    blood?: BLOODLINE_ORIGIN;
    risk?: RISK_LEVEL;
    finder?: USER;
    user?: USER;
    saying?: string;
    introduction?: string;
    isEmpyt?: boolean;
}