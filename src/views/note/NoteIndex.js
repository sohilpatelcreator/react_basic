import { Link } from "react-router-dom"
import DataTable from "../../components/datatable/DataTable";
import AppConfig from "../../AppConfig";

export default function NoteIndex() {
    let title = 'Note List';
    function actionTemplate(row){
        return <div>
            <Link to={`/note/view?id=${row.id}`}>View</Link>
        </div>
    }
    let dataTableSetting={
        url:AppConfig.API_URL+'note/list',
        columns:[
            {field: "id",title:'#',responsivePriority: 6},
            {field: "title",title:'Title',responsivePriority: 1},
            {field: "updated_at",title:'Date',type:'date',responsivePriority: 5},
            {field: "action",title:'',template:actionTemplate,order: false,filter:false,responsivePriority: 2}
        ],
        order: [{field:'id',dir:"desc" }],
        limit:10,
    }
    console.log('render NoteIndex');
    return (
            <div>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>{title}</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active">{title}</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="card card-default color-palette-box">
                    <div className="card-header">
                        <h3 className="card-title">
                            {title}
                        </h3>
                        <Link to="/note/create" className="btn btn-primary pull-right"><i className="fa fa-plus"></i> create</Link>
                    </div>
                    <div className="card-body">
                        <DataTable setting={dataTableSetting}></DataTable>
                    </div>
                </div>
            </div>
    )
}