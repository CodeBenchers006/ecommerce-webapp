import { Column } from "@ant-design/plots";
import { Table } from "antd";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

function Dashboard() {
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

  const data = [
    {
      type: "Jan",
      sales: 38,
    }
  ];

  const data2 =[]


  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };

  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className=" row d-flex justify-content-between align-items-center gap-3">
        <div className="col-lg-3 d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p>Total Customers</p>
            <h2 className="mb-0">1000</h2>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>32%</h6>
            <p className="mb-0">Compare to April 2023</p>
          </div>
        </div>
        <div className="col-lg-3 d-flex justify-content-between  align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p>Total Orders</p>
            <h2 className="mb-0">1000</h2>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>32%</h6>
            <p className="mb-0">Compare to April 2023</p>
          </div>
        </div>
        <div className="col-lg-3 d-flex justify-content-between align-items-end flex-grow-1  bg-white p-3 rounded-3">
          <div>
            <p>Total Earnings</p>
            <h2 className="mb-0">1000</h2>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>32%</h6>
            <p className="mb-0">Compare to April 2023</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Sale Statics</h3>
        <div>
          <Column {...config} />;
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
