import { Api } from "./Api";

export let Auth={
    login:function(data,callBack){
        Api.post('site/login',data,callBack);
    },
}