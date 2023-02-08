import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import LogoutIcon from '@mui/icons-material/Logout';

import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function Homepage() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const pathname = window.location.pathname

  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <h2 className="text-white fs-5 text-center py-3 mb-0">
              <span className="sm-logo">BB</span>
              <span className="lg-logo">Budget Basket</span>
            </h2>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick={({ key }) => {
              navigate(key);
            }}
            items={[
              {
                key: "",
                icon: <DashboardIcon />,
                label: "Dashboard",
              },
              {
                key: "/admin/category",
                icon: <CategoryIcon />,
                label: "Categories",
              },
              {
                key: "product",
                icon: <ProductionQuantityLimitsIcon />,
                label: "Products",
              },
              {
                key: "order",
                icon: <LocalShippingIcon />,
                label: "Orders",
              },
              {
                key: "notification",
                icon: <NotificationsActiveIcon />,
                label: "Notifications",
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="d-flex justify-content-between ps-3 pe-5"
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            {React.createElement(collapsed ? ToggleOffIcon : ToggleOnIcon, {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            })}

            <div className="d-flex gap-4 align-items-center">
              <div className="position-relative">
                <NotificationsActiveIcon />
                <span className="badge bg-warning rounded-circle p-1 position-absolute">
                  2
                </span>
              </div>
              <div className="d-flex gap-3 align-items-center">
                <div>
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/general24/png/256/administrator.png"
                    alt=""
                    width={"45"}
                    height={"40"}
                  />
                </div>
                <div>
                  <h5 className="mb-0">Admin</h5>
                  <p className="mb-0">admin@gmail.com</p>
                </div>
                <button className="btn"><LogoutIcon/></button>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Homepage;
