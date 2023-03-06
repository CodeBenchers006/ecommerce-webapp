import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";

function Sales() {
  const baseURL = "http://localhost:8081/";

  const [sales, setSales] = useState("");
  const navigate = useNavigate();

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },

    {
      title: "Product Name",
      dataIndex: "product",
    },
    {
      title: "Total Sales",
      dataIndex: "totalsales",
    }
  ];

  const data1 = [];

  useEffect(() => {
    fetch(baseURL + "sales/checkAllSales")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSales(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  sales&&sales.map((item, index) => {
    index += 1;
    data1.push({
      key: index,
      product: item.product.name,
      totalsales: item.totalSales
    });
  });

  return (
    <div>
      <h3 className="mb-3">Sales List</h3>
      <div className="mb-4">
        
      </div>
      <div>
        {sales.length>0?(
            <Table columns={columns} dataSource={data1} />
        ):(
            <h6>No Sales Record Found</h6>
        )
        }
      </div>
    </div>
  );
}

export default Sales;
