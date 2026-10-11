import React, { useState } from 'react';

import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import BpkCalendar from '@skyscanner/backpack-web/bpk-component-calendar';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';
import { cssModules } from '@skyscanner/backpack-web/bpk-react-utils';

import STYLES from './App.scss';

const getClassName = cssModules(STYLES);

// The Calendar doesn't format dates itself. You pass in functions that turn a
// Date into the strings it displays and reads out to screen readers.
const formatMonth = (date) =>
  date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

const formatDateFull = (date) =>
  date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

// One entry per weekday. `index` follows JS Date.getDay() (0 = Sunday).
// `weekStartsOn={1}` below makes the calendar start the week on Monday.
const daysOfWeek = [
  { name: 'Sunday', nameAbbr: 'Sun', index: 0, isWeekend: true },
  { name: 'Monday', nameAbbr: 'Mon', index: 1, isWeekend: false },
  { name: 'Tuesday', nameAbbr: 'Tue', index: 2, isWeekend: false },
  { name: 'Wednesday', nameAbbr: 'Wed', index: 3, isWeekend: false },
  { name: 'Thursday', nameAbbr: 'Thu', index: 4, isWeekend: false },
  { name: 'Friday', nameAbbr: 'Fri', index: 5, isWeekend: false },
  { name: 'Saturday', nameAbbr: 'Sat', index: 6, isWeekend: true },
];

const App = () => {
  // The date the user has picked, and the month currently being displayed.
  // They are separate: the user can browse other months without selecting.
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  return (
    <div className={getClassName('App')}>
      <header className={getClassName('App__header')}>
        <div className={getClassName('App__header-inner')}>
          <BpkText tagName="h1" textStyle={TEXT_STYLES.heading1}>
            Flight Schedule
          </BpkText>
        </div>
      </header>

      <main className={getClassName('App__main')}>
        <BpkCalendar
          id="flight-schedule-calendar"
          daysOfWeek={daysOfWeek}
          weekStartsOn={1}
          formatDateFull={formatDateFull}
          formatMonth={formatMonth}
          changeMonthLabel="Change month"
          nextMonthLabel="Next month"
          previousMonthLabel="Previous month"
          month={currentMonth}
          onMonthChange={(event, { month }) => setCurrentMonth(month)}
          onDateSelect={setSelectedDate}
          date={selectedDate}
        />

        <BpkButton onClick={() => {}}>Continue</BpkButton>
      </main>
    </div>
  );
};

export default App;