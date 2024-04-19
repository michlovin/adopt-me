import { useState } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Calender() {
  const [selectedDate, setDate] = useState<Date | null>(null);
  return (
    <>
      <Datepicker
        selected={selectedDate}
        onChange={(date: Date | null) => setDate(date)}
        dateFormat="dd/MMM/yyyy hh:mm"
        showTimeSelect
        timeIntervals={30}
        timeFormat="hh:mm"
      />
    </>
  );
}
