import moment from 'moment';

export interface DateValue {
  date: string;
}

export function dayName(dateValue: string): string {
  const date = moment(dateValue, 'YYYY-MM-DD');
  return date.format('dddd');
}

export function month(dateValue: string): string {
  const date = moment(dateValue, 'YYYY-MM-DD');
  return date.format('MM');
}

export function day(dateValue: string): string {
  const date = moment(dateValue, 'YYYY-MM-DD');
  return date.format('DD');
}

export function year(dateValue: string): string {
  const date = moment(dateValue, 'YYYY-MM-DD');
  return date.format('YYYY');
}

export function hourMinute(dateValue: string): string {
  const date = moment(dateValue, 'YYYY-MM-DD hh:mm');
  return date.format('hh:mm');
}
