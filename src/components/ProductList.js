import React, { useState, useEffect } from "react";
import { Plus, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8081/home/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleViewProduct = (productId) => {
    console.log("Navigating to product with ID:", productId);
    navigate(`/product/${productId}`);
  };
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // Assuming DELETE endpoint exists
        const response = await fetch(
          `http://localhost:8081/home/product/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setProducts(products.filter((p) => p.id !== productId));
        } else {
          alert("Failed to delete product");
        }
      } catch (err) {
        alert("Error deleting product: " + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <button
            onClick={() => navigate("/add-product")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                <img
                  src={`http://localhost:8081/home/product/${product.id}/image`}
                  alt={product.name}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/no-image.png"; // fallback image
                  }}
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-300 text-sm mb-2">{product.category}</p>
                <p className="text-gray-400 mb-3 text-sm">{product.desc}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-blue-400">
                    ${product.price}
                  </span>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      product.available
                        ? "bg-green-900 text-green-300"
                        : "bg-red-900 text-red-300"
                    }`}
                  >
                    {product.available ? "Available" : "Out of Stock"}
                  </span>
                  <button
                    onClick={() => handleViewProduct(product.id)}
                    className="bg-blue-900 hover:bg-blue-800 text-blue-300 px-3 py-2 rounded-md flex items-center justify-center transition-colors"
                  >
                    <Eye size={16} />
                    View
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-900 hover:bg-red-800 text-red-300 px-3 py-2 rounded-md flex items-center justify-center transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <p>No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
