
export default class Query {

    static repositoryGET = 'http://127.0.0.1:5000/repository';
    static taskGET = 'http://127.0.0.1:5000/task';
    static userGET = 'http://127.0.0.1:5000/user';
    static createRepositoryPOST = `http://127.0.0.1:5000/repository/create`;
    static createUserPOST = `http://127.0.0.1:5000/user/create`;

    static taskDetailGET(id) {
      return 'http://127.0.0.1:5000/task/' + id;
    }

  }

