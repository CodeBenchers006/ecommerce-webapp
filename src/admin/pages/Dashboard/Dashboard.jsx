import React from "react";
import { Column } from "@ant-design/plots";
import { Table } from "antd";

function Dashboard() {
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

  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "Jul",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
  ];
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
