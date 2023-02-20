import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./admin/pages/Dashboard/Homepage";
import Login from "./common/Login/Login";
import Dashboard from "./admin/pages/Dashboard/Dashboard";
import Order from "./admin/pages/Orders/Order";
// import Categorylist from "./admin/pages/Category/Categorylist";
import AddCategory from "./admin/pages/Category/AddCategory";
import Category from "./admin/pages/Category/Category";
import EditCategory from "./admin/pages/Category/EditCategory";
import ProductList from "./admin/pages/Product/ProductList";
import AddProduct from "./admin/pages/Product/AddProduct";
import ViewProduct from "./admin/pages/Product/ViewProduct";
import EditProduct from "./admin/pages/Product/EditProduct";
import UserHomepage from "./user/pages/User_Homepage/UserHomepage";
import Layout from "./user/components/Layout";
import Store from "./user/pages/Store/Store";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Routes */}

        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
          </Route>
          <Route path="/admin/" element={<Homepage />}>
            <Route index element={<Dashboard />} />
            <Route path="order" element={<Order />} />
            {/* <Route path="category" element={<Categorylist />} /> */}
            <Route path="category" element={<Category />} />
            <Route path="category/add" element={<AddCategory />} />
            <Route path="category/edit/:id" element={<EditCategory />} />

            <Route path="product" element={<ProductList />} />
            <Route path="product/add" element={<AddProduct />} />
            <Route path="product/view/:product_id" element={<ViewProduct />} />
            <Route path="product/edit/:product_id" element={<EditProduct />} />
          </Route>


          <Route path="/home/" element={<Layout/>}>
          <Route index element={<UserHomepage />} />
          <Route path="store" element={<Store />} />
          
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
