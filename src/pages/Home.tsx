import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [sortByTitle, setSortByTitle] = useState<Boolean | null>(null);
  const [sortByPrice, setSortByPrice] = useState<Boolean | null>(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data: Product[]) => {
        setProducts(data);
      });
  }, []);

  const handleSortByTitle = () => {
    const sorted = [...(products || [])].sort((a, b) => {
      if (sortByTitle === null || sortByTitle === false) {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setProducts(sorted);
    setSortByTitle(!sortByTitle);
    setSortByPrice(null);
  };

  const handleSortByPrice = () => {
    const sorted = [...(products || [])].sort((a, b) => {
      if (sortByPrice === null || sortByPrice === false) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setProducts(sorted);
    setSortByPrice(!sortByPrice);
    setSortByTitle(null);
  };

  if (!products) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <svg viewBox="25 25 50 50" className="">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center">Products</h1>
      <div className="text-center m-2 p-2">
        Sort by:
        <button
          onClick={handleSortByTitle}
          className={`mx-2 ${
            sortByTitle ? "font-bold text-blue-500" : ""
          }`}
        >
          Title
        </button>
        <button
          onClick={handleSortByPrice}
          className={`${
            sortByPrice ? "font-bold text-blue-500" : ""
          }`}
        >
          Price
        </button>

      </div>
      <div className="flex flex-wrap justify-center">
        {products.map(product => (
          <div key={product.id} className="max-w-xs min-w-[20rem] bg-white shadow-lg rounded-lg overflow-hidden m-4 flex flex-col">
            <img className="w-full h-48 object-cover object-center" src={product.image} alt={product.title} />
            <div className="p-4 flex-grow">
              <h2 className="text-gray-800 text-lg font-semibold">{product.title}</h2>
              <p className="mt-2 text-gray-600">${product.price}</p>
            </div>
            <div className="p-4">
              <Link to={`/product/${product.id}`} className="text-center block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
