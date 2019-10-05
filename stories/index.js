/* eslint-disable sort-keys */
import React from "react";
import { storiesOf } from "@storybook/react";
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withDateSelection,
  withKeyboardSupport,
  withMultipleDates,
  withRange
} from "../src";

import Header from "../src/Header";
import Day from "../src/Day";
import Month from "../src/Month";
import MonthList from "../src/MonthList";
import Today from "../src/Today";
import Weekdays from "../src/Weekdays";
import Years from "../src/Years";

import colors from "../src/_variables.scss";

// Date manipulation utils
import addDays from "date-fns/add_days";
import addMonths from "date-fns/add_months";
import endOfMonth from "date-fns/end_of_month";
import format from "date-fns/format";
import isBefore from "date-fns/is_before";
import subMonths from "date-fns/sub_months";

const today = new Date();



storiesOf("Calendar/Original/Default", module)
  .add("Default Configuration", () => <InfiniteCalendar />)
  .add("Initially Selected Date", () => (
    <InfiniteCalendar selected={addDays(today, 5)} />
  ))
  .add("Blank Initial State", () => <InfiniteCalendar selected={null} />)
  .add("Min Date", () => (
    <InfiniteCalendar
      min={subMonths(today, 1)} // Minimum month to render
      minDate={addDays(today, 1)} // Minimum selectable date
      selected={addDays(today, 5)}
    />
  ))
  .add("Max Date", () => (
    <InfiniteCalendar
      max={endOfMonth(addMonths(today, 1))} // Maximum rendered month
      maxDate={today} // Maximum selectable date
    />
  ))
  .add("Disable Specific Dates", () => (
    <InfiniteCalendar
      disabledDates={[-10, -5, -6, 5, 6, 7, 2].map(amount =>
        addDays(today, amount)
      )}
    />
  ))
  .add("Disable Specific Weekdays", () => (
    <InfiniteCalendar disabledDays={[0, 6]} />
  ))
  .add('Assign Custom Classes Specific Dates', () => (
    <InfiniteCalendar dateClasses={[{
      className: "yellowBg",
      dates: [-10, -5, -6, 5, 6, 7, 2].map(amount =>
        addDays(today, amount)
      ),
    },{
      className: "boldText",
      dates: [-10, -7, 2, 5, 6, 10].map(amount =>
        addDays(today, amount)
      )
    }]} />
  ))
  .add('Assign Custom Classes Specific Days', () => (
    <InfiniteCalendar dayClasses={{...{
      "5": "friday",
      "6": "saturday",
      "7": "sunday",
    }}} />
  ));

storiesOf("Calendar/Original/Higher Order Components", module)
  .add("Range selection", () => (
    <InfiniteCalendar
      selected={{
        start: addDays(new Date(), 2),
        end: addDays(new Date(), 17)
      }}
      locale={{
        headerFormat: "MMM Do"
      }}
      Component={withRange(withKeyboardSupport(Calendar))}
    />
  ))
  .add("Multiple date selection", () => {
    return (
      <InfiniteCalendar
        selected={[
          addDays(today, -600),
          addDays(today, -200),
          today,
          addDays(today, 50),
          addDays(today, 400)
        ]}
        interpolateSelection={defaultMultipleDateInterpolation}
        Component={withMultipleDates(withKeyboardSupport(Calendar))}
      />
    );
  })
  .add("Keyboard Support", () => {
    return (
      <InfiniteCalendar
        Component={withDateSelection(withKeyboardSupport(Calendar))}
      />
    );
  });

storiesOf("Calendar/Original/Internationalization", module)
  .add("Locale", () => (
    <InfiniteCalendar
      locale={{
        blank: "Aucune date sélectionnée",
        headerFormat: "dddd, D MMM",
        locale: require("date-fns/locale/fr"),
        todayLabel: {
          long: "Aujourd'hui",
          short: "Auj."
        },
        weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
      }}
    />
  ))
  .add("First Day of the Week", () => (
    <InfiniteCalendar
      locale={{
        weekStartsOn: 1
      }}
    />
  ));

storiesOf("Calendar/Original/Customization", module)
  .add("Theming", () => (
    <InfiniteCalendar
      theme={{
        floatingNav: {
          background: "rgba(105, 74, 228, 0.91)",
          chevron: "#FFA726",
          color: "#FFF"
        },
        headerColor: "rgb(127, 95, 251)",
        selectionColor: "rgb(146, 118, 255)",
        textColor: {
          active: "#FFF",
          default: "#333"
        },
        weekdayColor: "rgb(146, 118, 255)"
      }}
    />
  ))
  .add("Flexible Size", () => (
    <InfiniteCalendar
      width={"94%"}
      height={window.innerHeight - 147}
      rowHeight={70}
    />
  ))
  .add("Select Year First", () => (
    <InfiniteCalendar display={"years"} selected={null} />
  ))
  .add("Dynamic Selection Color", () => (
    <InfiniteCalendar
      selected={addDays(today, -1)}
      theme={{
        selectionColor: date => {
          return isBefore(date, today) ? "#EC6150" : "#559FFF";
        }
      }}
    />
  ));

storiesOf("Calendar/Original/Display Options", module)
  .add("Landscape Layout", () => (
    <InfiniteCalendar
      displayOptions={{
        layout: "landscape"
      }}
      width={600}
      height={350}
    />
  ))
  .add("Disable Header", () => (
    <InfiniteCalendar
      displayOptions={{
        showHeader: false
      }}
    />
  ))
  .add("Disable Header Animation", () => (
    <InfiniteCalendar
      displayOptions={{
        shouldHeaderAnimate: false
      }}
    />
  ))
  .add("Disable Month Overlay", () => (
    <InfiniteCalendar
      displayOptions={{
        showOverlay: false
      }}
    />
  ))
  .add("Disable Floating Today Helper", () => (
    <InfiniteCalendar
      displayOptions={{
        showTodayHelper: false
      }}
    />
  ))
  .add("Hide Months in Year Selection", () => (
    <InfiniteCalendar
      display={"years"}
      displayOptions={{
        showMonthsForYears: false
      }}
    />
  ))
  .add("Hide Weekdays Helper", () => (
    <InfiniteCalendar
      displayOptions={{
        showWeekdays: false
      }}
    />
  ));

storiesOf("Calendar/Original/Events", module)
  .add("On Select", () => (
    <InfiniteCalendar
      onSelect={date =>
        alert(`You selected: ${format(date, "ddd, MMM Do YYYY")}`)
      }
    />
  ))
  .add("On Scroll", () => [
    <label key="label">Check your console logs.</label>,
    <InfiniteCalendar
      key="calendar"
      onScroll={scrollTop =>
        console.info("onScroll() – Scroll top:", scrollTop)
      }
    />
  ]);

const defaultTheme = {
  floatingNav: {
    background: "rgba(105, 74, 228, 0.91)",
    chevron: "#FFA726",
    color: "#fff"
  },
  headerColor: "#FFF",
  selectionColor: "ed6930",
  textColor: {
    active: "#ed6930",
    default: "#0"
  },
  todayColor: "#0",
  weekdayColor: "rgb(146, 118, 255)"
};

const defaultLocale = {
  blank: "Ei valittua päivää",
  headerFormat: "dddd, D MMM",
  locale: require("date-fns/locale/fi"),
  todayLabel: {
    long: "Tänään",
    short: " "
  },
  weekdays: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
  weekStartsOn: 1
};

const onScroll = scrollTop =>
  console.info("onScroll() – Scroll top:", scrollTop);
const onSelect = date =>
  alert(`You selected: ${format(date, "ddd, MMM Do YYYY")}`);

storiesOf("Calendar/TKP", module)
  .add("Default", () => (
    <InfiniteCalendar
      theme={defaultTheme}
      locale={defaultLocale}
      onSelect={onSelect}
    />
  ))
  .add("Landscape", () => (
    <InfiniteCalendar
      theme={defaultTheme}
      locale={defaultLocale}
      onSelect={onSelect}
      selected="2019-10-03"
      displayOptions={{
        layout: "landscape"
      }}
      disabledDays={[]}
      width={"90%"}
      height={window.innerHeight - 147}
      rowHeight={70}
    />
  ))
  .add("Lukittuja päiviä", () => (
    <InfiniteCalendar
      theme={defaultTheme}
      locale={defaultLocale}
      locale={defaultLocale}
      onSelect={onSelect}
      disabledDates={[-10, -5, -6, 5, 6, 7, 2].map(amount =>
        addDays(today, amount)
      )}
    />
  ));

const testRows = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31]
];
const myDay = new Date();

storiesOf("Components/Day", module)
  .add("Default", () => (
    <Day
      currentYear={2019}
      date="019-09-29"
      day={16}
      isSelected={false}
      isDisabled={false}
      isToday={false}
      locale={defaultLocale}
      month={8}
      monthShort="Sep"
      theme={defaultTheme}
      year="2019"
    />
  ))
  .add("Selected", () => (
    <Day
      currentYear={2019}
      date="019-09-29"
      day={16}
      isSelected={true}
      isDisabled={false}
      isToday={false}
      locale={defaultLocale}
      month={8}
      monthShort="Sep"
      theme={defaultTheme}
      year="2019"
    />
  ))
  .add("Disabled", () => (
    <Day
      currentYear={2019}
      date="019-09-29"
      day={16}
      isSelected={false}
      isDisabled={true}
      isToday={false}
      locale={defaultLocale}
      month={8}
      monthShort="Sep"
      theme={defaultTheme}
      year="2019"
    />
  ))
  .add("isToday", () => (
    <Day
      currentYear={2019}
      date="019-09-29"
      day={16}
      isSelected={false}
      isDisabled={false}
      isToday={true}
      locale={defaultLocale}
      month={8}
      monthShort="Sep"
      theme={defaultTheme}
      year="2019"
    />
  ));

storiesOf("Components/Month", module).add("Default", () => (
  <Month
    DayComponent={Day}
    isScrolling={false}
    locale={defaultLocale}
    rows={testRows}
    theme={defaultTheme}
    today={myDay}
    monthDate={myDay}
    rowHeight={56}
    selected="2019-09-29"
    showOverlay={true}
  />
));

storiesOf("Components/Weekdays", module).add("Default", () => (
  <Weekdays
    weekdays={["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"]}
    weekStartsOn={1}
    theme={defaultTheme}
  />
));

storiesOf("Components/Header", module).add("Default", () => (
  <Header
    dateFormat="dddd, D MMM"
    display="days"
    locale={defaultLocale}
    theme={defaultTheme}
    selected="2019-09-29"
  />
));
