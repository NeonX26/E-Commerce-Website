import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import ProductPage from "./components/productPage/ProductPage";
import ProductList from "./components/productList/ProductList";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import Wishlist from "./components/wishlist/Wishlist";
import PageNotFound from "./components/404-page/PageNotFound";
import ContextProvider from "./context/ContextProvider";
import CartPage from "./components/cart/CartPage";
import Profile from "./components/profile/Profile";

function App() {
  return (
    <>
      <ContextProvider>
        <div style={{ minHeight: "80vh", width: '100%', margin: 'auto' }}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path='product-list/:category' element={<ProductList />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<Profile/>}/>
            </Routes>
          </Router>
        </div>
        <Footer />
      </ContextProvider>
    </>
  );
}

export default App;
