import React, { useState, useEffect, useRef,useContext } from "react";
import { Context } from "../../context/Store";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search ,CSVExport} from "react-bootstrap-table2-toolkit";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const ViewList = () => {
  const { ExportCSVButton } = CSVExport;
    const {selectlcsell,deleteLcpur,selectlcpurchase,serverUrl,lcPurchase,editItem,accountList,getAccounts,accounts,selectSell,deleteAcccount} = useContext(Context);

    const [deleteurl2, setDeleteurl] = useState(serverUrl+`/deletelcpurchase`);
    const [findurl, setFindurl] = useState(serverUrl+`/selectlcsell`)

    const lcselldata = lcPurchase.filter(lcsell => lcsell.others_c == 'LC_SELL');
    const MyExportCSV = (props) => {
      const handleClick = () => {
        props.onExport();
      };
      return (
        <div>
          <button className="btn btn-success" onClick={ handleClick }>Export to CSV</button>
        </div>
      );
    };
    const columns = [
      
    
        {
          dataField: "inv_id",
          text: "INV",
          headerStyle: () => {
            return { width: "12%" };
          },
        },
        {
          dataField: "date",
          text: "DATE",
          headerStyle: () => {
            return { width: "10%" };
          },
        },
        {
          dataField: "lc_name",
          text: "Account",
          headerStyle: () => {
            return { width: "20%" };
          },
        },
        {
          dataField: "vehicle",
          text: "Vehicle",
          headerStyle: () => {
            return { width: "10%" };
          },
        },
        {
          dataField: "ind_weight",
          text: "Weight(IN/BH)",
          headerStyle: () => {
            return { width: "10%" };
          },
        },
        {
          dataField: "b_weight",
          text: "Weight(BN)",
          headerStyle: () => {
            return { width: "10%" };
          },
        },
        
        {
          dataField: "posted",
          text: "POSTED",
          headerStyle: () => {
            return { width: "8%" };
          },
        },
        {
          dataField: "inv_id",
          text: "Action",
          formatter: (rowContent, row) => {
            return (  
               <div>
               <Button variant="info"  onClick={() => selectlcsell(row.inv_id,findurl)} >Edit</Button>{' '}
               <Button variant="danger"  onClick={() => deleteLcpur(row.inv_id,deleteurl2)}  >Delete</Button>{' '}
               <Button variant="primary"  onClick={() => deleteLcpur(row.inv_id,deleteurl2)}  >Print</Button>{' '}     
               </div>
            );
          },
        },
      ];
      const rowStyle = (row, rowIndex) => {
        return { overflowWrap: "break-word", padding: "0px",textAlign:"left" };
      };
    
    
    const MySearch = (props) => {
      let input;
      const handleClick = () => {
        props.onSearch(input.value);
      };
   

// useEffect(() => {
//   if(editItem){
//     getAccounts();
  
   
// })

      
      return (
        <div >
          <input
         
          onChange={ handleClick }
            className="form-control"
            style={ { backgroundColor: 'white' } }
            ref={ n => input = n }
            type="text"
          />
          {/* <button className="btn btn-warning" onClick={ handleClick }>Click to Search!!</button> */}
        </div>
      );
    };







    return (
        <>
          
          <section className="col-lg-12 connectedSortable">
              <div className="box box-primary">
                <div className="box-header header-custom">
                  <h3  className="box-title">Detail Info</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <ToolkitProvider
                    keyField="id"
                    data={lcselldata}
                    columns={columns}
                    search
                    exportCSV
                  >
                    {(props) => (
                      <div>
                          <MyExportCSV { ...props.csvProps }>Export CSV!!</MyExportCSV>
                        <MySearch { ...props.searchProps } />

                        <BootstrapTable
                          {...props.baseProps}
                         
                          pagination={paginationFactory({ sizePerPage: 5 })}
                          rowStyle={rowStyle}
                          headerClasses="header-class"
                          headerStyle
                          striped
                          hover
                        
                      
                dense
                        />
                      </div>
                    )}
                  </ToolkitProvider>
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
            </section>  
        </>
    )
}

export default ViewList
