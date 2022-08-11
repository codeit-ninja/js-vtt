import { stripTags as i } from "../utils.es.js";
class h {
  constructor(t) {
    this._text = t;
  }
  class(...t) {
    return `<c${t.join(".")}>${this._text}</c>`;
  }
  italics(t) {
    return new RegExp(`<i>${t}</i>`).test(this._text) && (this._text = this._text.replace(`<i>${t}</i>`, t)), this._text = this._text.replace(t, `<i>${t}</i>`), this;
  }
  bold(t) {
    return new RegExp(`<b>${t}</b>`).test(this._text) && (this._text = this._text.replace(`<b>${t}</b>`, t)), this._text = this._text.replace(t, `<b>${t}</b>`), this;
  }
  underline(t) {
    return new RegExp(`<u>${t}</u>`).test(this._text) && (this._text = this._text.replace(`<u>${t}</u>`, t)), this._text = this._text.replace(t, `<u>${t}</u>`), this;
  }
  voice(t, e) {
    return new RegExp(`<v ${e}>${t}</v>`).test(this._text) && (this._text = this._text.replace(`<v ${e}>${t}</v>`, t)), this._text = this._text.replace(t, `<v ${e}>${t}</v>`), this;
  }
  removeTags() {
    return this._text = i(this._text), this;
  }
  get text() {
    return this._text;
  }
  toString(t) {
    return t === "srt" ? this.removeTags().text : this.text;
  }
}
export {
  h as default
};
