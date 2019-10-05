import React, { PureComponent } from "react";
import classNames from "classnames";
import { getDateString } from "../utils";
import { isSaturday, isSunday, getISODay } from "date-fns";
import format from "date-fns/format";
import getDay from "date-fns/get_day";
import isSameYear from "date-fns/is_same_year";
import styles from "./Month.scss";

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
    const monthShort = format(monthDate, "MMM", { locale: locale.locale });
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
    const _today = format(today, "YYYY-MM-DD");
    const _minDate = format(minDate, "YYYY-MM-DD");
    const _maxDate = format(maxDate, "YYYY-MM-DD");

    // Oh the things we do in the name of performance...
    for (let i = 0, len = rows.length; i < len; i++) {
      row = rows[i];
      days = [];
      dow = getDay(new Date(year, month, row[0]));

      for (let k = 0, len = row.length; k < len; k++) {
        day = row[k];

        date = getDateString(year, month, day);
        isToday = date === _today;
        isWeekend = isSunday(date) || isSaturday(date);

        const weekDay = getISODay(date);

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


        isWeekend = days[k] = (
          <DayComponent
            key={`day-${day}`}
            currentYear={currentYear}
            date={date}
            day={day}
            selected={selected}
            isDisabled={isDisabled}
            isToday={isToday}
            isWeekend={isWeekend}
            locale={locale}
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
      locale: { locale },
      monthDate,
      today,
      rows,
      rowHeight,
      showOverlay,
      style,
      theme
    } = this.props;
    const dateFormat = isSameYear(monthDate, today) ? "MMMM" : "MMMM YYYY";

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
