import React from "react";
import { Table } from "antd";

function Order() {
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },

    {
      title: "Customer",
      dataIndex: "customer",
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  const data1 = [];

  for (let i = 1; i <= 4; i++) {
    data1.push({
      key: i,
      customer: `Edward King ${i}`,
      product: "Iphone 14",
      date: "01-02-23",
      address: `London, Park Lane no. ${i}`,
      status: "Dispatched",
    });
  }

  return (
    <div>
      <h3 className="mb-3">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
}

export default Order;
