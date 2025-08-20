import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    category: '',
    desc: '',
    price: '',
    available: false
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/home/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    const response = await fetch(`http://localhost:8081/home/product/${id}`, {
      method: 'PUT', // or 'POST' depending on your API
      body: formData
    });

    if (response.ok) {
      alert("Product updated successfully!");
      navigate(`/product/${id}`);
    } else {
      const errText = await response.text();
      alert("Update failed: " + errText);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg w-full max-w-xl" encType="multipart/form-data">
        <h1 className="text-white text-2xl mb-6">Update Product</h1>

        <input name="name" value={product.name} onChange={handleChange}
          placeholder="Product Name" className="w-full mb-4 p-2 rounded" />

        <input name="category" value={product.category} onChange={handleChange}
          placeholder="Category" className="w-full mb-4 p-2 rounded" />

        <textarea name="desc" value={product.desc} onChange={handleChange}
          placeholder="Description" className="w-full mb-4 p-2 rounded" />

        <input type="number" name="price" value={product.price} onChange={handleChange}
          placeholder="Price" className="w-full mb-4 p-2 rounded" />

        <label className="text-white flex items-center gap-2 mb-4">
          <input type="checkbox" name="available" checked={product.available} onChange={handleChange} />
          Available
        </label>

        <input type="file" accept="image/*" onChange={handleImageChange}
          className="w-full mb-4 p-2 rounded bg-white" />

        <button type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}
