import { useEffect,useState } from "react";
import { Ajax } from "../../helpers/Ajax";
import { Link } from "react-router-dom"

export default function NoteView(){
    const [data,setData]=useState({id:''});
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log(id);
    useEffect(()=>{
        Ajax.post('note/view',{id:id},function(response){
            if(response.status){
               setData(response.data); 
            }    
        })
    },[id]);
    
    let pageTitle='Note #';
    return (
        <div>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>{pageTitle}{data.id}</h1>
                        </div>
                        <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                            <li className="breadcrumb-item"><Link to="/note/index">Note List</Link></li>
                            <li className="breadcrumb-item active">View</li>
                        </ol>
                        </div>
                    </div>
                </div>
            </section>

            <div className="card" id="ajax-container">
                <div className="card-header">
                    <h3 className="card-title">{pageTitle}{data.id}</h3>
                </div>
                
                <div className="card-body p-0" id="ajax-content">
                    <table className="table table-striped">
                        <tbody>
                            <tr><td><b>Title</b></td><td>{data.title}</td></tr>
                            <tr><td><b>Created At</b></td><td>{data.created_at}</td></tr>
                            <tr><td><b>Updated At</b></td><td>{data.updated_at}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}