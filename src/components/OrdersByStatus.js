import React, { useContext } from "react";
import { AppStoreContext } from "../store/AppStore";

function OrdersByStatus(props) {
  const { store, dispatch } = useContext(AppStoreContext);

  const { orders_by_status } = store;

  return (
    <table className="table table-sm table-bordered">
      <tbody>
        <tr>
          <td colSpan={2} className="font-weight-bold">
            Orders By Status
          </td>
        </tr>
        {orders_by_status &&
          orders_by_status.map((item) => (
            <tr key={item.status_key}>
              <td>{item.status}</td>
              <td className="w-25 text-right">{item.count}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default OrdersByStatus;
