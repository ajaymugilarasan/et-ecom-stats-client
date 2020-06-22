import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AppStoreContext } from "./store/AppStore";
import moment from "moment";
import OrdersByStatus from "./components/OrdersByStatus";

function App() {
  const { store, dispatch } = useContext(AppStoreContext);

  const handleChangeFilter = (e) => {
    const { payload, value } = handlgeDateRangeChange(e);
    dispatch({
      type: "CHANGE_FILTER_DATE",
      payload,
    });
    dispatch({
      type: "CHANGE_FILTER_TYPE",
      value,
    });
  };

  const handleChangeOrderStatusFilter = (e) => {
    const { payload, value } = handlgeDateRangeChange(e);
    dispatch({
      type: "SET_ORDER_FILTER_TYPE",
      payload: value,
    });
    dispatch({
      type: "SET_ORDER_FILTER",
      payload: payload,
    });
  };

  const handlgeDateRangeChange = (e) => {
    const { value } = e.target;
    let payload;
    if (value === "today") {
      payload = {
        date_min: moment().format("YYYY-MM-DD"),
        date_max: moment().format("YYYY-MM-DD"),
      };
    } else if (value === "yesterday") {
      payload = {
        date_min: moment()
          .subtract(1, "day")
          .startOf("day")
          .format("YYYY-MM-DD"),
        date_max: moment().subtract(1, "day").endOf("day").format("YYYY-MM-DD"),
      };
    } else if (value === "last-month") {
      payload = {
        date_min: moment()
          .subtract(1, "months")
          .startOf("month")
          .format("YYYY-MM-DD"),
        date_max: moment()
          .subtract(1, "months")
          .endOf("month")
          .format("YYYY-MM-DD"),
      };
    } else if (value === "last-three-months") {
      payload = {
        date_min: moment()
          .subtract(2, "months")
          .startOf("month")
          .format("YYYY-MM-DD"),
        date_max: moment().endOf("month").format("YYYY-MM-DD"),
      };
    } else {
      payload = {
        date_min: moment().startOf("month").format("YYYY-MM-DD"),
        date_max: moment().endOf("month").format("YYYY-MM-DD"),
      };
    }

    return { payload, value };
  };

  const handleChangeOrderDateFilter = (e) => {
    const { payload, value } = handlgeDateRangeChange(e);
    dispatch({
      type: "CHANGE_ORDER_FILTER",
      payload: value,
    });
    dispatch({
      type: "CHANGE_ORDER_DATE_RANGE_TYPE",
      payload: {
        before: moment(payload.date_max).format("YYYY-MM-DDTHH:mm:ss"),
        after: moment(payload.date_min).format("YYYY-MM-DDTHH:mm:ss"),
      },
    });
  };
  return (
    <div className="container-small">
      <header className="py-2 bg-dark text-white px-3">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-6">
            <h4 className="font-weight-bold">Essential Traditions</h4>
          </div>
          <div className="col-lg-6 text-right">
            <p className="p-0 m-0">
              Filter{" "}
              <select
                className="form-control form-control-sm d-inline w-auto"
                value={store.filter_type}
                onChange={handleChangeFilter}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="this-month">This month</option>
                <option value="last-month">Last Month</option>
                <option value="last-three-months">Last 3 Months</option>
              </select>
            </p>
          </div>
        </div>
      </header>

      {store.sales && (
        <div className="order-totals mt-3">
          <table className="table table-sm table-bordered">
            <thead className="bg-light">
              <tr>
                <th colSpan={2}>Sales</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Sales</td>
                <td className="w-25 text-right">
                  ₹{" "}
                  {parseFloat(store.sales[0].total_sales).toLocaleString(
                    "en-IN"
                  )}
                </td>
              </tr>
              <tr>
                <td>Net Sales</td>
                <td className="w-25 text-right">
                  ₹{" "}
                  {parseFloat(store.sales[0].net_sales).toLocaleString("en-IN")}
                </td>
              </tr>
              <tr>
                <td>Average Sales</td>
                <td className="w-25 text-right">
                  ₹{" "}
                  {parseFloat(store.sales[0].average_sales).toLocaleString(
                    "en-IN"
                  )}
                </td>
              </tr>
              <tr>
                <td>Total Orders</td>
                <td className="w-25 text-right">
                  ₹{" "}
                  {parseFloat(store.sales[0].total_orders).toLocaleString(
                    "en-IN"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <br />

      <OrdersByStatus />

      <br />

      {store.order_totals && (
        <div className="order-totals ">
          <table className="table table-sm table-bordered">
            <thead className="bg-light">
              <tr>
                <th colSpan={2}>Orders Totals (Overall)</th>
              </tr>
            </thead>
            <tbody>
              {store.order_totals &&
                store.order_totals.map((status) => (
                  <tr key={status.slug}>
                    <td>{status.name}</td>
                    <td className="text-right w-25">{status.total}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
