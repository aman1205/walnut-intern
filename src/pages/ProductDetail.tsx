// ProductDetail.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: any;
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data: Product) => setProduct(data));
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <svg viewBox="25 25 50 50" className="">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    );
  }

  return (
    <>
      <Link to={`/`} className="">
        {" "}
        <img
          className="ml-2"
          width="50"
          height="50"
          src="https://img.icons8.com/ios-filled/50/000000/circled-left-2.png"
          alt="circled-left-2"
        />
      </Link>
      <div className="w-screen flex justify-center items-center">
        <div className="max-w-md  bg-white shadow-lg rounded-lg overflow-hidden ">
          <div className="md:flex">
            <div className="w-full p-4">
              <img
                className="w-full h-64 object-cover object-center"
                src={product.image}
                alt={product.title}
              />
            </div>
            <div className="w-full p-4">
              <h1 className="text-gray-800 text-3xl font-semibold">
                {product.title}
              </h1>
              <p className="mt-2 text-gray-600">${product.price}</p>
              <p className="mt-2 text-gray-600">{product.description}</p>
              <p className="mt-2 text-gray-600">Category: {product.category}</p>
              <p className="mt-2 text-gray-600">
                Rating : {product.rating.rate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
