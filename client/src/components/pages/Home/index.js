import React, { useEffect, useState } from "react";
import { Footer, Slidebar } from "../../organisms";
import Banner from "../../organisms/Banner";
import { useLocation } from "react-router-dom";
import path from "../../../utils/path";
import Product from "../../organisms/Products";
import { useSelector } from "react-redux";
import { apiGetBanner, apiGetProduct } from "../../../services/productService";

const Home = () => {
  const [banner, setBanner] = useState("");
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const getApiBanner = async () => {
    const response = await apiGetBanner();
    console.log(response);
    if (response.status === "Success") {
      setBanner(response.data);
      setLoading(false);
    }
  };

  const getApiProduct = async () => {
    const response = await apiGetProduct();
    if (response.status === "Success") {
      setProduct(response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiProduct() && getApiBanner();
  }, []);
  return (
    <div>
      {loading ? (
        ""
      ) : (
        <div className="w-main flex mt-3 ">
          <div className="flex-2 flex rounded-md bg-opacity-90 bg-white mx-6  ">
            <Slidebar />
          </div>
          <div className="flex flex-col justify-start items-start flex-8 rounded-lg bg-opacity-90 mr-4 h-[541px] overflow-y-auto scrollbar-hide">
            <div className="flex flex-col gap-2 ">
              <Banner banner={banner} />
              <Product product={product} />
            </div>
            {location.pathname.slice(1) === path.HOME ? <Footer /> : ""}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
