
export default class Query {

    static repositoryGET = 'http://127.0.0.1:5000/repository';

    static taskGET = 'http://127.0.0.1:5000/task';

    static userGET = 'http://127.0.0.1:5000/user';

    static createRepositoryPOST = `http://127.0.0.1:5000/repository/create`;
    
    static createUserPOST = `http://127.0.0.1:5000/user/create`;
    
    static userInfoGET(id){
      return 'http://127.0.0.1:5000/user/' + id;
    }
    static userUpdatePUT(id){
      return 'http://127.0.0.1:5000/user/' +  id  +'/update';
    }
    static userDeleteDELETE(id){
      return 'http://127.0.0.1:5000/user/' +  id  +'/delete';
    }

    static repositoryDeleteDELETE(id){
      return 'http://127.0.0.1:5000/repository/' +  id  +'/delete';
    }
    static repositoryUpdatePUT(id){
      return 'http://127.0.0.1:5000/repository/' +  id  +'/update';
    }

    static taskDetailGET(id) {
      return 'http://127.0.0.1:5000/task/' + id;
    }


  }

