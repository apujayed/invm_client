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
    getLedg,
    sidestore,
    setSidestore,
    lcsCart,
    setLcsCart,
    getSelectedlcvehicle,
    lpvehicle,
    getLcpvehicle,
    // setSidestore,
    // sidestore,
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
    optionSelectedaccount,
    setOptionSelectedaccount,
    // lcsCart,
    // setLcsCart,
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
  const vehicleFocus = useRef();
  const weightFocus = useRef();
  const sideFocus = useRef();
  const clientFocus = useRef();
  const productFocus = useRef();
  const [url, setUrl] = useState(serverUrl + `/lcsell`);
  const [updateurl, setUpdateurl] = useState(serverUrl + `/updatelcsell`);
  const [deleteurl, setDeleteurl] = useState(serverUrl + `/deletecart`);

  // const [count, setCount] = useState(1);

  //function

  const total = () => {
    var a = document.getElementById("ton").value;
    var b = document.getElementById("rate").value;
    var c = a * b;
    setSidestore({
      ...sidestore,
      rate: b,
      total: c,
    });
  };

  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setSidestore({ ...sidestore, [name]: value });
  };
  const [optionSelectedList, setOptionSelectedList] = useState({
    value: "",
    label: "Select Vehicle..",
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

  const vehicles = lpvehicle.filter(
    (vehicle) => vehicle.lc_no == sidestore.lc_id
  );
  console.log(lcsCart.v_no);
  const productlist = [];
  vehicles.forEach((e) => {
    productlist.push({
      value: e.id,
      label: e.v_no,
      customAbbreviation: e.type,
      status: e.cart,
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

          <div
            className=""
            style={{ display: "flex", fontSize: "12px", fontWeight: "bold" }}
          >
            <div>{productlist.label}</div>
            <div
              style={{
                marginLeft: "10px",
                color: "blue",
                fontSize: "12px",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              {productlist.customAbbreviation}
            </div>
            <div
              style={{
                marginLeft: "10px",
                color: productlist.status == 0 ? "red" : "lime",
                fontSize: "15px",
              }}
            >
              &#x2022;
            </div>
          </div>
        </div>
      </>
    );

  const acoptions = [];
  accountList.forEach((e) => {
    acoptions.push({
      value: e.id,
      label: e.name,
      customAbbreviation: e.due,
      Atype: e.subhead,
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

  const myNewInputData = {
    id: new Date().getTime().toString(),
    date: "2022-07-09",
    client_id: sidestore.client_id,
    client_name: sidestore.client_name,
    client_type: sidestore.client_type,
    lc_id: sidestore.lc_id,
    lc_name: sidestore.lc_name,
    v_no: sidestore.v_no,
    type: sidestore.type,
    rate: sidestore.rate,
    total: sidestore.total,
    ton: sidestore.ton,
    ind_w: sidestore.ind_w,
    bhu_w: sidestore.bhu_w,
    posted: "ja-471",
    particular: sidestore.particular,
  };

  const addCart = async (e) => {
    e.preventDefault();
    if (
      sidestore.client_id != "" &&
      sidestore.lc_id != "" &&
      sidestore.type != 0 &&
      sidestore.v_no != 0 &&
      sidestore.ind_w != 0 &&
      sidestore.bhu_w != 0 &&
      sidestore.total != 0
    ) {
      setLcsCart([...lcsCart, myNewInputData]);
      setSidestore({
        ...sidestore,
        lc_id: "",
        lc_name: "",
        country: "",
        v_no: "",
        type: "",
        rate: "0",
        total: "",
        ton: "0",
        ind_w: "0",
        bhu_w: "0",
        particular: "N/A",
      });

      await sideFocus.current.focus();
      setOptionSelectedaccount({
        ...optionSelectedList,
        value: "",
        label: "Select Lc...",
      });
      setOptionSelectedList({
        ...optionSelectedList,
        value: "",
        label: "Select Vehicle...",
      });
      setisCart(true);
    } else {
      warningnotify("Fill up all data");
      await sideFocus.current.focus();
    }
  };

  const editCart2 = (e) => {
    e.preventDefault();
    if (
      sidestore.rate != "" &&
      sidestore.total != "" &&
      sidestore.ton != 0 &&
      sidestore.v_no != 0 &&
      sidestore.ind_w != 0 &&
      sidestore.bhu_w != 0 &&
      sidestore.total != 0
    ) {
      setLcsCart(
        lcsCart.map((elem) => {
          if (elem.id === isEdit) {
            return {
              ...elem,

              client_id: sidestore.client_id,
              client_name: sidestore.client_name,
              lc_id: sidestore.lc_id,
              lc_name: sidestore.lc_name,
              v_no: sidestore.v_no,
              type: sidestore.type,
              rate: sidestore.rate,
              total: sidestore.total,
              ton: sidestore.ton,
              ind_w: sidestore.ind_w,
              bhu_w: sidestore.bhu_w,
              posted: "ja-471",
              particular: sidestore.particular,
            };
          }
          return elem;
        })
      );
      setSidestore({
        v_no: "",
        type: "",
        rate: "0",
        total: "0",
        ton: "0",
        ind_w: "0",
        bhu_w: "0",
        particular: "N/A",
      });
      setOptionSelectedList({
        ...optionSelectedList,
        value: "",
        label: "Select Vehicle...",
      });
    } else {
      warningnotify("Fill up all data");
      vehicleFocus.current.focus();
    }
  };

  const editCart = (props) => {
    const item_todo_edited = lcsCart.find((curElem) => {
      return curElem.id === props;
    });

    setSidestore({
      ...sidestore,
      lc_id: item_todo_edited.lc_id,
      lc_name: item_todo_edited.lc_name,
      v_no: item_todo_edited.v_no,
      type: item_todo_edited.type,
      ind_w: item_todo_edited.ind_w,
      bhu_w: item_todo_edited.bhu_w,
      rate: item_todo_edited.rate,
      total: item_todo_edited.total,
      ton: item_todo_edited.ton,
      particular: item_todo_edited.particular,
    });
    setSproductList(lcsCart);

    setIsedit(props);

    setOptionSelectedList({
      ...optionSelectedList,
      value: item_todo_edited.v_no,
      label: item_todo_edited.v_no,
    });
    // console.log(isEdit);
    console.log(sproductList);
    vehicleFocus.current.focus();
  };

  const deleteCart = (props, side) => {
    if (lcsCart != null) {
      alert("are you sure");
      deleteCartitem(deleteurl, props, side);
      const updatedItems = lcsCart.filter((curElem) => {
        return curElem.id !== props;
      });
      setLcsCart(updatedItems);
    } else {
      const updatedItems = lcsCart.filter((curElem) => {
        return curElem.id !== props;
      });
      setLcsCart(updatedItems);
    }
  };

  // remove all the elements
  const removeAll = () => {
    setLcsCart([]);
  };

  const selectText = (props) => {
    const input = document.getElementById(props);
    input.focus();
    input.select();
  };

  const cart_total = lcsCart.reduce((total, item) => {
    return total + item.total;
  }, 0);

  const insertData = (e) => {
    const actype = sidestore.client_type;
    e.preventDefault();
    if (lcsCart.length == 0) {
      warningnotify("Fill up all data");
    } else {
      cartDatainsert(url, lcsCart, actype);
    }

    resetLp();
  };

  const editdb = (e) => {
    e.preventDefault();
    updateLcpur(updateurl, lcsCart);
    setOptionlcclient({ value: "", label: "Select Account..." });
    setOptionSelectedaccount({ value: "", label: "Select Lc.." });
    setOptionSelectedList({ value: "", label: "Select Type.." });
  };

  const selectProduct = (props, country) => {
    getSelectedlcvehicle(props, country);
  };

  const resetLp = async () => {
    setLcsCart([]);
    setSidestore({
      lc_id: "",
      lc_name: "",
      country: "",
      v_no: "",
      type: "",
      rate: "0",
      total: "",
      ton: "0",
      ind_w: "0",
      bhu_w: "0",
      particular: "N/A",
    });
    getLcpdata();
    setOptionlcclient({ value: "", label: "Select Account..." });
    setOptionSelectedaccount({ value: "", label: "Select Lc.." });
    setOptionSelectedList({ value: "", label: "Select Type.." });

    await clientFocus.current.focus();
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
  }, [lcsCart]);

  useEffect(() => {
    if (editItem) {
      setSidestore(editItem);
      console.log(editItem);
    }
  }, [editItem]);
  return (
    <>
      <section className="col-lg-7 connectedSortable">
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
                <div class="row">
                  <div class="col-md-6">
                    <div className="form-group ">
                      <label
                        htmlFor="accntname"
                        className="col-sm-3 control-label"
                      >
                        Sell Type
                      </label>
                      <div className="  col-sm-8">
                        <select
                          style={{ width: "100%" }}
                          className="form-control"
                          // value={accounts.sell_type}
                          name="sell_type"
                          placeholder="sell_type"
                          autocomplete="off"
                          // onChange={getUserData}
                          // disabled={isCart}
                        >
                          <option value="SELL">SELL</option>
                          <option value="PUR">PURCHASE</option>
                        </select>
                      </div>
                    </div>

                    <div id="divsup" className="form-group">
                      <label
                        htmlFor="cust_id"
                        className="col-sm-3 control-label"
                      >
                        Account
                      </label>

                      <div className="col-sm-8">
                        <Select
                          ref={clientFocus}
                          onFocus={() => getAccounts()}
                          onChange={(selectedOption) => {
                            console.log("Selected city", selectedOption.value);
                            setSidestore({
                              ...sidestore,
                              client_id: selectedOption.value,
                              client_name: selectedOption.label,
                            });
                            setOptionlcclient({
                              ...optionlcclient,
                              value: selectedOption.value,
                              label: selectedOption.label,
                            });
                            sideFocus.current.focus();
                          }}
                          // onKeyDown={handleEnter}

                          value={optionlcclient}
                          formatOptionLabel={formatacOptionLabel}
                          options={acoptions}
                          disabled={isCart}
                          defaultValue={options[1]}
                        />
                      </div>
                      {/* <span>
                      <i className="fa fa-address-book"></i>
                    </span> */}
                    </div>

                    <div id="divsup" className="form-group">
                      <label
                        htmlFor="side"
                        className="col-sm-3 control-label"
                      >
                        Side
                      </label>

                      <div className="col-sm-8">
                        <Select
                          onFocus={() => getLc()}
                          ref={sideFocus}
                          onChange={(selectedOption) => {
                            console.log("Selected city", selectedOption.value);
                            setSidestore({
                              ...sidestore,
                              side: selectedOption.value,
                              side_name: selectedOption.label,
                              
                            });
                            setOptionSelectedaccount({
                              ...optionSelectedaccount,
                              value: selectedOption.value,
                              label: selectedOption.label,
                            });
                            vehicleFocus.current.focus();
                          }}
                          value={optionSelectedaccount}
                          formatOptionLabel={formatOptionLabel}
                          options={options}
                          disabled={isCart}
                          defaultValue={options[1]}
                        />
                      </div>
                    </div>


                    <div id="divsup" className="form-group">
                      <label
                        htmlFor="cust_id"
                        className="col-sm-3 control-label"
                      >
                        Vehicle
                      </label>

                      <div className="col-sm-8">
                        <input
                          ref={weightFocus}
                          onFocus={() => {
                            selectText("v_no");
                          }}
                          onKeyDown={handleEnter}
                          className="form-control"
                          type="text"
                          value={sidestore.v_no}
                          name="v_no"
                          placeholder="Weight"
                          autocomplete="off"
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
                      <label
                        htmlFor="cust_id"
                        className="col-sm-3 control-label"
                      >
                        Size
                      </label>

                      <div className="col-sm-8">
                        <input
                          ref={weightFocus}
                          onFocus={() => {
                            selectText("size");
                          }}
                          onKeyDown={handleEnter}
                          className="form-control"
                          type="text"
                          value={sidestore.size}
                          name="size"
                          placeholder="Weight"
                          autocomplete="off"
                          onChange={getUserData}
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                          id="size"
                        />
                      </div>
                    </div>


                    <div id="divsup" className="form-group">
                      <label
                        htmlFor="cust_id"
                        className="col-sm-3 control-label"
                      >
                        Ton
                      </label>

                      <div className="col-sm-8">
                        <input
                          ref={weightFocus}
                          onFocus={() => {
                            selectText("ton");
                          }}
                          onKeyDown={handleEnter}
                          className="form-control"
                          type="number"
                          value={sidestore.ton}
                          name="ton"
                          placeholder="Weight"
                          autocomplete="off"
                          onChange={getUserData}
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                          id="ton"
                        />
                      </div>
                    </div>

                    <div id="divsup" className="form-group">
                      <label
                        htmlFor="cust_id"
                        className="col-sm-3 control-label"
                      >
                        Cft
                      </label>

                      <div className="col-sm-8">
                        <input
                          ref={weightFocus}
                          onFocus={() => {
                            selectText("cft");
                          }}
                          onKeyDown={handleEnter}
                          className="form-control"
                          type="number"
                          value={sidestore.cft}
                          name="cft"
                          placeholder="Weight"
                          autocomplete="off"
                          onChange={getUserData}
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                          id="cft"
                        />
                      </div>
                    </div>

                    <div id="divsup" className="form-group">
                      <label
                        htmlFor="cust_id"
                        className="col-sm-3 control-label"
                      >
                        Rate
                      </label>
                      <div className="col-sm-8">
                        <input
                          onFocus={() => {
                            selectText("rate");
                          }}
                          className="form-control"
                          type="number"
                          onKeyDown={handleEnter}
                          value={sidestore.rate}
                          name="rate"
                          placeholder=""
                          autocomplete="off"
                          onChange={(getUserData, total)}
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                          id="rate"
                        />
                      </div>
                    </div>
                    

                </div>
                <div class="col-md-6">
                  

                <div id="divsup" className="form-group">
                      <label
                        htmlFor="cust_id"
                        className="col-sm-3 control-label"
                      >
                        Total
                      </label>
                      <div className="col-sm-8">
                        <input
                          onFocus={() => {
                            selectText("total");
                          }}
                          className="form-control"
                          type="number"
                          value={sidestore.total}
                          onKeyDown={handleEnter}
                          name="total"
                          placeholder=""
                          autocomplete="off"
                          // disabled="true"
                          onChange={getUserData}
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                          id="total"
                        />
                      </div>
                    </div>

                 
                <div id="divsup" className="form-group">
                      <label
                        htmlFor="cust_id"
                        className="col-sm-3 control-label"
                      >
                        Load/un
                      </label>

                      <div className="col-sm-8">
                        <input
                          ref={weightFocus}
                          onFocus={() => {
                            selectText("ld_un");
                          }}
                          onKeyDown={handleEnter}
                          className="form-control"
                          type="number"
                          value={sidestore.ld_un}
                          name="ld_un"
                          placeholder="Weight"
                          autocomplete="off"
                          onChange={getUserData}
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                          id="ld_un"
                        />
                      </div>
                    </div>

                    <div id="divsup" className="form-group">
                      <label
                        htmlFor="cust_id"
                        className="col-sm-3 control-label"
                      >
                        Transport
                      </label>

                      <div className="col-sm-8">
                        <input
                          ref={weightFocus}
                          onFocus={() => {
                            selectText("transport");
                          }}
                          onKeyDown={handleEnter}
                          className="form-control"
                          type="number"
                          value={sidestore.transport}
                          name="transport"
                          placeholder="Weight"
                          autocomplete="off"
                          onChange={getUserData}
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                          id="transport"
                        />
                      </div>
                    </div>
                    <div id="divsup" className="form-group">
                      <label
                        htmlFor="cust_id"
                        className="col-sm-3 control-label"
                      >
                        Paid
                      </label>

                      <div className="col-sm-8">
                        <input
                          ref={weightFocus}
                          onFocus={() => {
                            selectText("paid");
                          }}
                          onKeyDown={handleEnter}
                          className="form-control"
                          type="number"
                          value={sidestore.paid}
                          name="paid"
                          placeholder="Weight"
                          autocomplete="off"
                          onChange={getUserData}
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                          id="paid"
                        />
                      </div>
                    </div>

                    <div id="divsup" className="form-group">
                      <label
                        htmlFor="cust_id"
                        className="col-sm-3 control-label"
                      >
                        Grand Total
                      </label>

                      <div className="col-sm-8">
                        <input
                          ref={weightFocus}
                          onFocus={() => {
                            selectText("g_total");
                          }}
                          onKeyDown={handleEnter}
                          className="form-control"
                          type="number"
                          value={sidestore.g_total}
                          name="g_total"
                          placeholder="Weight"
                          autocomplete="off"
                          onChange={getUserData}
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                          id="g_total"
                        />
                      </div>
                    </div>

                    <div id="divsup" className="form-group">
                      <label
                        htmlFor="cust_id"
                        className="col-sm-3 control-label"
                      >
                        Chalan{" "}
                      </label>

                      <div className="col-sm-8">
                        <input
                          ref={weightFocus}
                          onFocus={() => {
                            selectText("chalan");
                          }}
                          onKeyDown={handleEnter}
                          className="form-control"
                          type="number"
                          value={sidestore.chalan}
                          name="chalan"
                          placeholder="Weight"
                          autocomplete="off"
                          onChange={getUserData}
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                          id="chalan"
                        />
                      </div>
                    </div>

                    <div id="divsup" className="form-group">
                      <label
                        htmlFor="cust_id"
                        className="col-sm-3 control-label"
                      >
                        Particular
                      </label>
                      <div className="col-sm-8">
                        <input
                          onFocus={() => {
                            selectText("particular");
                          }}
                          onKeyDown={handleEnter}
                          className="form-control"
                          type="text"
                          value={sidestore.particular}
                          name="particular"
                          placeholder=""
                          autocomplete="off"
                          onChange={getUserData}
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                          id="particular"
                        />
                      </div>
               
                    </div>

                    <div id="divsup" className="pull-right">
                        <Button
                          onClick={edit ? editCart2 : getLedg}
                          variant="warning"
                        >
                          {edit ? "Update Cart" : "Add Cart"}
                        </Button>{" "}
                        {/* <Button variant="danger" onClick={editdb}>
                          Submit
                            </Button>{" "} */}
                      </div>




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

      <section className="col-lg-5 connectedSortable">
        <div className="box box-primary">
          <div className="box-header header-custom">
            <h3 className="box-title">
              <i className="fa fa-lcsCart-arrow-down"></i> Cart Item
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
                          <strong>
                            {" "}
                            {comData.length > 0 ? comData[0].comp_name : ""}
                          </strong>
                        </h3>
                        <span>
                          {" "}
                          {comData.length > 0 ? comData[0].address : ""}
                        </span>
                        <br />
                        <span>
                          Phone: {comData.length > 0 ? comData[0].contact : ""}
                        </span>
                        <br />
                        <span>
                          Email: {comData.length > 0 ? comData[0].email : ""}{" "}
                        </span>
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
                          <th width="5%">Sl</th>
                          <th width="20%">Account</th>
                          <th width="18%">Vehicle</th>
                          <th width="10%">Type</th>
                          <th width="10%">Weight</th>
                          <th width="13%">Rate</th>
                          <th width="15%">Total</th>

                          <th width="5%">Action</th>
                        </tr>
                      </thead>

                      <tbody id="tbody" className="">
                        {lcsCart.map((curElem, index) => {
                          return (
                            <tr key={index}>
                              <td width="7%" style={{ color: "#616a78" }}>
                                {index + 1}
                              </td>
                              <td width="27%" style={{ color: "#616a78" }}>
                                {curElem.lc_name}
                              </td>

                              <td width="10%" align="center">
                                {curElem.v_no}
                              </td>
                              <td width="10%" align="right">
                                {" "}
                                {curElem.type}
                              </td>
                              <td
                                width="10%"
                                style={{ color: "#616a78" }}
                                align="right"
                              >
                                {curElem.ton}
                              </td>
                              <td
                                width="10%"
                                style={{ color: "#616a78" }}
                                align="right"
                              >
                                {curElem.rate}
                              </td>
                              <td
                                width="10%"
                                style={{ color: "#616a78" }}
                                align="right"
                              >
                                {curElem.total}
                              </td>
                              <td width="5%">
                                <i
                                  className="fa fa-edit"
                                  onClick={() => {
                                    editCart(curElem.id);
                                  }}
                                ></i>
                                <i
                                  className="fa fa-remove"
                                  onClick={() => {
                                    deleteCart(curElem.id, curElem.side);
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
                            <strong id="totalQty">{lcsCart.length}</strong>{" "}
                          </th>
                          <th className="text-center" colSpan={4}>
                            Total:{" "}
                            <strong id="totalAmount">{cart_total}</strong> Tk
                          </th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="form-gorup text-center">
                    {edit ? (
                      ""
                    ) : (
                      <Button onClick={resetLp} variant="info">
                        Clear{" "}
                      </Button>
                    )}{" "}
                    <Button
                      onClick={edit ? editdb : insertData}
                      variant="primary"
                    >
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
