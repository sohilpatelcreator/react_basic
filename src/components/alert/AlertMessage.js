import {useContext} from 'react'
import CommonContext from "./../../context/CommonContext";
import AlertMessageWidget from './AlertMessageWidget';

export default function AlertMessage(){
    const {flashMessage,setFlashMessage} =useContext(CommonContext);
    function resetFlashMessage(){
        setFlashMessage({type:'',message:''});
    }
    if(flashMessage.message){
        return (
            <AlertMessageWidget type={flashMessage.type} message={flashMessage.message} reset={resetFlashMessage}></AlertMessageWidget>
        )
    }
}