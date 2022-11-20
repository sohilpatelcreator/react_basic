export default function AlertMessageWidget(prop){
    if(prop.message){
        return (
            <div className={`alert alert-${prop.type} alert-dismissible fade show`} role="alert">
                {prop.message}
                <button type="button" class="close" onClick={()=>prop.reset()}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
}