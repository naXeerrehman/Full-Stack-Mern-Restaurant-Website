import { useState, useEffect } from "react";
import axios from "axios";

const FoodCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(null);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/categories`);
      setCategories(response.data);
    } catch (err) {
      console.error(
        err.response?.data?.message || "Failed to fetch categories"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Create new category
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/categories${id}`, { label: newCategory });
      setCategories([...categories, response.data]);
      setNewCategory("");
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  // Update category
  const handleUpdate = async (id) => {
    if (!editValue.trim()) return;

    try {
      setLoading(true);
      const response = await axios.put(`${`${BACKEND_URL}/api/categories/`}/${id}`, {
        label: editValue,
      });
      setCategories(
        categories.map((cat) => (cat._id === id ? response.data : cat))
      );
      setEditingId(null);
      setEditValue("");
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/categories/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to delete category");
    }
  };

  // Filter categories
  const filteredCategories = filter
    ? categories.filter((cat) => cat.label.includes(filter))
    : categories;

  return (
    <div className="mx-auto rounded-lg shadow-md max-w-lg px-4 mt-8">
      <h1 className="bg-red-600 text-white text-xl md:text-2xl rounded-md mt-2 px-1/2 py-2 font-semibold text-center lg:text-md">
        Food Categories Manager
      </h1>

      {/* Add New Category Form */}
      <form onSubmit={handleCreate} className="mb-8">
        <h2 className="text-xl text-white font-semibold mb-4">
          Add New Category
        </h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter category name"
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!newCategory.trim()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>

      {/* Categories List */}
      <div>
        <h2 className="text-xl text-white font-semibold mb-4">
          Categories List
        </h2>
        {loading && !categories.length ? (
          <p className="text-center py-4">Loading categories...</p>
        ) : filteredCategories.length === 0 ? (
          <p className="text-center py-4">No categories found</p>
        ) : (
          <ul className="divide-y divide-gray-200 text-white">
            {filteredCategories.map((category) => (
              <li key={category._id} className="py-4">
                {editingId === category._id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 w-3 text-black p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      onClick={() => handleUpdate(category._id)}
                      disabled={loading}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditValue("");
                      }}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-lg">{category.label}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(category._id);
                          setEditValue(category.label);
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FoodCategories;
