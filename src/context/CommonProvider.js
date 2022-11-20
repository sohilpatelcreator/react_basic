import { useState ,useEffect} from "react";
import CommonContext from "./CommonContext";
import General from '../helpers/General';

function AuthProvider({children}){
  const [isAuthenticated,setAuthenticated]=useState(localStorage.getItem('auth_token')?true:false);
  const [deviceUid,setDeviceUid]=useState(localStorage.getItem('device_uid'));
  const [authToken,setAuthToken]=useState(localStorage.getItem('auth_token'));
  let user_data=localStorage.getItem('user_data');
  const [userData,setUserData]=useState(user_data?JSON.parse(user_data):{});
  const [loading,setLoading]=useState(false);
  const [flashMessage,setFlashMessage]=useState({type:'',message:''});
  const [appData,setAppData]=useState({});

  useEffect(()=>{
    console.log('deviceUid',deviceUid);
    if(deviceUid==null){
      let duid=General.makeId(32);
      setDeviceUid(duid);
      localStorage.setItem('device_uid',duid);
    }
  },[])

  function setAuthData(token,user){
    setAuthToken(token)
    localStorage.setItem('auth_token',token);
    setAuthenticated(token?true:false);
    setUserData(user)
    localStorage.setItem('user_data',JSON.stringify(user));
  }

  function clearAuthData(){
    setAuthToken('');
    localStorage.setItem('auth_token','');
    setUserData({});
    localStorage.setItem('user_data','');
    setAuthenticated(false);
  }

  return (
    <CommonContext.Provider value={{
      isAuthenticated,
      deviceUid,
      authToken,
      userData,
      loading,
      flashMessage,
      appData,
      setAppData,
      setAuthData,
      clearAuthData,
      setLoading,
      setFlashMessage
    }}>{children}</CommonContext.Provider>
  )
}

export default AuthProvider