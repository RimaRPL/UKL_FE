"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateProfil() {
  const [formData, setFormData] = useState({
     id: "",
    nama_pelanggan: "",
    alamat: "",
    telepon: "",
    gender: "Laki-laki",
  });

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const res = await fetch("https://learn.smktelkom-mlg.sch.id/ukl1/api/profil");
        const result = await res.json();

        if (res.ok && result.status) {
          setFormData({
            id: result.data.id || "",
            nama_pelanggan: result.data.nama_pelanggan || "",
            alamat: result.data.alamat || "",
            telepon: result.data.telepon || "",
            gender: result.data.gender || "Laki-laki",
          });
        } else {
          toast.error("Gagal memuat data profil.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Terjadi kesalahan saat mengambil data profil.");
      }
    };

    fetchProfil();
  }, []);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://learn.smktelkom-mlg.sch.id/ukl1/api/update/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.status) {
        toast.success("Profil berhasil diperbarui!");
      } else {
        toast.error(result.message || "Gagal memperbarui profil.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Terjadi kesalahan saat memperbarui profil.");
    }
  };

  return (
    <div className=" text-black min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-blue-700 text-center">
          Update Profil
        </h2>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Nama Pelanggan
          </label>
          <input
            type="text"
            name="nama_pelanggan"
            value={formData.nama_pelanggan}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Alamat</label>
          <textarea
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan alamat lengkap"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Telepon</label>
          <input
            type="text"
            name="telepon"
            value={formData.telepon}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="08xxxxxxxxxx"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300"
        >
          Simpan Perubahan
        </button>
        <button
          type="button"
          onClick={() => (window.location.href = "/matkul")}
          className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
        >
          Kembali ke Halaman Sebelumnya
        </button>

        <ToastContainer position="top-right" autoClose={3000} />
      </form>
    </div>
  );
}