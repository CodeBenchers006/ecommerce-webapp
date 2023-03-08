import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";

function Order() {
  const baseURL = "http://localhost:8081/";
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(baseURL + "order/displayOrders")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const columns = [
    {
      title: "Order No.",
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

  orders.map((order) => {
    data1.push({
      key: order.orderId,
      customer: order.customerName,
      product: order.productName,
      date: order.orderDate,
      address: order.address,
      status: order.status,
    });
  });

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
