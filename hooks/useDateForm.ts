import React from "react";
import { getNumbersFromString } from "../functions/functions";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

interface DateProps {
  month: string;
  monthIndex: number;
  year: number;
  firstWeekDay: number;
  voidDays: number[];
  lastMonthDay: number;
  days: number[];
  weekDays: string[];
}

const getDateProps = (date: Date): DateProps => {
  const month = months[date.getMonth()];
  const lastMonthDate = new Date(
    date.getMonth() === 11 ? date.getFullYear() + 1 : date.getFullYear(),
    date.getMonth() === 11 ? 0 : date.getMonth() + 1,
    0
  );

  const firstMonthDate = new Date(date.getFullYear(), date.getMonth(), 1);

  const lastMonthDay = lastMonthDate.getDate();

  const days = new Array(lastMonthDay).fill(1).map((d, i) => d + i);

  return {
    days,
    lastMonthDay,
    firstWeekDay: firstMonthDate.getDay(),
    voidDays: new Array(firstMonthDate.getDay()).fill(0),
    month,
    monthIndex: date.getMonth(),
    year: date.getFullYear(),
    weekDays,
  };
};

const getPreviousMonthDate = (date: Date): Date => {
  const previousMonthDate = new Date(
    date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear(),
    date.getMonth() === 0 ? 11 : date.getMonth() - 1,
    1
  );

  return previousMonthDate;
};

const getNextMonthDate = (date: Date): Date => {
  const nextMonthDate = new Date(
    date.getMonth() === 11 ? date.getFullYear() + 1 : date.getFullYear(),
    date.getMonth() === 11 ? 0 : date.getMonth() + 1,
    1
  );

  return nextMonthDate;
};

const formatDayMonth = (dayOrMonth: number): string => {
  return (dayOrMonth < 10 ? "0" : "") + dayOrMonth.toString();
};

const formatDateString = (date: Date): string => {
  return (
    formatDayMonth(date.getDate()) +
    "/" +
    formatDayMonth(date.getMonth() + 1) +
    "/" +
    formatDayMonth(date.getFullYear())
  );
};

interface UseDateProps {
  value: string;
  onChange: (e) => void;
  currentYear: number;
  dateProps: DateProps[];
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  setNewDate: (day: number) => void;
}

const useDateForm = (defaultDate?: Date): UseDateProps => {
  const [date, setDate] = React.useState(defaultDate ?? new Date());

  const [value, setValue] = React.useState(date && formatDateString(date));

  const getDatePropsArray = (date: Date): DateProps[] => {
    if (!date) {
      return null;
    }
    return [
      getDateProps(getPreviousMonthDate(date)),
      getDateProps(date),
      getDateProps(getNextMonthDate(date)),
    ];
  };

  const [dateProps, setDateProps] = React.useState<DateProps[]>(
    date && getDatePropsArray(date)
  );

  const goToNextMonth = () => {
    const nextMonth = getNextMonthDate(date);
    setDate(nextMonth);
    setDateProps(getDatePropsArray(nextMonth));
  };

  const goToPreviousMonth = () => {
    const previousMonth = getPreviousMonthDate(date);
    setDate(previousMonth);
    setDateProps(getDatePropsArray(previousMonth));
  };

  const getFormattedDate = (dateStr: string): string => {
    dateStr = getNumbersFromString(dateStr.substring(0, 10));
    dateStr =
      dateStr.length >= 3
        ? dateStr.substring(0, 2) + "/" + dateStr.substring(2)
        : dateStr;
    dateStr =
      dateStr.length >= 6
        ? dateStr.substring(0, 5) + "/" + dateStr.substring(5)
        : dateStr;

    return dateStr;
  };

  const setNewDate = (day: number) => {
    const isoDate = date.toISOString().substring(0, 8) + formatDayMonth(day);
    console.log(isoDate);
    const localDate =
      isoDate.substring(8) + isoDate.substring(5, 7) + isoDate.substring(0, 4);
    setValue(getFormattedDate(isoDate));
    setDate(new Date(isoDate));
    setDateProps(getDatePropsArray(new Date(isoDate)));
    setValue(getFormattedDate(localDate));
  };

  const onChange = (e) => {
    const date = getFormattedDate(e.target.value);
    setValue(date);

    if (date.length === 10) {
      const onlyNumbersDate = getNumbersFromString(date);
      const isoDate =
        onlyNumbersDate.substring(4) +
        "-" +
        onlyNumbersDate.substring(2, 4) +
        "-" +
        onlyNumbersDate.substring(0, 2);

      var timestamp = Date.parse(isoDate);

      if (isNaN(timestamp) == false) {
        setDate(new Date(timestamp));
        console.log(new Date(timestamp));
        setDateProps(getDatePropsArray(new Date(timestamp)));
      } else {
        setValue("");
      }
    }
  };

  return {
    value,
    onChange,
    currentYear: new Date().getFullYear(),
    dateProps,
    goToPreviousMonth,
    goToNextMonth,
    setNewDate,
  };
};

export default useDateForm;
