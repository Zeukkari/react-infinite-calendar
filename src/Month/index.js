import React, { PureComponent } from "react";
import classNames from "classnames";
import { getDateString, getWeeksInMonth } from "../utils";
import { isSaturday, isSunday, getISODay, parseISO, getWeekOfMonth, endOfMonth, parse, differenceInCalendarWeeks, startOfYear } from "date-fns";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import isSameYear from "date-fns/isSameYear";
import * as defaultLocale from "date-fns/locale/fi"
import styles from "./Month.scss";
import defaultTheme from '../utils/defaultTheme';

export default class Month extends PureComponent {
  renderRows() {
    const {
      dayClassObj,
      dateClassObj,
      DayComponent,
      disabledDates,
      disabledDays,
      monthDate,
      locale,
      maxDate,
      minDate,
      rowHeight,
      rows,
      selected,
      today,
      theme,
      passThrough
    } = this.props;
    const currentYear = today.getFullYear();
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();

    const monthShort = format(Date.parse(monthDate), "MMM", { locale: defaultLocale.default });
    const monthRows = [];
    let day = 0;
    let isDisabled = false;
    let isToday = false;
    let isWeekend = false;
    let date, days, dow, row;

    /*
    console.log("props: ", this.props)
    console.log("dateClassObj: ", dateClassObj);
    console.log("dayClassObj: ", dayClassObj);
    */

    // Used for faster comparisons
    const _today = format(today, "yyyy-MM-dd");
    const _minDate = format(minDate, "yyyy-MM-dd");
    const _maxDate = format(maxDate, "yyyy-MM-dd");

    // Oh the things we do in the name of performance...

    for (let i = 0, len = rows.length; i < len; i++) {
      row = rows[i];
      days = [];
      dow = getDay(new Date(year, month, row[0]));

      for (let k = 0, len = row.length; k < len; k++) {
        day = row[k];

        date = getDateString(year, month, day);
        isToday = date === _today;

        const weekDay = parseISO(date);

        isDisabled =
          (minDate && date < _minDate) ||
          (maxDate && date > _maxDate) ||
          (disabledDays &&
            disabledDays.length &&
            disabledDays.indexOf(dow) !== -1) ||
          (disabledDates &&
            disabledDates.length &&
            disabledDates.indexOf(date) !== -1);

            /*
        console.group("Day component")
        console.log("DayComponent: ", DayComponent)
        console.log("key: ", `day-${day}`)
        console.log("currentYear: ", currentYear)
        console.log("date: ", date)
        console.log("day: ", day)
        console.log("selected: ", selected)
        console.log("isDisabled: ", isDisabled)
        console.log("isToday: ", isToday)
        console.log("isWeekend: ", isWeekend)
        console.log("locale: ", locale)
        console.log("month: ", month)
        console.log("monthShort: ", monthShort)
        console.log("theme: ", theme)
        console.log("year: ", year)
        console.groupEnd();
        */
        // className={{/*classNames(dayClassObj[date], dateClassObj[date])*/}}
        const customDateStyle = dateClassObj && dateClassObj[date];
        // console.log("dayClassObj: ", dayClassObj)
        const customDayStyle = dayClassObj && dayClassObj[weekDay];

        /*
        console.log("dateClassObj: ", dateClassObj);
        console.log("dayClassObj: ", dayClassObj);
        console.log("date, weekDay, customDateStyle, customDayStyle: ", date, weekDay, customDateStyle, customDayStyle);
        */

        // console.log(customDayStyle)

        const classes = classNames(customDateStyle, customDayStyle);


        console.log("classes: ", classes)
        // console.log("locale: ", locale.locale.default);

         days[k] = (
          <DayComponent
            key={`day-${day}`}
            currentYear={currentYear}
            date={date}
            day={day}
            selected={selected}
            isDisabled={isDisabled}
            isToday={isToday}
            locale={locale.default}
            month={month}
            monthShort={monthShort}
            theme={theme}
            year={year}
            className={classes}
            {...(passThrough ? { ...passThrough.Day } : undefined)}
					/>
				);

        dow += 1;
      }
      monthRows[i] = (

        <ul
          key={`Row-${i}`}
          className={classNames(styles.row, {
            [styles.partial]: row.length !== 7
          })}
          role="row"
          aria-label={`Week ${i + 1}`}
        >
          {days}
        </ul>


      );
    }
    return monthRows;
  }

  render() {
    const {
      monthDate,
      today,
      rows,
      rowHeight,
      showOverlay,
      style,
      theme
    } = this.props;
    console.log("this.props: ", this.props)
    const locale = this.props.locale.default;

    const dateFormat = isSameYear(monthDate, today) ? "MMMM" : "MMMM yyyy";

    const myDate = Date.parse(monthDate, 'yyyy-MM-dd', new Date());
    console.log("monthDate: ", myDate);

    // const weeksInMonth = getWeeksInMonth(myDate);
    // console.log("weeksInMonth: ", weeksInMonth);


    const foo = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);

    console.log("foo: ", foo)
    const weeksInMonth = getWeeksInMonth(foo);
    console.log("weeksInMonth: ", weeksInMonth)
    const januaryFirst = startOfYear(myDate);
    console.log("januryFirst: ", januaryFirst);
    const weekNumber = differenceInCalendarWeeks(myDate, januaryFirst);


    const endWeek = getWeekOfMonth
    return (
      <div
        className={styles.root}
        style={{ ...style, lineHeight: `${rowHeight}px` }}
      >

        <div className={styles.rows}>



          {this.renderRows()}
          {showOverlay && (

            <label
              className={classNames(styles.label, {
                [styles.partialFirstRow]: rows[0].length !== 7
              })}
              style={{ backgroundColor: theme.overlayColor }}
            >
              <span>{format(monthDate, dateFormat, { locale })}</span>
            </label>
          )}
        </div>
      </div>
    );
  }
}
