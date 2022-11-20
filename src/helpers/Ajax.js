import axios from "axios"
import AppConfig from "../AppConfig"
import QueryString from "qs";
export const Ajax={
    postWithProgress:function(url,data,progressCallBack){
        return axios.post(AppConfig.API_URL+url, data, {
            onUploadProgress: progressEvent => {
              let percentComplete = progressEvent.loaded / progressEvent.total
              percentComplete = parseInt(percentComplete * 100);
              console.log(percentComplete);
              progressCallBack(percentComplete);
            }
        });
    },
    
    
    post:function(url,data,callBack){
        data.api_key=AppConfig.API_KEY;
        console.log(data);
        data.device_uid=localStorage.getItem('device_uid');
        data.auth_token=localStorage.getItem('auth_token');
        data.device_type=AppConfig.API_DEVICE_TYPE;
        data=QueryString.stringify(data);
        console.log(data);
        axios.post(AppConfig.API_URL+url,data,{
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
        }).then(response=>{
            callBack(response.data);
        }).catch(e=>{
            console.log(e);
            callBack({status:0,message:'Something went Wrong'});
        });
    },
    
}