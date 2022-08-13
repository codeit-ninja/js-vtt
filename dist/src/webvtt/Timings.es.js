import { toSrtTimingString, toVttTimingString } from "../utils.es.js";
import isArray from "../../node_modules/lodash-es/isArray.es.js";
class Timings {
  constructor(t) {
    this.segment = t;
  }
  shift(t) {
    return t < 0 ? this.run({ startTime: (t / 1e3).toString(), endTime: (t / 1e3).toString() }) : this.run({ startTime: "+" + (t / 1e3).toString(), endTime: "+" + (t / 1e3).toString() });
  }
  shiftStart(t) {
    return t < 0 ? this.run({ startTime: (t / 1e3).toString() }) : this.run({ startTime: "+" + (t / 1e3).toString() });
  }
  shiftEnd(t) {
    return t < 0 ? this.run({ endTime: (t / 1e3).toString() }) : this.run({ endTime: "+" + (t / 1e3).toString() });
  }
  resync(t, i) {
    this.run({
      startTime: "*" + (t / i).toString(),
      endTime: "*" + (t / i).toString()
    });
  }
  toString(t) {
    return isArray(this.segment) ? this.segment.map(
      (i) => t?.toLowerCase() === "srt" ? toSrtTimingString(i.startTime, i.endTime) : toVttTimingString(i.startTime, i.endTime)
    ) : t?.toLowerCase() === "srt" ? toSrtTimingString(this.segment.startTime, this.segment.endTime) : toVttTimingString(this.segment.startTime, this.segment.endTime);
  }
  update(timings, segment) {
    return !timings.startTime && !timings.endTime ? this.segment : (timings.startTime && segment.setStartTime(eval(segment.startTime + timings.startTime)), timings.endTime && segment.setEndTime(eval(segment.endTime + timings.endTime)), segment);
  }
  updateAll(t, i) {
    return i.forEach((e) => this.update.call(null, t, e)), i;
  }
  run(t) {
    return isArray(this.segment) ? this.updateAll(t, this.segment) : this.update(t, this.segment);
  }
}
export {
  Timings as default
};
