import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";

const AddWorker = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await api.post(
        "/api/admin/register-worker",
        form
      );

      if (!res.data?.success) {
        throw new Error(
          res.data?.message || "Failed to create worker"
        );
      }

      navigate("/admin/workers");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-xl font-bold mb-4">
        Add Worker
      </h2>

      <form
        onSubmit={submit}
        className="max-w-md space-y-3"
      >
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded">
            {error}
          </div>
        )}

        <input
          name="name"
          placeholder="Name"
          className="input w-full"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Username / Email"
          className="input w-full"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          className="input w-full"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input w-full"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Worker"}
        </button>
      </form>
    </AdminLayout>
  );
};

export default AddWorker;
