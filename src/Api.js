import axios from "axios";
export default class Api {
  constructor() {
    const serverUrl = "http://localhost:3001/";
  }
  static getTotalSales(params = {}) {
    return axios.get("http://localhost:3001/" + "sales", { params: params });
  }
  static getOrderTotals(params = {}) {
    return axios.get("http://localhost:3001/" + "order-totals", {
      params: params,
    });
  }
  static getOrders(params = {}) {
    return axios.get("http://localhost:3001/" + "orders", {
      params: params,
    });
  }
  static getOrdersByStatus(params = {}) {
    return axios.get("http://localhost:3001/" + "orders-by-status", {
      params: params,
    });
  }
}
