import { Injectable } from '@angular/core';
import { DayItem } from '@witon/core/object/website/out/day-item';
import { DatePipe } from '@angular/common';
/**
 * 日期服务
 */
@Injectable({
  providedIn: 'root'
})
export class DateService {
  private datesArray = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  private weekDay = [
    { text: '周日', shortDate: '', 0: '星期天' },
    { text: '周一', shortDate: '', 1: '星期一' },
    { text: '周二', shortDate: '', 2: '星期二' },
    { text: '周三', shortDate: '', 3: '星期三' },
    { text: '周四', shortDate: '', 4: '星期四' },
    { text: '周五', shortDate: '', 5: '星期五' },
    { text: '周六', shortDate: '', 6: '星期六' }
  ];

  constructor(
    private datePipe: DatePipe
  ) { }

  transform(value: any, format?: string, timezone?: string, locale?: string) {
    return this.datePipe.transform(value, format, timezone, locale);
  }

  getWeekDay(): Array<{ text: string, shortDate: string }> {
    return this.weekDay;
  }

  /**
   * 是否为闰年
   * @param year 年 
   * @return `boolean`
   */
  isLeapYear(year: number): boolean {
    return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
  }

  /**
   * 某个月的天数
   * @param year 年
   * @param month 月:`0-11`
   * @return `28|29|30|31`
   */
  getMonthDays(year: number, month: number): Array<DayItem> {
    return Array.from({ length: this.datesArray[month] || (this.isLeapYear(year) ? 29 : 28) }, (_, k) => {
      let dayItem = new DayItem();
      let date = `${year}-${month + 1 > 9 ? month + 1 : '0' + (month + 1)}-${k + 1 > 9 ? k + 1 : '0' + (k + 1)}`;
      let clinicDate = `${date} 00:00:00`;

      dayItem.day = k + 1;
      dayItem.date = date;
      dayItem.clinicDate = clinicDate;

      return dayItem;
    });
  }

  /**
   * 某一天在一周中的索引
   * @param year 年
   * @param month 月:`0-11`
   * @param day 日
   * @return `0-6`
   */
  getDayOfWeek(year: number, month: number, day: number): number {
    return new Date(year, month, day).getDay();
  }

  /**
   * 上个月的天数
   * @param year 年
   * @param month 月:`0-11`
   */
  getPreMonthDays(year: number, month: number): Array<DayItem> {
    if (month === 0) {
      return this.getMonthDays(year - 1, 11);
    } else {
      return this.getMonthDays(year, month - 1);
    }
  }

  /**
   * 下个月的天数
   * @param year 年
   * @param month 月:`0-11`
   * @return `Array<DayItem>`
   */
  getNextMonthDays(year: number, month: number): Array<DayItem> {
    if (month === 11) {
      return this.getMonthDays(year + 1, 0);
    } else {
      return this.getMonthDays(year, month + 1);
    }
  }

  /**
   * 最近一周7天的日期
   * @param year 年
   * @param month 月:`0-11`
   * @param day 日
   * @return `Array<DayItem>`
   */
  getWeekOfDay(year: number, month: number, day: number): Array<DayItem> {
    const indexOfWeek = this.getDayOfWeek(year, month, day);

    // 向前取 indexOfWeek天
    const preArr: Array<DayItem> = [];
    for (let i = indexOfWeek; i > 0; i--) {
      preArr.push(this.setDayItem(new Date(year, month, day), -i));
    }

    // 向后取 7-indexOfWeek天
    const nextArr: Array<DayItem> = [];
    for (let i = 0; i < 7 - indexOfWeek; i++) {
      nextArr.push(this.setDayItem(new Date(year, month, day), i));
    }

    return [...preArr, ...nextArr];
  }

  private setDayItem(iDate: Date, i: number): DayItem {
    iDate.setTime(iDate.getTime() + i * 24 * 60 * 60 * 1000);

    let dayItem = new DayItem();
    let day = iDate.getDate();
    let date = `${iDate.getFullYear()}-${iDate.getMonth() + 1 > 9 ? iDate.getMonth() + 1 : '0' + (iDate.getMonth() + 1)}-${day > 9 ? day : '0' + day}`;
    let clinicDate = `${date} 00:00:00`;
    let shortDate = `${iDate.getMonth() + 1 > 9 ? iDate.getMonth() + 1 : '0' + (iDate.getMonth() + 1)}/${day > 9 ? day : '0' + day}`;

    dayItem.day = day;
    dayItem.date = date;
    dayItem.data = null;
    dayItem.clinicDate = clinicDate;
    dayItem.shortDate = shortDate;

    return dayItem;
  }

  /**
   * 获取给定日期段的日历列表
   * @param startDate `Date`
   * @param endDate `Date`
   */
  getDateTimeRange(startDate: Date, endDate: Date): DayItem[] {
    const result: DayItem[] = [];
    
    while (startDate <= endDate) {
      let dayItem = new DayItem();
      let index = new Date(startDate).getDay();
      dayItem.date = this.transform(startDate, 'yyyy-MM-dd');
      dayItem.week = this.weekDay[index][index];
      dayItem.clinicDate = `${dayItem.date} 00:00:00`;

      startDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

      result.push(dayItem);
    }

    return result;
  }
}
