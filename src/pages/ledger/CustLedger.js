// import DataTable from 'react-data-table-component';
import { ButtonGroup, Button,Spinner } from "react-bootstrap";
// import Pdf from "react-to-pdf";
import React, { useState, useEffect, useRef, useContext } from "react";
// import autoTable from "jspdf-autotable";
// import { font } from "./font";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import react-bootstrap-date-picker from "react-bootstrap-date-picker";

// import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";
import ReactInputDateMask from 'react-input-date-mask';

import { Context } from "../../context/Store";
import GeneratePdf from "../../components/GeneratePdf";
const CustLEdger = () => {
  const [fecha, setFecha] = useState();
  const {
    // lcsCart,
    // setLcsCart,
    // getSelectedlcvehicle,
    // lpvehicle,
    // getLcpvehicle,
    prevDue,
    getPrevDue,
    ledDetails,
    getAccountled,
    setLeddata,
    ledData,
    optionlcclient,
    setOptionlcclient,
    comData,
    getComdata,
    warningnotify,
    getLcpdata,
    deleteLcpur,
    deleteCartitem,
    getGoods,
    goodsList,
    getLc,
    serverUrl,
    getProductstock,
    updateLcpur,
    setisCart,
    isCart,
    // optionSelectedaccount,
    // setOptionSelectedaccount,
    // lcsCart,
    // setLcsCart,
    // setEditItem,
    // setSproductList,
    // getSelectedproduct,
    // sproductList,
    // productList,
    // getProduct,
    accountList,
    getAccounts,
    // successnotify,
    // cartDatainsert,
    // editItem,
    // dataInsert,
    // shead,
    // edit,
    // setEdit,
    // updateData,
    // inputRef,
  } = useContext(Context);
  const clientFocus = useRef();
  const fromFocus = useRef();
  const toFocus = useRef();
  const [requrl, setRequrl] = useState(serverUrl + `/getstatement`);
  const [pdueurl, setPdueurl] = useState(serverUrl + `/getpdues`);
  // const [prevDue,setDue] = useState('2000');
  
  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setLeddata({ ...ledData, [name]: value });
  };
  var data = [
    { name: "Bar", amount: 1200 },
    { name: "Zap", amount: 2060 },
    { name: "Foo", amount: 32990 },
  ];
 const [tableData, setTabledata] = useState(100);
  const gData = async () =>{
    
    await getPrevDue(ledData,pdueurl);
    await getAccountled(ledData,requrl);
console.log(newArr);
  }

let sum = Number(prevDue);
  const newArr =  ledDetails.map(item=>{
    const newItem = {...item}
    newItem.balance=sum+Number(newItem.payment)-Number(newItem.receive);
   sum= newItem.balance;
   return(newItem)
  })

  let wt_in = 0;
  let wt_in2 = 0;
  let wt_bn = 0;
  let wt_bn2 = 0;
  let wt_ton = 0;
  let wt_ton2 = 0;
  let wt_cft = 0;
  let wt_cft2 = 0;
  let tot_pay = 0;
  let tot_pay2 = 0;
  let tot_rec = 0;
  let tot_rec2 = 0;
  function thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
  newArr.forEach(value => {
    let nf = new Intl.NumberFormat("en-US");
  wt_in2 += Number(value.ind_weight);
  wt_in=thousands_separators(wt_in2.toFixed(2));
  wt_bn2 += Number(value.b_weight);
  wt_bn=thousands_separators(wt_bn2.toFixed(2));
  wt_ton2 += Number(value.ton);
  wt_ton=thousands_separators(wt_ton2.toFixed(2));
  wt_cft2 += Number(value.cft);
  wt_cft=thousands_separators(wt_cft2.toFixed(2));
  tot_pay2 += Number(value.payment);
  tot_pay=thousands_separators(tot_pay2.toFixed(2));
  tot_rec2 += Number(value.receive);
  tot_rec=thousands_separators(tot_rec2.toFixed(2));
});
var total1 = newArr.reduce((sum, el) => sum + el.tot_pay, 0);
let number = 1234567890;
let nf = new Intl.NumberFormat("en-US");
var total = nf.format(total1); // "1,234,567,890"

var tbody = [
  ...newArr.map((el) => [el.inv_id, el.date,el.comments,el.v_no,el.type,el.ton,el.cft,el.ind_weight,el.b_weight,el.rate,el.payment,el.receive,el.balance,]),
  [
    {
      content: `Total = ${total}`,
      colSpan: 2,
      styles: { fillColor: [239, 154, 154] },
    },
  ],
];

  const acoptions = [];
  accountList.forEach((e) => {
    acoptions.push({
      value: e.id,
      label: e.name,
      customAbbreviation: e.prevDue,
      Atype: e.subhead,
      contract: e.contract,
      address: e.address,
    });
  });


  const formatacOptionLabel = (acoptions, { context }) =>
    context === "value" ? (
      <div
        className=""
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ fontWeight: "bold", fontSize: "13px" }}>
          {acoptions.label}
        </div>
        <div
          style={{
            fontWeight: "bold",
            color: "red",
            fontStyle: "italic",
            fontSize: "13px",
          }}
        >
          {acoptions.customAbbreviation}
        </div>
        <div style={{ marginLeft: "10px", color: "#ccc", fontSize: "12px" }}>
          {acoptions.Atype}
        </div>
      </div>
    ) : (
      <>
        <div className="" style={{ display: "flex", fontSize: "12px" }}>
          <img
            class="avatar"
            src="https://pos.softghor.com/dashboard/img/avatar/1.jpg"
            alt="avater"
          ></img>

          <div className="" style={{ display: "flex", fontSize: "12px" }}>
            <div>{acoptions.label}</div>
            <div
              style={{ marginLeft: "10px", color: "#ccc", fontSize: "12px" }}
            >
              {acoptions.customAbbreviation}
            </div>
            <div
              style={{ marginLeft: "10px", color: "#ccc", fontSize: "12px" }}
            >
              {acoptions.Atype}
            </div>
          </div>
        </div>
      </>
    );

  const options = [];
  accountList.forEach((e) => {
    options.push({
      value: e.id,
      label: e.lc_name,
      customAbbreviation: e.qty,
      country: e.country,
    });
  });

  const formatOptionLabel = (options, { context }) =>
    context === "value" ? (
      <>
        <div
          className=""
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ fontWeight: "bold", fontSize: "13px" }}>
            {options.label}
          </div>
          <div style={{ fontWeight: "bold", fontSize: "13px", color: "#ccc" }}>
            {" "}
            {options.customAbbreviation}
          </div>
        </div>
      </>
    ) : (
      <>
        <div
          className=""
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* <img class="avatar" src="https://pos.softghor.com/dashboard/img/avatar/1.jpg" alt="avater"></img>   */}

          <div style={{ fontSize: "12px" }}>{options.label}</div>
          <div style={{ marginLeft: "10px", color: "black", fontSize: "12px" }}>
            {options.customAbbreviation} Ton
          </div>
          <div style={{ fontWeight: "bold", fontSize: "13px", color: "#ccc" }}>
            {" "}
            {options.country}
          </div>
        </div>
      </>
    );

    const handleEnter = (event) => {
      if (event.key.toLowerCase() === "enter") {
        const form = event.target.form;
        const index = [...form].indexOf(event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
      }
    };
   
const thead = 
  [
    "INVOICE",
    "DATE",
    "PARTICULAR",
    "VEHICLE",
    "TYPE",
    "TON",
    "CFT",
    "W(IN/BH)",
    "W(BN)",
    "RATE",
    "PAYMENT",
    "RECEIVE",
    "BALANCE",

  ];

  const ref = useRef();
  return (
    <>
      <section className="col-lg-12 connectedSortable">
        <div className="box box-primary">
          <div className="box-header header-custom">
            <h3 className="box-title">Detail Info</h3>
          </div>
          {/* /.box-header */}
          <div className="box-body">
            <form
              className="myForm"
            
            >
              <div className="form-row" align="left">
                <div className="form-group col-md-3">
                  <label>Accounts:</label>
                  <Select
                    ref={clientFocus}
                    onFocus={() => getAccounts()}
                    onChange={(selectedOption) => {
                      console.log("Selected city", selectedOption.value);
                      setLeddata({
                        ...ledData,
                        client_id: selectedOption.value,
                        client_type: selectedOption.Atype,
                      });
                      setOptionlcclient({
                        ...optionlcclient,
                        value: selectedOption.value,
                        label: selectedOption.label,
                      });
                      fromFocus.current.focus();
                    }}
                    // onKeyDown={handleEnter}

                    value={optionlcclient}
                    formatOptionLabel={formatacOptionLabel}
                    options={acoptions}
                    disabled={isCart}
                    defaultValue={options[1]}
                  />{" "}
                </div>

                <div className="form-group col-md-3">
                  <label>From Date:</label>
                  
                  <input
                     ref={fromFocus}
                     onKeyDown={handleEnter}
                    type="date"
                       className="datepicker btn-block"
                    name="from_date"
                    id="from_date"
                    onChange={getUserData}
                    placeholder="Select From Date"
                    // defaultValue="<?php echo isset($_GET['from']) ? $_GET['from'] : '' ?>"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>To Date:</label>
                  <input
                   ref={toFocus}
                    type="date"
                    name="to_date"
                    id="to_date"
                    onChange={getUserData}
                    onKeyDown={handleEnter}
                    className="datepicker btn-block"
                    placeholder="Select To Date"
                    defaultValue="<?php echo isset($_GET['to']) ? $_GET['to'] : '' ?>"
                  />
                </div>
              </div>
              <div className="form-row" align="left">
              <div className="form-group col-md-3">
                  <button type=""  onKeyDown={handleEnter} className="btn btn-warning btn-block">
                    
                    <i className="fa fa-paper-plane" /> Reset
                  </button>
                </div>
                <div className="form-group col-md-3">
               
                <input
                
                        type="button"
                        name="save"
                        className="btn btn-success btn-block"
                        defaultValue="Submit"
                        id="butsave"
                        onClick={gData}
                      />
                  {/* <button type="" onClick={gData}  className="btn btn-success btn-block">
                    <i className="fa fa-paper-plane" /> Submit
                  </button> */}
                </div>
              </div>
            </form>
          </div>
          {/* /.box-body */}
        </div>
        {/* /.box */}
      </section>

      <section className="col-lg-12 connectedSortable">
        <div className="box box-primary">
          <div className="box-header header-custom d-flex justify-content-center ">
            <h3 className="box-title">
              <i className="fa fa-lcsCart-arrow-down"></i> Cart Item
            </h3>
            {/* <button
              type="submit"
              onClick={generatePDF}
              className="btn btn-success   pull-right"
            >
              <i className="fa fa-paper-plane" /> Submit
            </button> */}
            <ButtonGroup aria-label="Basic example"   className="  pull-right">
                        <Button variant="primary"  onClick={()=>GeneratePdf(tbody,thead)}>Details</Button>
                        <Button variant="warning">Summary</Button>
                        <Button variant="success"></Button>
                      </ButtonGroup>
          </div>
          <div className="box-tools pull-right"></div>
          <div className="box-body form-horizontal">
            <div className="box-body">
              <div id="cart_i" ref={ref}>
                <div>
                  <div className="row">
                    <div className="col-sm-8 col-xs-12">
                      <img
                        src={"https://fahimtraders.com/dist/img/logo1.png"}
                        style={{
                          float: "left",
                          overflow: "hidden",
                          width: 100,
                          marginRight: 15,
                          marginBottom: 10,
                        }}
                      />
                      <div>
                        <h3 className="text-capitalize font-weight-bold">
                          <strong> IT TECH POINT BD</strong>
                        </h3>
                        <span>Address: addresssss </span>
                        <br />
                        <span>Phone: 0111114454</span>
                        <br />
                        <span>Email: IT@GMAIL.COM </span>
                      </div>
                    </div>
                    <div className="col-sm-4 col-xs-12 text-center">
                      <strong>
                        {" "}
                        <h2>A/C STATEMENT</h2>
                      </strong>
                   
                    </div>
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col-md-12 mt-4 apu ">
                    <div class="outer-wrapper">
                      <p className="prevDue">Previous Due: {prevDue}bdt</p>

                      <div class="table-wrapper">
                        <table>
                          <thead>
                          <th width="3%">#</th>
                            <th width="5%">INVOICE</th>
                            <th width="10%">DATE</th>
                            <th width="15%">PARTICULAR</th>
                            <th width="6%">VEHICLE</th>
                            <th width="9%">TYPE</th>
                            <th width="5%">TON</th>
                            <th width="5%">CFT</th>
                            <th width="5%">W(IN/BH)</th>
                            <th width="5%">W(BN)</th>
                            <th width="10%">RATE</th>
                            <th width="10%">PAYMENT</th>
                            <th width="10%">RECEIVE</th>
                            <th width="10%">BALANCE</th>
                         
                          </thead>
                          <tfoot>
                            <tr>
                            <th> </th>
                              <th> </th>
                              <th> </th>
                              <th> </th>
                              <th> </th>
                              <th> </th>
                              <th>{wt_ton}</th>
                              <th>{wt_cft}</th>
                              <th>{wt_in}</th>
                              <th>{wt_bn}</th>
                              <th> </th>
                              <th>{tot_pay}</th>
                              <th>{tot_rec}</th>
                              <th> </th>
                              
                            </tr>
                          </tfoot>
                          <tbody>

{
  
  newArr.map((item,i)=>{
//   const newItem = {...item}
//   newItem.balance=tableData+newItem.payment-newItem.receive;
//   // setTabledata(200)
// //  console.log(tableData);
return(
<tr  >
<td>{i+1}</td>
  <td align="center">{item.inv_id}</td>
  <td align="center">{item.date}</td>
  <td align="left">{item.comments}</td>
  <td align="center">{item.v_no}</td>
  <td align="center">{item.type}</td>
  <td align="right">{item.ton}</td>
  <td align="right">{item.cft}</td>
  <td align="right">{item.ind_weight}</td>
  <td align="right">{item.b_weight}</td>
  <td align="right">{item.rate}</td>
  <td align="right">{thousands_separators(item.payment)}</td>
  <td align="right">{thousands_separators(item.receive)}</td>
  <td align="right">{thousands_separators(item.balance)}</td>
 
</tr>
)
})
  }


                          


                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/*  <input type="submit" name="create_pdf" class="btn btn-danger" value="Get Report" />   */}
          </div>
        </div>
      </section>
    </>
  );
};

export default CustLEdger;
