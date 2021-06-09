/**
 * Schema class object
 *
 * @export
 * @class Schema
 */
class Schema {
  constructor() {
    this.data = {};
  }
  set(data) {
    this.data = data;
  }
}
const schema  = new Schema();
export default schema;
