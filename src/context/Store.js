import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
export const Context = React.createContext();
// http://localhost:3009
// http://server.fahimtraders.com/
const Store = ({ children }) => {
  const [serverUrl, setServerurl] = useState("http://server.fahimtraders.com");
  const [tinu, setTinu] = useState("jayed");
  const [edit, setEdit] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [ sellData, setSellData] = useState([]);
  const [productList, setproductList] = useState([]);
  const [sproductList, setSproductList] = useState([]);
  const [shead, setShead] = useState([]);
  const [comData, setComdata] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCart, setisCart] = useState(false);
  const [accounts, setAccounts] = useState({
    id: new Date().getTime().toString(),
    sell_type: "SELL",
    bill_type: "",
    account: "1",
    particular: "",
    p_id: "",
    product: "",
    qty1: "0",
    qty2: "0",
    rate: "0",
    total: "0",
    memo: "",
  });
  const [optionlcclient, setOptionlcclient] = useState( { value: "", label: "Select Account..." });
  const [optionSelectedaccount, setOptionSelectedaccount] = useState( { value: "", label: "Select Lc..." });
  const [optionSelectedtransaction, setOptionSelectedtransaction] = useState( { value: "", label: "" });



  const [editItem, setEditItem] = useState(null)

  const getComdata = () => {
    Axios.get(serverUrl+`/comd`).then((response) => {
      setComdata(response.data);
    });
    console.log(comData);
  };


  const getProduct = async () => {
    await getProductstock();
    Axios.get(serverUrl+`/product`).then((response) => {
      setproductList(response.data);
    });
    console.log(productList);
  };

  const getSelldata = () => {
    Axios.get(serverUrl+`/selldata`).then((response) => {
      setSellData(response.data);
    });
    console.log(sellData);
  };

  const getAccounts = async() => {
    await getCustomerdue();
    Axios.get(serverUrl+`/employees`).then((response) => {
      setAccountList(response.data);
    });
    console.log(accountList);
  };

  const getTransaction = () => {
    Axios.get(serverUrl+`/transaction`).then((response) => {
      setTransaction(response.data);
    });
    console.log(transaction);
  };

  const getShead = () => {
    Axios.get(serverUrl+`/shead`).then((response) => {
      setShead(response.data);
      console.log(response.data);
    });
    console.log(shead);
  };

  const getProductstock = () => {
    Axios.get(serverUrl+`/productstock`).then((response) => {
      // setShead(response.data);
      console.log(`a`+response.data);
    });
    // console.log(shead);
  };

  const getCustomerdue = () => {
    Axios.get(serverUrl+`/customerdue`).then((response) => {
      // setShead(response.data);
      console.log(`a`+response.data);
    });
    // console.log(shead);
  };

  const getSelectedproduct = (props) => {
    Axios.put(serverUrl+`/sproduct`,{
      id: props,
    }).then((response) => {
      setSproductList(response.data);
      console.log(response.data);
    });

  };
//
  const notify = () =>
    toast.success("Task completed", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });


    const successnotify = (msg) =>
    toast.success(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const warningnotify = (msg) =>
    toast.warning(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const dataInsert  = (url,accounts) => {
    // e.preventDefault();
    Axios.post(url, {
      adata: accounts,
    }).then(() => {
      notify();
      setEdit(false);
      getAccounts();
      getTransaction();
      // searchInput.current.focus();
    });
  };


  const cartDatainsert = (url,cart) => {
    
    // e.preventDefault();
    Axios.post(url, {
      adata: cart,
    }).then(() => {
      notify();
      console.log("hey boyo")
      // setEdit(false);
      // searchInput.current.focus();
    });
  };

  const editcartdb = (url,cart) => {
    // e.preventDefault();
    Axios.put(url, {
      adata: cart,
    }).then(() => {
      notify();
      // console.log("hey boyo")
      // setEdit(false);
      // searchInput.current.focus();
    });
  };



  const selectAcccount = (props,findurl) => {
    Axios.put(findurl, {
      id: props,
    }).then((response) => {
      setEditItem(response.data[0]);
      setEdit(true);
      setOptionSelectedtransaction({ value: response.data[0].cus_id, label: response.data[0].name})
      console.log(response.data[0]);
    });
    // console.log(props);
  };

  const selectSell = (props,findurl) => {
    Axios.put(findurl, {
      id: props,
    }).then((response) => {
      setCart(response.data);
      setEdit(true);
      setAccounts({ ...accounts, 
    sell_type: response.data[0].s_type,
    bill_type: response.data[0].b_type,
    account: "1",
    particular:response.data[0].comments,
    qty1: "0",
    qty2: "0",
    rate: "0",
    total: "0",
    memo: "",
  });

    setOptionSelectedaccount({ value: response.data[0].cus_id, label: response.data[0].name})
    setisCart(!isCart)
      console.log(response.data);
    });
    // console.log(editItem);
  };

  const updateData = (url,accounts) => {
    // e.preventDefault();
    Axios.put(url, {
      adata: accounts,
      // id: currentUserId,
    }).then(() => {
      // setAccounts([])
      setEditItem(null)
      setEdit(false);
      notify();
      setOptionSelectedtransaction({ value: "", label: ""})
      // setTimeout(inputRef.current.focus(), 3000);
      // inputRef.current.focus();
      // searchInput.current.focus();
    });
  };

  const deleteAcccount = (props,deleteurl) => {
    Axios.put(deleteurl, {
      id: props,
    }).then(() => {
      notify();
      // setAccounts(response.data[0]);
      // setEdit(true);
      // console.log(response.data[0]);
    });
    // console.log('ssssssssssss'+deleteurl);
  };

  const inputRef = useRef();
  // let name, value;
  // const getUserData = (event) => {
  //   name = event.target.name;
  //   value = event.target.value;

  //   setAccounts({ ...accounts, [name]: value });
  // };

// for import business***
// account section












//lc section
const [lcpCart, setLcpCart] = useState([]);
const [lcpurchasestore, setLcpurchasestore] = useState({
  date: "",
  lc_id: "",
  lc_name: "",
  v_no: "",
  type: "",
  ind_w: "0",
  bhu_w: "0",
  posted: "ja-471",
});

const [goodsList, setGoodslist] = useState([]);
const [ lcPurchase, setLcpurchase] = useState([]);
const getLc = async() => {
  Axios.get(serverUrl+`/lc`).then((response) => {
    setAccountList(response.data);
  });
  console.log(accountList);
};

const getGoods = async() => {
  Axios.get(serverUrl+`/goods`).then((response) => {
    setGoodslist(response.data);
  });
  console.log(goodsList);
};

const getLcpdata  = async () => {
  await Axios.get(serverUrl+`/lcpurchsasedata`).then((response) => {
    setLcpurchase(response.data);
  });
  console.log(lcPurchase);
};


const selectlcpurchase = (props,findurl) => {
  Axios.put(findurl, {
    id: props,
  }).then((response) => {
    setCart(response.data);
    setEdit(true);
    setLcpurchasestore({ ...lcpurchasestore, 
 
  v_no: "",
  type: "",
  ind_w: "0",
  bhu_w: "0",
  posted: "ja-471",
});

  setOptionSelectedaccount({ value: response.data[0].lc_no, label: response.data[0].lc_name})
  setisCart(!isCart)
    console.log(response.data);
  });
  // console.log(editItem);
};

const updateLcpur = (url,accounts) => {
  // e.preventDefault();
  Axios.put(url, {
    adata: accounts,
    // id: currentUserId,
  }).then(() => {
    // setAccounts([])
    setEditItem(null)
    setEdit(false);
    notify();
    setOptionSelectedaccount({ value: "", label: ""})
    // setTimeout(inputRef.current.focus(), 3000);
    // inputRef.current.focus();
    // searchInput.current.focus();
  });
};




const deleteLcpur = (props,findurl) => {
  alert("Are you sure?")
  Axios.put(findurl, {
    id: props,
  }).then((response) => {
    getLcpdata();
    notify();
    
  });
  // console.log(editItem);
};



const deleteCartitem = (deleteurl,props) => {
  Axios.put(deleteurl, {
    adata: props,
  }).then(() => {
    getLcpdata();
    notify();
  });
};




//lc sell

const [lcsCart, setLcsCart] = useState([]);
const [lcsellstore, setLcsellstore] = useState({
  date: "",
  client_id: "",
  client_name: "",
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
  posted: "ja-471",
});
const [lpvehicle, setLpvehicle] = useState([]);

const getLcpvehicle = async () => {
  // await getProductstock();
  Axios.get(serverUrl+`/getlcpurv`).then((response) => {
    setLpvehicle(response.data);
  });
  console.log(lpvehicle);
};

const getSelectedlcvehicle = (props,country) => {
  console.log(country);
  Axios.put(serverUrl+`/getslpvehicle`,{
    id: props,
    country:country,
  }).then((response) => {
    setSproductList(response.data);
    console.log(response.data[0].ind_weight);
    setLcsellstore({
      ...lcsellstore,
      v_no: response.data[0].v_no,
      type: response.data[0].type,
      ind_w: response.data[0].ind_weight,
      bhu_w: response.data[0].b_weight,
      ton: country=='india'?response.data[0].b_weight:response.data[0].ind_weight,
    });
  });


};

















useEffect(() => {
  window.addEventListener("beforeunload", alertUser);
  return () => {
    window.removeEventListener("beforeunload", alertUser);
  };
}, []);
const alertUser = (e) => {
  e.preventDefault();
  e.returnValue = "";
};



  // useEffect(() => {
  //   getTransaction();
  //   getAccounts();
  //   getSelldata();
  //   getLcpdata();
  //   getComdata();
  // }, [edit]);

  return (
    <Context.Provider
      value={{
        lcsCart, setLcsCart,
        setLcpCart,
        lcpCart,
        getSelectedlcvehicle,
        getLcpvehicle,
        lpvehicle, setLpvehicle,
        setLcsellstore,
        lcsellstore,
        optionlcclient,
        setOptionlcclient,
        getComdata,
        comData,
        getLcpdata,
        deleteLcpur,
        deleteCartitem,
        updateLcpur,
        selectlcpurchase,
        lcpurchasestore,
        setLcpurchasestore,
        lcPurchase,
        getGoods,
        goodsList,
        getLc,
        serverUrl,
        getProductstock,
        editcartdb,
        setOptionSelectedtransaction,optionSelectedtransaction,
        setTransaction,transaction,
        setisCart,isCart,
        optionSelectedaccount, setOptionSelectedaccount,
        accounts, 
        setAccounts,
        setCart,
        cart,
        setSproductList,
        sproductList,
        selectSell,
        sellData,
        getSelectedproduct,
        sproductList,
        getProduct,
        productList,
        warningnotify,
        successnotify,
        tinu,
        accountList,
        cartDatainsert,
        editItem,
        setEditItem,
        dataInsert,
        ToastContainer,
        notify,
        getShead,
        shead,
        getAccounts,
        selectAcccount,
        edit,
        setEdit,
        updateData,
        deleteAcccount,
        // getUserData,
        inputRef,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Store;
