// here we have some helper functions used throughout the label tab
// these functions are being gradually migrated out of services.js

import i18next from "i18next";
import moment from "moment";
import { DateTime } from "luxon";

type MotionType = {
  name: string,
  icon: string,
  color: string
}
const MotionTypes: {[k: string]: MotionType} = {
  IN_VEHICLE: { name: "IN_VEHICLE", icon: "speedometer", color: "purple" },
  ON_FOOT: { name: "ON_FOOT", icon: "walk", color: "brown" },
  BICYCLING: { name: "BICYCLING", icon: "bike", color: "green" },
  UNKNOWN: { name: "UNKNOWN", icon: "help", color: "orange" },
  WALKING: { name: "WALKING", icon: "walk", color: "brown" },
  CAR: { name: "CAR", icon: "car", color: "red" },
  AIR_OR_HSR: { name: "AIR_OR_HSR", icon: "airplane", color: "red" },
  // based on OSM routes/tags:
  BUS: { name: "BUS", icon: "bus-side", color: "red" },
  LIGHT_RAIL: { name: "LIGHT_RAIL", icon: "train-car-passenger", color: "red" },
  TRAIN: { name: "TRAIN", icon: "train-car-passenger", color: "red" },
  TRAM: { name: "TRAM", icon: "fas fa-tram", color: "red" },
  SUBWAY: { name: "SUBWAY", icon: "subway-variant", color: "red" },
  FERRY: { name: "FERRY", icon: "ferry", color: "red" },
  TROLLEYBUS: { name: "TROLLEYBUS", icon: "bus-side", color: "red" },
  UNPROCESSED: { name: "UNPROCESSED", icon: "help", color: "orange" }
}

type MotionTypeKey = keyof typeof MotionTypes;
/**
 * @param motionName A string like "WALKING" or "MotionTypes.WALKING"
 * @returns A MotionType object containing the name, icon, and color of the motion type
 */
export function motionTypeOf(motionName: MotionTypeKey | `MotionTypes.${MotionTypeKey}`) {
  let key = ('' + motionName).toUpperCase();
  key = key.split(".").pop(); // if "MotionTypes.WALKING", then just take "WALKING"
  return MotionTypes[motionName] || MotionTypes.UNKNOWN;
}

/**
 * @param beginFmtTime An ISO 8601 formatted timestamp (with timezone)
 * @param endTs An ISO 8601 formatted timestamp (with timezone)
 * @returns true if the start and end timestamps fall on different days
 * @example isMultiDay("2023-07-13T00:00:00-07:00", "2023-07-14T00:00:00-07:00") => true
 */
export function isMultiDay(beginFmtTime: string, endFmtTime: string) {
  if (!beginFmtTime || !endFmtTime) return false;
  return moment.parseZone(beginFmtTime).format('YYYYMMDD') != moment.parseZone(endFmtTime).format('YYYYMMDD');
}

/**
 * @param beginFmtTime An ISO 8601 formatted timestamp (with timezone)
 * @param endTs An ISO 8601 formatted timestamp (with timezone)
 * @returns A formatted range if both params are defined, one formatted date if only one is defined
 * @example getFormattedDate("2023-07-14T00:00:00-07:00") => "Fri, Jul 14, 2023"
 */
export function getFormattedDate(beginFmtTime: string, endFmtTime?: string) {
  if (!beginFmtTime && !endFmtTime) return;
  if (isMultiDay(beginFmtTime, endFmtTime)) {
    return `${getFormattedDate(beginFmtTime)} - ${getFormattedDate(endFmtTime)}`;
  }
  // only one day given, or both are the same day
  const t = moment.parseZone(beginFmtTime || endFmtTime);
  // We use ddd LL to get Wed, May 3, 2023 or equivalent
  // LL only has the date, month and year
  // LLLL has the day of the week, but also the time
  return t.format('ddd LL');
}

/**
 * @param beginFmtTime An ISO 8601 formatted timestamp (with timezone)
 * @param endTs An ISO 8601 formatted timestamp (with timezone)
 * @returns A formatted range if both params are defined, one formatted date if only one is defined
 * @example getFormattedDate("2023-07-14T00:00:00-07:00") => "Fri, Jul 14"
 */
export function getFormattedDateAbbr(beginFmtTime: string, endFmtTime?: string) {
  if (!beginFmtTime && !endFmtTime) return;
  if (isMultiDay(beginFmtTime, endFmtTime)) {
    return `${getFormattedDateAbbr(beginFmtTime)} - ${getFormattedDateAbbr(endFmtTime)}`;
  }
  // only one day given, or both are the same day
  const dt = DateTime.fromISO(beginFmtTime || endFmtTime, { setZone: true });
  return dt.toLocaleString({ weekday: 'short', month: 'short', day: 'numeric' });
}

/**
 * @param beginFmtTime An ISO 8601 formatted timestamp (with timezone)
 * @param endFmtTime An ISO 8601 formatted timestamp (with timezone)
 * @returns A human-readable, approximate time range, e.g. "2 hours"
 */
export function getFormattedTimeRange(beginFmtTime: string, endFmtTime: string) {
  if (!beginFmtTime || !endFmtTime) return;
  const beginMoment = moment.parseZone(beginFmtTime);
  const endMoment = moment.parseZone(endFmtTime);
  return endMoment.to(beginMoment, true);
};

// the rest is TODO, still in services.js
