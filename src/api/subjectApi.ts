import BaseApi from './baseApi';

class SubjectApi extends BaseApi {
  constructor() {
    super('subjects');
  }
}

export default new SubjectApi();
