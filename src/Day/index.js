import React, { PureComponent } from "react";
import classNames from "classnames";
import parse from "date-fns/parse";
import styles from "./Day.scss";

export default class Day extends PureComponent {
  handleClick = () => {
    let { date, isDisabled, onClick } = this.props;

    if (!isDisabled && typeof onClick === "function") {
      onClick(parse(date, 'yyyy-MM-dd', new Date()));
    }
  };

  renderSelection(selectionColor) {
    const {
      day,
      date,
      isToday,
      locale: { todayLabel },
      monthShort,
      theme: { textColor },
      selectionStyle
    } = this.props;

    // console.log("theme: ", theme)

    return (
      <div
        className={styles.selection}
        data-date={date}
        style={{
          backgroundColor: selectionColor,
          color: textColor.active,
          ...selectionStyle
        }}
      >
        <span className={styles.month}>
          {isToday ? todayLabel.short || todayLabel.long : monthShort}
        </span>
        <span className={styles.day}>{day}</span>
      </div>
    );
  }

  render() {
    const {
      className,
      currentYear,
      date,
      day,
      handlers,
      isDisabled,
      isHighlighted,
      isToday,
      isSelected,
      isWeekend,
      monthShort,
      theme,
      year
    } = this.props;
    const { selectionColor, todayColor } = theme;
    // console.log("theme: ", theme)
    let color;

    if (isSelected) {
      color = this.selectionColor =
        typeof selectionColor === "function"
          ? selectionColor(date)
          : selectionColor;
    } else if (isToday) {
      color = todayColor;
    }

    // console.log("className: ", className)

    let styling = classNames(
      styles.root,
      {
        [styles.today]: isToday,
        [styles.highlighted]: isHighlighted,
        [styles.enabled]: !isDisabled,
        [styles.disabled]: isDisabled,
        [styles.selected]: isSelected,
        [styles.weekend]: isWeekend
      },
      styles[className]
    );

    return (
      <li
        style={color ? { color } : null}
        className={styling}
        onClick={this.handleClick}
        data-date={date}
        {...handlers}
      >
        {/*day === 1 && <span>{monthShort}</span>*/}

        {day === 1 && currentYear !== year && (
          <span className={styles.year}>{year}</span>
        )}
        {/*
        {isToday ? <span>{day}</span> : day}
        {isSelected && this.renderSelection()}
        */}
        {day}
      </li>
    );
  }
}
