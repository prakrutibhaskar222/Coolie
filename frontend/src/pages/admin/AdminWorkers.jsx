import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkers = async () => {
    try {
      const res = await api.get("/api/admin/workers");
      console.log("Workers API response:", res.data);

      if (res.data?.success && Array.isArray(res.data.data)) {
        setWorkers(res.data.data);
      } else {
        console.error("Unexpected response format", res.data);
      }
    } catch (err) {
      console.error("Error loading workers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  return (
    <AdminLayout>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Workers</h2>
        <Link
          to="/admin/workers/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Worker
        </Link>
      </div>

      {loading ? (
        <p>Loading workers…</p>
      ) : (
        <div className="bg-white shadow rounded">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Username (Email)</th>
                <th className="p-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {workers.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    No workers found
                  </td>
                </tr>
              ) : (
                workers.map((w) => (
                  <tr key={w._id} className="border-b">
                    <td className="p-2">
  {w.name || w.email?.split("@")[0] || "—"}
</td>

                    <td className="p-2">{w.email}</td>
                    <td className="p-2">{w.phone || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminWorkers;
