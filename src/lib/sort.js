import Util from './util.js'

export default class Sort {
  constructor(orderType, orderBy, fallback) {
    this.setOrder_type(orderType);
    this.setOrder_by(orderBy, fallback);
  }

  setOrder_type(orderType) {
    this.order_type = Sort.isDesc(orderType) ? orderType : "ASC";
  }

  setOrder_by(orderBy, fallback) {
    if (!Util.isNullOrEmpty(orderBy)) {
      this.order_by = orderBy;
    } else {
      this.order_by = fallback;
    }
  }

  static isDesc(orderType) {
    if (!Util.isNullOrEmpty(orderType)) {
      orderType = orderType.trim().toUpperCase();

      return orderType == "DESC";
    } else {
      return false;
    }
  }
}
