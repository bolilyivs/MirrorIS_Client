import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

export default class Query {

    static serverName = "http://127.0.0.1:5000"

    static repositoryGET = Query.serverName + '/repository';

    static taskGET = Query.serverName + '/task';

    static userGET = Query.serverName + '/user';
    
    static userGetGroupGET = Query.serverName + '/user/check_group';

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

    static taskTotalPages(){
      return Query.serverName + '/task/count';
    }

    static taskListGet(offset, limit){
      return Query.serverName + '/task?offset=' + offset + "&limit=" + limit;
    }

    static repositoryTotalPages(){
      return Query.serverName + '/repository/count';
    }

    static repositoryListGet(offset, limit){
      return Query.serverName + '/repository?offset=' + offset + "&limit=" + limit;
    }

    static userTotalPages(){
      return Query.serverName + '/user/count';
    }

    static userListGet(offset, limit){
      return Query.serverName + '/user?offset=' + offset + "&limit=" + limit;
    }

  }

