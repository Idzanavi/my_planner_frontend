import {describe, expect, test} from '@jest/globals';
import {addDays, dateFormat, extractColor, weekNo, weekStart, makeArray2D, dateFromWeekDayNo, buildTimeLabel} from '../common'


it('addDays adds 0 correctly', async () => {
  let date = addDays("2000-04-07", 0);
  expect(date.getFullYear()).toBe(2000);
  expect(date.getMonth()).toBe(3);
  expect(date.getDate()).toBe(7);
})

it('addDays adds 1 correctly', async () => {
  let date = addDays("2000-04-07", 1);
  expect(date.getFullYear()).toBe(2000);
  expect(date.getMonth()).toBe(3);
  expect(date.getDate()).toBe(8);
})

it('addDays adds -1 correctly', async () => {
  let date = addDays("2000-04-07", -1);
  expect(date.getFullYear()).toBe(2000);
  expect(date.getMonth()).toBe(3);
  expect(date.getDate()).toBe(6);
})

it('addDays adds 1234 correctly', async () => {
  let date = addDays("2000-04-07", 1234);
  expect(date.getFullYear()).toBe(2003);
  expect(date.getMonth()).toBe(7);
  expect(date.getDate()).toBe(24);
})

it('dateFormat correct', async () => {
  let date = new Date("2000-04-07");
  expect(dateFormat(date)).toBe("2000-04-07");
})

it('extractColor (str) correct', async () => {
  expect(extractColor("#FFFFAA")).toBe("#FFFFAA");
})

it('extractColor (color) correct', async () => {
  expect(extractColor({hex: "#CCCCBB"})).toBe("#CCCCBB");
})

it('weekNo correct 1', async () => {
  expect(weekNo(new Date("2001-03-04"))).toBe(61);
})

it('weekNo correct 2', async () => {
  expect(weekNo(new Date("2001-02-26"))).toBe(61);
})

it('weekNo correct 3', async () => {
  expect(weekNo(new Date("2001-02-25"))).toBe(60);
})

it('weekStart correct', async () => {
  let date = weekStart(61);
  expect(date.getFullYear()).toBe(2001);
  expect(date.getMonth()).toBe(1);
  expect(date.getDate()).toBe(26);
})

it('makeArray2D correct (empty)', async () => {
  let data = makeArray2D(0, 0);
  expect(data).toHaveLength(0);
})

it('makeArray2D correct (1, 1)', async () => {
  let data = makeArray2D(1, 1);
  expect(data).toHaveLength(1);
  let data0 = data[0];
  expect(data0).toHaveLength(1);
  expect(data0[0]).toBe(null);
})

it('makeArray2D correct (1, 1) val', async () => {
  let data = makeArray2D(1, 1, 1234);
  expect(data).toHaveLength(1);
  let data0 = data[0];
  expect(data0).toHaveLength(1);
  expect(data0[0]).toBe(1234);
})

it('makeArray2D correct (3, 2)', async () => {
  let data = makeArray2D(3, 2);
  expect(data).toHaveLength(3);
  let data0 = data[0];
  let data1 = data[1];
  let data2 = data[2];
  expect(data0).toHaveLength(2);
  expect(data1).toHaveLength(2);
  expect(data2).toHaveLength(2);
  expect(data0[0]).toBe(null);
  expect(data0[1]).toBe(null);
  expect(data1[0]).toBe(null);
  expect(data1[1]).toBe(null);
  expect(data2[0]).toBe(null);
  expect(data2[1]).toBe(null);
})

it('makeArray2D correct (3, 2) val', async () => {
  let data = makeArray2D(3, 2, 100);
  expect(data).toHaveLength(3);
  let data0 = data[0];
  let data1 = data[1];
  let data2 = data[2];
  expect(data0).toHaveLength(2);
  expect(data1).toHaveLength(2);
  expect(data2).toHaveLength(2);
  expect(data0[0]).toBe(100);
  expect(data0[1]).toBe(100);
  expect(data1[0]).toBe(100);
  expect(data1[1]).toBe(100);
  expect(data2[0]).toBe(100);
  expect(data2[1]).toBe(100);
})

it('dateFromWeekDayNo correct (0, 0)', async () => {
  expect(dateFromWeekDayNo(0, 0)).toBe('1999-12-27');
})

it('dateFromWeekDayNo correct (0, 3)', async () => {
  expect(dateFromWeekDayNo(0, 3)).toBe('1999-12-30');
})

it('dateFromWeekDayNo correct (1, 0)', async () => {
  expect(dateFromWeekDayNo(1, 0)).toBe('2000-01-03');
})

it('dateFromWeekDayNo correct (1, 5)', async () => {
  expect(dateFromWeekDayNo(1, 5)).toBe('2000-01-08');
})

it('dateFromWeekDayNo correct (10, 4)', async () => {
  expect(dateFromWeekDayNo(10, 4)).toBe('2000-03-10');
})

it('dateFromWeekDayNo correct (1234, 6)', async () => {
  expect(dateFromWeekDayNo(1234, 6)).toBe('2023-08-27');
})

it('buildTimeLabel correct (0)', async () => {
  expect(buildTimeLabel(0)).toBe('8:00 - 9:00');
})

it('buildTimeLabel correct (1)', async () => {
  expect(buildTimeLabel(1)).toBe('9:00 - 10:00');
})

it('buildTimeLabel correct (5)', async () => {
  expect(buildTimeLabel(5)).toBe('13:00 - 14:00');
})

it('buildTimeLabel correct (15)', async () => {
  expect(buildTimeLabel(15)).toBe('23:00 - 24:00');
})