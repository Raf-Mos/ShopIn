import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

export default function ProductList() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <AdminMenu />
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create Product</h2>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          {imageUrl && (
            <div className="mb-4">
              <img
                src={imageUrl}
                alt="product"
                className="max-h-[200px] mx-auto"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block border text-center p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price" className="block mb-1">Price</label>
              <input
                type="number"
                id="price"
                className="w-full p-2 border rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block mb-1">Quantity</label>
              <input
                type="number"
                id="quantity"
                className="w-full p-2 border rounded"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="brand" className="block mb-1">Brand</label>
              <input
                type="text"
                id="brand"
                className="w-full p-2 border rounded"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description" className="block mb-1">Description</label>
              <textarea
                id="description"
                className="w-full p-2 border rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="stock" className="block mb-1">Count In Stock</label>
              <input
                type="number"
                id="stock"
                className="w-full p-2 border rounded"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category" className="block mb-1">Category</label>
              <select
                id="category"
                className="w-full p-2 border rounded"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}