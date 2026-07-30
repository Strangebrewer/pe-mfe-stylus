import BaseApi from './baseApi';

class TextApi extends BaseApi {
  constructor() {
    super('texts');
  }
}

export default new TextApi();
