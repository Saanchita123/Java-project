import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ProductDetailsById() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Component mounted, ID from params:", id);
    if (id) {
      fetchProductById(id);
    } else {
      setError("No product ID provided");
      setLoading(false);
    }
  }, [id]);

  const fetchProductById = async (productId) => {
    try {
      setLoading(true);
      setError(null);

      const url = `http://localhost:8081/home/products/${productId}`;
      console.log("Fetching from URL:", url);

      const response = await fetch(url);
      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received data:", data);
      setProduct(data);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading product details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">Error: {error}</div>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Product not found</div>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
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

            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-white mb-4">
                {product.name}
              </h1>
              <p className="text-gray-300 mb-2">Category: {product.category}</p>
              <p className="text-gray-400 mb-6">{product.desc}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-400">
                  ${product.price}
                </span>
              </div>

              <div className="mb-6">
                <span
                  className={`text-lg px-4 py-2 rounded ${
                    product.available
                      ? "bg-green-900 text-green-300"
                      : "bg-red-900 text-red-300"
                  }`}
                >
                  {product.available ? "Available" : "Out of Stock"}
                </span>
              </div>

              <div className="flex gap-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!product.available}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => navigate(`/update-product/${product.id}`)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
