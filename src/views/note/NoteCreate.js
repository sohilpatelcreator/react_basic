import { Link } from "react-router-dom"
import NoteForm from "./NoteForm";
export default function NoteCreate(){
    let pageTitle='Note Create';
    return (
            <div>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                            <h1>{pageTitle}</h1>
                            </div>
                            <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item"><Link to="/note/index">Note List</Link></li>
                                <li className="breadcrumb-item active">Create</li>
                            </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="card card-default color-palette-box">
                    <div className="card-header">
                        <h3 className="card-title">
                            {pageTitle}
                        </h3>
                    </div>
                    <div className="card-body">
                        <NoteForm></NoteForm>
                    </div>
                </div>
            </div>
    )
}