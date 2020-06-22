import React, { createContext, useEffect, useReducer } from "react";
import { useImmerReducer } from "use-immer";
import Api from "../Api";
import moment from "moment";

const initialState = {
  loading: false,
  sales: null,
  order_totals: null,
  orders_by_status: null,
  date_min: moment().format("YYYY-MM-DD"),
  date_max: moment().format("YYYY-MM-DD"),
};
export const AppStoreContext = createContext(initialState);

const reducer = function (draft, action) {
  switch (action.type) {
    case "SET_SALES":
      draft.sales = action.payload;
      return;
    case "SET_ORDER_TOTALS":
      draft.order_totals = action.payload;
      return;
    case "CHANGE_FILTER_DATE":
      draft.date_min = action.payload.date_min;
      draft.date_max = action.payload.date_max;
      return;
    case "CHANGE_FILTER_TYPE":
      draft.filter_type = action.payload;
      return;
    case "SET_ORDER_BY_STATUS":
      draft.orders_by_status = action.payload[0];
      return;
    default:
      return draft;
  }
};

export const AppStoreContextProvider = (props) => {
  const [store, dispatch] = useImmerReducer(reducer, initialState);

  const { date_min, date_max } = store;

  const params = {
    date_min,
    date_max,
  };

  // Get initial sales
  useEffect(() => {
    function getSales() {
      Api.getTotalSales(params)
        .then(function (response) {
          dispatch({ type: "SET_SALES", payload: response.data });
        })
        .catch((e) => console.log(e));
    }

    function getOrderTotals() {
      Api.getOrderTotals(params)
        .then(function (response) {
          dispatch({ type: "SET_ORDER_TOTALS", payload: response.data });
        })
        .catch((e) => console.log(e));
    }
    function getOrdersByStatus() {
      Api.getOrdersByStatus(params)
        .then(function (response) {
          dispatch({ type: "SET_ORDER_BY_STATUS", payload: response.data });
        })
        .catch((e) => console.log(e));
    }

    getSales();
    getOrderTotals();
    getOrdersByStatus();
  }, [date_min, date_max]);

  return (
    <AppStoreContext.Provider value={{ store, dispatch }}>
      {props.children}
    </AppStoreContext.Provider>
  );
};
