
export default class Query {

    static serverName = "http://127.0.0.1:5000"

    static repositoryGET = Query.serverName + '/repository';

    static taskGET = Query.serverName + '/task';

    static userGET = Query.serverName + '/user';

    static createRepositoryPOST = Query.serverName + `/repository/create`;
    
    static createUserPOST = Query.serverName + `/user/create`;
    
    static userInfoGET(id){
      return Query.serverName + '/user/' + id;
    }
    static userUpdatePUT(id){
      return Query.serverName + '/user/' +  id  +'/update';
    }
    static userDeleteDELETE(id){
      return Query.serverName + '/user/' +  id  +'/delete';
    }

    static repositoryInfoGET(id){
      return Query.serverName + '/repository/' + id;
    }
    static repositoryDeleteDELETE(id){
      return Query.serverName + '/repository/' +  id  +'/delete';
    }
    static repositoryUpdatePUT(id){
      return Query.serverName + '/repository/' +  id  +'/update';
    }
    static repositoryRunGET(id){
      return Query.serverName + '/repository/' + id + '/run';
    }
    static repositoryResetGET(id){
      return Query.serverName + '/repository/' + id + '/reset';
    }

    static taskDetailGET(id) {
      return Query.serverName + '/task/' + id;
    }

    static poolGET(){
      return Query.serverName + '/zpool';
    }

  }

