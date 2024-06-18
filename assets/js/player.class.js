export default class Player {
  constructor(name, id, mark) {
    this.name = name;
    this.id = id;
    this.mark = mark;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setID(id) {
    this.id = id;
  }

  getID() {
    return this.id;
  }

  setMark(mark) {
    this.mark = mark;
  }

  getMark() {
    return this.mark;
  }
}
