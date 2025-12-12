import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const [toasts, setToasts] = useState([]);

  const API_URL = "http://localhost:8000/api";

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  };

  useEffect(() => {
    fetchNames();
  }, []);

  const fetchNames = async () => {
    try {
      const res = await axios.get(`${API_URL}/names`);
      setNames(res.data.names || []);
    } catch {
      showToast("Failed to load names", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z ]+$/;

    if (!name.trim()) {
      showToast("Name cannot be empty", "error");
      return;
    }

    if (!nameRegex.test(name)) {
      showToast("Invalid name format. Only letters allowed.", "error");
      return;
    }

    try {
      await axios.post(`${API_URL}/names`, { name });
      setName("");
      fetchNames();
      showToast("Name added!");
    } catch {
      showToast("Backend error", "error");
    }
  };

  const clearAllNames = async () => {
  if (names.length === 0) {
    showToast("No data in database", "error");
    return;
  }

  try {
    await axios.delete(`${API_URL}/names`);
    setNames([]);
    showToast("All names deleted!", "success");
  } catch {
    showToast("Failed to delete", "error");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded-md shadow-md text-white 
              ${t.type === "error" ? "bg-red-600" : "bg-green-600"}
            `}
          >
            {t.message}
          </div>
        ))}
      </div>

      <div className="bg-white w-full max-w-md p-6 mt-16 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Hello Names
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Add
          </button>
        </form>

        <button
          onClick={clearAllNames}
          className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-md mb-4"
        >
          Clear All Names
        </button>

        <ul className="space-y-2">
          {names.map((n, i) => (
            <li key={i} className="p-2 bg-gray-100 rounded-md text-gray-700">
              {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
