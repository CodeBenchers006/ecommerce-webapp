import React, { useEffect, useState } from "react";
import { Table } from "antd";

function Order() {
  const baseURL = "http://localhost:8081/";
  
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

    const cd=new Date()
    var dd = new Date(order.orderDate);
    dd.setDate(dd.getDate() + 7);

    console.log(cd<dd)

    
    var status= cd<dd?("Dispatched, will be delivered in 7 business days, estimated delivery date: "+dd):("Package delivered on "+dd)

    data1.push({
      key: order.orderId,
      customer: order.customerName,
      product: order.productName,
      date: order.orderDate,
      address: order.address,
      status: status,
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
