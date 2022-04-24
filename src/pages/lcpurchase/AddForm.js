import React, { useState, useEffect, useRef, useContext } from "react";
import { Context } from "../../context/Store";
import Select from "react-select";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { Button } from "react-bootstrap";

const AddForm = () => {
  const [isEdit, setIsedit] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const {
    setLcpCart,
        lcpCart,
    comData,
    getComdata,
    warningnotify,
    getLcpdata,
    deleteLcpur,
    deleteCartitem,
    lcpurchasestore,
    setLcpurchasestore,
    getGoods,
    goodsList,
    getLc,
    serverUrl,
    getProductstock,
    updateLcpur,
    setisCart,
    isCart,
    optionSelectedaccount,
    setOptionSelectedaccount,
    // lcpCart,
    // setLcpCart,
    setEditItem,
    setSproductList,
    getSelectedproduct,
    sproductList,
    productList,
    getProduct,
    accountList,
    getAccounts,
    successnotify,
    cartDatainsert,
    editItem,
    dataInsert,
    shead,
    edit,
    setEdit,
    updateData,
    inputRef,
  } = useContext(Context);
  const typeFocus = useRef();
  const lcFocus = useRef();
  const vehicleFocus = useRef();
  const [url, setUrl] = useState(serverUrl + `/lcpurchase`);
  const [updateurl, setUpdateurl] = useState(serverUrl + `/updatelcpurchase`);
  const [deleteurl, setDeleteurl] = useState(serverUrl + `/deletecart`);

  // const [count, setCount] = useState(1);

  //function



  const total = () => {
    var a = document.getElementById("qty2").value;
    var b = document.getElementById("rate").value;
    var c = a * b;
    setLcpurchasestore({
      ...lcpurchasestore,
      rate: b,
      total: c,
    });
  };

  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setLcpurchasestore({ ...lcpurchasestore, [name]: value });
  };
  const [optionSelectedList, setOptionSelectedList] = useState({
    value: "",
    label: "Select Type..",
  });


  const productdata = [];
  productList.forEach((e) => {
    productdata.push({
      q_1: e.qty_1,
      q_2: e.qty_2,
      q_3: e.qty_3,
      stock: e.stock,
    });
  });



  const productlist = [];
  goodsList.forEach((e) => {
    productlist.push({
      value: e.name,
      label: e.name,
      customAbbreviation: "",
    });
    // console.log(productlist)
  });

  const formatOptionLabel2 = (productlist, { context }) =>
    context === "value" ? (
      <div
        className=""
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ fontWeight: "bold", fontSize: "13px" }}>
          {productlist.label}
        </div>
        <div
          style={{
            fontWeight: "bold",
            color: "red",
            fontStyle: "italic",
            fontSize: "13px",
          }}
        >
          {productlist.customAbbreviation}
        </div>
      </div>
    ) : (
      <>
        <div className="" style={{ display: "flex", fontSize: "12px" }}>
          {/*      
     <img class="avatar" src="https://pos.softghor.com/dashboard/img/avatar/1.jpg" alt="avater"></img> */}

          <div className="" style={{ display: "flex", fontSize: "12px" }}>
            <div>{productlist.label}</div>
            <div
              style={{ marginLeft: "10px", color: "#ccc", fontSize: "12px" }}
            >
              {productlist.customAbbreviation}
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
        </div>
      </>
    );

  const myNewInputData = {
    id: new Date().getTime().toString(),
    date: "2022-07-09",
    lc_id: lcpurchasestore.lc_id,
    lc_name: lcpurchasestore.lc_name,
    v_no: lcpurchasestore.v_no,
    type: lcpurchasestore.type,
    ind_w: lcpurchasestore.ind_w,
    bhu_w: lcpurchasestore.bhu_w,
    posted: "ja-471",
  };

  const addCart = async (e) => {
    e.preventDefault();
    if (
      lcpurchasestore.lc_id != "" &&
      lcpurchasestore.type != 0 &&
      lcpurchasestore.v_no != 0 &&
      lcpurchasestore.ind_w != 0 &&
      lcpurchasestore.bhu_w != 0
    ) {
      setLcpCart([...lcpCart, myNewInputData]);
      setLcpurchasestore({
        ...lcpurchasestore,
        type: "",
        v_no: "",
        type: "",
        ind_w: "0",
        bhu_w: "0",
        posted: "ja-471",
      });

      await typeFocus.current.focus();
      setOptionSelectedList({
        ...optionSelectedList,
        value: "",
        label: "",
      });
      setisCart(true);
    } else {
      warningnotify("Fill up all data");
      await typeFocus.current.focus();
    }
  };

  const editCart2 = () => {
    setLcpCart(
      lcpCart.map((elem) => {
        if (elem.id === isEdit) {
          return {
            ...elem,

            lc_id: lcpurchasestore.lc_id,
            lc_name: lcpurchasestore.lc_name,
            v_no: lcpurchasestore.v_no,
            type: lcpurchasestore.type,
            ind_w: lcpurchasestore.ind_w,
            bhu_w: lcpurchasestore.bhu_w,
          };
        }
        return elem;
      })
    );
  };

  const editCart = (props) => {
    const item_todo_edited = lcpCart.find((curElem) => {
      return curElem.id === props;
    });
    // setInputData(item_todo_edited.name);
    // setIsEditItem(index);
    // setToggleButton(true);

    setLcpurchasestore({
      ...lcpurchasestore,
      lc_id: item_todo_edited.lc_id,
      lc_name: item_todo_edited.lc_name,
      v_no: item_todo_edited.v_no,
      type: item_todo_edited.type,
      ind_w: item_todo_edited.ind_w,
      bhu_w: item_todo_edited.bhu_w,
    });
    setSproductList(lcpCart);

    setIsedit(props);

    setOptionSelectedList({
      ...optionSelectedList,
      value: item_todo_edited.type,
      label: item_todo_edited.type,
    });
    // console.log(isEdit);
    console.log(sproductList);
    typeFocus.current.focus();
  };

  const deleteCart = (props) => {
    if (lcpCart != null) {
      alert("are you sure");
      deleteCartitem(deleteurl, props);
      const updatedItems = lcpCart.filter((curElem) => {
        return curElem.id !== props;
      });
      setLcpCart(updatedItems);
    } else {
      const updatedItems = lcpCart.filter((curElem) => {
        return curElem.id !== props;
      });
      setLcpCart(updatedItems);
    }
  };

  // remove all the elements
  const removeAll = () => {
    setLcpCart([]);
  };

  const selectText = (props) => {
    const input = document.getElementById(props);
    input.focus();
    input.select();
  };

  const cart_total = lcpCart.reduce((total, item) => {
    return total + item.total;
  }, 0);

  const insertData = (e) => {
    e.preventDefault();
    if(lcpCart.length==0){
      warningnotify("Fill up all data");
    } else {
      cartDatainsert(url, lcpCart);
    }
  
resetLp();
  };

  const editdb = (e) => {
    e.preventDefault();
    updateLcpur(updateurl, lcpCart);
    resetLp();
  };

  const selectProduct = (props) => {
    getSelectedproduct(props);
  };





  const resetLp  = async () => {
    setLcpCart([]);
    setLcpurchasestore({
      v_no: "",
      ind_w: "0",
      bhu_w: "0",
      posted: "ja-471",
    });
    getLcpdata();
    setOptionSelectedaccount({ value: "", label: "Select Lc.."})
    setOptionSelectedList({value:"", label: "Select Type.."})
    
    await lcFocus.current.focus();
  };
  const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };

  useEffect(() => {
     getComdata();
   }, []);
   
  useEffect(() => {
   getLcpdata();
  //  getComdata();
  }, [lcpCart]);

  useEffect(() => {
    if (editItem) {
      setLcpurchasestore(editItem);
      console.log(editItem);
    }
  }, [editItem]);
  return (
    <>
 
      <section className="col-lg-5 connectedSortable">
        <div className="box box-danger">
          {/* Tabs within a box */}
          <div className="tab-content no-padding">
            {/* Morris chart - Sales */}
            <div className="box-header header-custom">
              <h3 className="box-title">
                <i className="fa fa-address-book"></i> Details
              </h3>
              <h3 className="box-title pull-right">
                Date : <strong>2021-01-06</strong>
              </h3>
            </div>
            <form>
            <div className="box-body form-horizontal">
              <div className="col-md-12">
                <div id="divsup" className="form-group">
                  <label htmlFor="cust_id" className="col-sm-3 control-label">
                    Lc No
                  </label>

                  <div className="col-sm-8">
                    <Select
                      onFocus={() => getLc()}
                      ref={lcFocus}
                      onChange={(selectedOption) => {
                   
                        console.log("Selected city", selectedOption.value);
                        setLcpurchasestore({
                          ...lcpurchasestore,
                          lc_id: selectedOption.value,
                          lc_name: selectedOption.label,
                        });
                        setOptionSelectedaccount({
                          ...optionSelectedaccount,
                          value: selectedOption.value,
                          label: selectedOption.label,
                        });
                        typeFocus.current.focus();
                      }}
                      value={optionSelectedaccount}
                      formatOptionLabel={formatOptionLabel}
                      options={options}
                      disabled={isCart}
                      defaultValue={options[1]}
                    />
                  </div>
                  {/* <span>
                      <i className="fa fa-address-book"></i>
                    </span> */}
                </div>
                {/* <div className="form-group">
                  <label htmlFor="comments" className="col-sm-3 control-label">
                    Particular
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="text"
                      value={lcpurchasestore.particular}
                      name="particular"
                      placeholder="Particular"
                      autocomplete="off"
                      onChange={getUserData}
                      id=""
                    />
                  </div>
                </div> */}
                <div id="divsup" className="form-group">
                  <label htmlFor="cust_id" className="col-sm-3 control-label">
                    Type of goods
                  </label>

                  <div className="col-sm-8">
                    <Select
                      onFocus={() => getGoods()}
                      ref={typeFocus}
                      onChange={(selectedOption) => {
                        // console.log("Selected city", selectedOption.value);
                        // setDrop(selectedOption.value)
                        setLcpurchasestore({
                          ...lcpurchasestore,
                          type: selectedOption.value,
                        });
                        setOptionSelectedList({
                          ...optionSelectedList,
                          value: selectedOption.value,
                          label: selectedOption.label,
                        });
                        selectProduct(selectedOption.value);
                        vehicleFocus.current.focus();
                      }}
                 
                      value={optionSelectedList}
                      formatOptionLabel={formatOptionLabel2}
                      options={productlist}
                    />
                  </div>
                </div>
                <div id="divsup" className="form-group">
                  <label htmlFor="cust_id" className="col-sm-3 control-label">
                    Vehicle no
                  </label>
                  <div className="col-sm-8">
                    <input
                      ref={vehicleFocus}

                      onFocus={() => {
                        selectText("v_no");
                        
                      }}
                      className="form-control"
                      type="text"
                      value={lcpurchasestore.v_no.toUpperCase()}
                      name="v_no"
                      onKeyDown={handleEnter}
                      autocomplete="off"
                      required
                      onChange={getUserData}
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        textAlign: "right",
                      }}
                      id="v_no"
                    />
                  </div>
                </div>
                <div id="divsup" className="form-group">
                  <label htmlFor="cust_id" className="col-sm-3 control-label">
                Weight(IN/BH)
                  </label>

                  <div className="col-sm-8">
                    <input
                      onFocus={() => {
                        selectText("ind_w");
                      }}
                      className="form-control"
                      type="number"
                      value={lcpurchasestore.ind_w}
                      onKeyDown={handleEnter}
                      name="ind_w"
                      placeholder="Weight"
                      autocomplete="off"
                      onChange={getUserData}
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        textAlign: "right",
                      }}
                      id="ind_w"
                    />
                  </div>
                </div>
                <div id="divsup" className="form-group">
                  <label htmlFor="cust_id" className="col-sm-3 control-label">
                  Weight(BN)
                  </label>
                  <div className="col-sm-8">
                    <input
                      onFocus={() => {
                        selectText("bhu_w");
                      }}
                      onKeyDown={handleEnter}
                      className="form-control"
                      type="number"
                      value={lcpurchasestore.bhu_w}
                      name="bhu_w"
                      placeholder="Weight"
                      autocomplete="off"
                      onChange={getUserData}
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        textAlign: "right",
                      }}
                      id="bhu_w"
                    />
                  </div>
                </div>

                <div id="divsup" className="pull-right">
                  <Button  onClick={edit ? editCart2 : addCart} variant="warning">
                  {edit ? "Update Cart" : "Add Cart"}
                  </Button>{" "}
                  {/* <Button variant="danger" onClick={editdb}>
                    Submit
                  </Button>{" "} */}
                 
                </div>
                {/* /.col */}
              </div>
              <style
                type="text/css"
                dangerouslySetInnerHTML={{
                  __html:
                    "\n fieldset {\n  padding: 0;\n  margin: 0;\n  border: 0;\n\n  min-width: 0;\n}\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: @line-height-computed;\n  font-size: (@font-size-base * 1.5);\n  line-height: inherit;\n  color: @legend-color;\n  border: 0;\n  border-bottom: 1px solid @legend-border-color;\n}\n\n                      ",
                }}
              />
            </div>
            </form>
          </div>
        </div>
      </section>

      <section className="col-lg-7 connectedSortable">
        <div className="box box-primary">
          <div className="box-header header-custom">
            <h3 className="box-title">
              <i className="fa fa-lcpCart-arrow-down"></i> Cart Item
            </h3>
          </div>
          <div className="box-tools pull-right"></div>
          <div className="box-body form-horizontal">
            <div className="box-body">
              <div id="cart_i">
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
                          <strong> {comData.length>0?comData[0].comp_name:''}</strong>
                        </h3>
                        <span> {comData.length>0?comData[0].address:''}</span>
                        <br />
                        <span>Phone:  {comData.length>0?comData[0].contact:''}</span>
                        <br />
                        <span>Email:  {comData.length>0?comData[0].email:''} </span>
                      </div>
                    </div>
                    <div className="col-sm-4 col-xs-12 text-center">
                      <strong>
                        {" "}
                        <h2>INVOICE</h2>
                      </strong>
                    </div>
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col-md-12 mt-4 apu ">
                    <table className="table  table-bordered">
                      <thead className="bg-primary">
                        <tr style={{ fontSize: "85%" }}>
                        <th width="5%" >Sl</th>
                          <th width="25%">Account</th>
                          <th width="15%">Type</th>
                          <th width="15%">Weight(IN/BH)</th>
                          <th width="15%">Weight(BN)</th>
                          <th width="15%" >Vehicle</th>

                          <th width="5%">Action</th>
                        </tr>
                      </thead>

                      <tbody id="tbody" className="">
                        {lcpCart.map((curElem, index) => {
                          return (
                            <tr key={index}>
                               <td width="7%" style={{ color: "#616a78" }}>
                                {index+1}
                              </td>
                              <td width="27%" style={{ color: "#616a78" }}>
                                {curElem.lc_name}
                              </td>

                              <td width="10%" align="center">
                                {curElem.type}
                              </td>
                              <td width="10%" align="right">
                                {" "}
                                {curElem.ind_w}
                              </td>
                              <td
                                width="10%"
                                style={{ color: "#616a78" }}
                                align="right"
                              >
                                {curElem.bhu_w}
                              </td>
                              <td
                                width="10%"
                                style={{ color: "#616a78" }}
                                align="center"
                              >
                                {curElem.v_no}
                              </td>
                              <td width="5%" >
                                <i
                                  className="fa fa-edit"
                                  onClick={() => {
                                    editCart(curElem.id);
                                  }}
                                ></i>
                                <i
                                  className="fa fa-remove"
                                  onClick={() => {
                                    deleteCart(curElem.id);
                                  }}
                                ></i>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>

                      <tfoot className="bg-danger">
                        <tr>
                          <th className="text-center" colSpan={4}>
                            Total Item:{" "}
                            <strong id="totalQty">{lcpCart.length}</strong>{" "}
                          </th>
                          <th className="text-center" colSpan={3}>
                            Total:{" "}
                            <strong id="totalAmount">{cart_total}</strong> Tk
                          </th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="form-gorup text-center">

                   
                    {
edit?'':<Button onClick={resetLp} variant="info">
Clear {" "}
</Button>
                    } {" "}
                  
                    <Button onClick={edit ? editdb : insertData} variant="primary">
                      {" "}
                      {edit ? "Update" : "Submit"}
                    </Button>
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

export default AddForm;
