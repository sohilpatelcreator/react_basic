import { useEffect,useState } from "react";
import General from '../../helpers/General';
import { Ajax } from "../../helpers/Ajax";

export default function DataTable(props){
    // console.log(props.setting);
    let tableSetting=props.setting;
    tableSetting.columns=tableSetting.columns.map(function(column,index){
        if(!column.type){
            column.type='text';
        }
        if(typeof column.filter==='undefined'){
            column.filter=true;
        }
        if(typeof column.order==='undefined'){
            column.order=true;
        }
        return column;
    })
    
    let ajaxData={
        limit:tableSetting.limit,
        offset:0,
        order:tableSetting.order,
        filter:{},
        currentPage:1
    }

    const [tableData,setTableData]=useState({
        data:[],
        order:ajaxData.order,                    
        total:0,
        offset:0,
        currentPage:1,
        lastPage:1
    });

    function loadData(){
        console.log('loadData',ajaxData);
        Ajax.post('note/list',ajaxData,function(response){
            if(response.status){
                setTableData({
                    data:response.data.data,
                    order:ajaxData.order,
                    total:response.data.total,
                    offset:ajaxData.offset,
                    currentPage:ajaxData.currentPage,
                    lastPage:Math.ceil(response.data.total/ajaxData.limit)
                })
            }else{
                setTableData({
                    data:[],
                    order:ajaxData.order,
                    total:0,
                    offset:0,
                    currentPage:1,
                    lastPage:1
                })
            }
        })
    }

    useEffect(()=>{
        console.log('DataTable component did mount');        
        loadData();
    },[])


    

    function handleSort(field){
        console.log(field);
        var order=[];
        var exist=false;
        tableData.order.forEach(function(ord){
            if(ord.field===field){
                if(ord.dir==='desc'){
                    order.push({field:field,dir:'asc'});
                }else if(ord.dir==='asc'){
                    order.push({field:field,dir:''});
                }else{
                    order.push({field:field,dir:'desc'});
                }
                exist=true;
            }else{
                order.push(ord);
            }
        });
        if(!exist){
            order.push({field:field,dir:'desc'});
        }
        ajaxData.order=order;
        loadData();
    }

    function handleFilter(e){
        console.log(e);
        ajaxData.filter=General.serializeForm(window.data_table_form);
        loadData();
    }

    function goToPage(page){
        ajaxData.offset=(page-1)*ajaxData.limit;
        ajaxData.currentPage=page;
        loadData();
    }

    function sortButton(field){
        let btnhtml=<i className="fa fa-arrows-up-down text-muted"></i>;
        tableData.order.map(function(ord){
            if(ord.field===field){
                if(ord.dir==='desc'){
                    btnhtml= <i className="fa fa-arrow-down"></i>
                }else if(ord.dir==='asc'){
                    btnhtml= <i className="fa fa-arrow-up"></i>
                }else{
                    btnhtml= <i className="fa fa-arrows-up-down text-muted"></i>
                }
            } 
        })
        return btnhtml;
    }

    console.log('Render DataTable',tableData);
    return (
        <form name="data_table_form">
            <table id="data-table" className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                    {tableSetting.columns.map(function(column,index){
                        return <th key={index}>{column.title}
                        {column.order!==false &&  
                            <span className="float-right cursor-pointer" onClick={()=>handleSort(column.field)}>
                                {sortButton(column.field)}
                            </span>
                        }
                        </th>
                    })}
                    
                    </tr>
                    <tr>
                    {tableSetting.columns.map(function(column,index){
                        return column.filter && <th key={index}>
                            <input className="form-control" name={column.field} type={column.type}  onChange={handleFilter}/>
                        </th>
                    })} 
                    </tr>
                </thead>
                <tbody>
                    {tableData.data.length ? tableData.data.map(function(row,index){
                        return <tr key={index}>
                            {tableSetting.columns.map(function(column,i){
                                return <td key={i}>
                                    {column.template ? column.template(row) :row[column.field] }
                                </td>
                            })}
                        </tr>
                    }):<tr><td>No data Found</td></tr>}
                </tbody>
            </table>
            <div className="row">
                <div className="col-md-8">
                    <p>page {tableData.currentPage} of {tableData.lastPage}</p>
                </div>
                <div className="col-md-4">
                    {tableData.total!==0 && 
                    <nav aria-label="Page navigation example">
                        {tableData.offset===0?
                        <ul className="pagination">
                            <li className="page-item"><button type="button" className="page-link" disabled>Prev</button></li>
                            <li className="page-item active"><button type="button" className="page-link">1</button></li>
                            {tableData.lastPage>=2 && <li className="page-item"><button type="button" className="page-link" onClick={()=>goToPage(tableData.currentPage+1)}>2</button></li>}
                            {tableData.lastPage>=3 && <li className="page-item"><button type="button" className="page-link" onClick={()=>goToPage(tableData.currentPage+2)}>3</button></li>}
                            {tableData.lastPage>=4 && <li className="page-item"><button type="button" className="page-link" onClick={()=>goToPage(tableData.currentPage+3)}>4</button></li>}
                            {tableData.lastPage>=5 && <li className="page-item"><button type="button" className="page-link" onClick={()=>goToPage(tableData.currentPage+4)}>5</button></li>}
                            <li className="page-item"><button type="button" className="page-link" onClick={()=>goToPage(tableData.currentPage+1)} disabled={tableData.lastPage>1}>Next</button></li>
                        </ul>    
                        :
                        <ul className="pagination">
                            <li className="page-item"><button type="button" className="page-link" onClick={()=>goToPage(tableData.currentPage-1)} disabled={tableData.currentPage-1<1}>Prev</button></li>
                            {tableData.currentPage-2 >=1 && <li className="page-item"><button type="button" className="page-link" onClick={()=>goToPage(tableData.currentPage-2)}>{tableData.currentPage-2}</button></li>}
                            {tableData.currentPage-1 >=1 && <li className="page-item"><button type="button" className="page-link" onClick={()=>goToPage(tableData.currentPage-1)}>{tableData.currentPage-1}</button></li>}
                            <li className="page-item active"><button type="button" className="page-link">{tableData.currentPage}</button></li>
                            {tableData.lastPage>=tableData.currentPage+1 && <li className="page-item"><button type="button" className="page-link" onClick={()=>goToPage(tableData.currentPage+1)}>{tableData.currentPage+1}</button></li>}
                            {tableData.lastPage>=tableData.currentPage+2 && <li className="page-item"><button type="button" className="page-link" onClick={()=>goToPage(tableData.currentPage+2)}>{tableData.currentPage+2}</button></li>}
                            {tableData.lastPage>=tableData.currentPage+1 && <li className="page-item"><button type="button" className="page-link" onClick={()=>goToPage(tableData.currentPage+1)}>Next</button></li>}
                        </ul>    
                        }
                    </nav>
                    }
                </div>
            </div>
        </form>
    )
}