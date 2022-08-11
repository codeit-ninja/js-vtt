import "../../node_modules/lodash/lodash.es.js";
import { toSrtTimingString, toVttTimingString } from "../utils.es.js";
import { l as lodash } from "../../_virtual/lodash.es.js";
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
  resync(t, e) {
    this.run({
      startTime: "*" + (t / e).toString(),
      endTime: "*" + (t / e).toString()
    });
  }
  toString(t) {
    return lodash.exports.isArray(this.segment) ? this.segment.map(
      (e) => t?.toLowerCase() === "srt" ? toSrtTimingString(e.startTime, e.endTime) : toVttTimingString(e.startTime, e.endTime)
    ) : t?.toLowerCase() === "srt" ? toSrtTimingString(this.segment.startTime, this.segment.endTime) : toVttTimingString(this.segment.startTime, this.segment.endTime);
  }
  update(timings, segment) {
    return !timings.startTime && !timings.endTime ? this.segment : (timings.startTime && segment.setStartTime(eval(segment.startTime + timings.startTime)), timings.endTime && segment.setEndTime(eval(segment.endTime + timings.endTime)), segment);
  }
  updateAll(t, e) {
    return e.forEach((i) => this.update.call(null, t, i)), e;
  }
  run(t) {
    return lodash.exports.isArray(this.segment) ? this.updateAll(t, this.segment) : this.update(t, this.segment);
  }
}
export {
  Timings as default
};
