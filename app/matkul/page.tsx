"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Matkul {
  id: string;
  nama_matkul: string;
  sks: number;
}

export default function MatkulPage() {
  const [matkulList, setMatkulList] = useState<Matkul[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasilSimpan, setHasilSimpan] = useState<{ totalSks: number; matkulTerpilih: string[] } | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchMatkul() {
      try {
        const res = await fetch("https://learn.smktelkom-mlg.sch.id/ukl1/api/getmatkul");
        const data = await res.json();

        if (data.status && Array.isArray(data.data)) {
          setMatkulList(data.data);
        } else {
          setError("Data mata kuliah tidak ditemukan.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Terjadi kesalahan saat mengambil data.");
      }
    }

    fetchMatkul();
  }, []);

  const togglePilihan = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSimpan = async () => {
    const selectedMatkul = matkulList.filter((m) => selected.includes(m.id));
    const totalSks = selectedMatkul.reduce((sum, m) => sum + m.sks, 0);
    const namaMatkul = selectedMatkul.map((m) => m.nama_matkul);

    try {
      const res = await fetch("https://learn.smktelkom-mlg.sch.id/ukl1/api/selectmatkul", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ list_matkul: selectedMatkul }),
      });

      const result = await res.json();

      if (result.status) {
        alert(result.message);
        setHasilSimpan({ totalSks, matkulTerpilih: namaMatkul });
      } else {
        alert("Gagal menyimpan mata kuliah.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  const goToProfil = () => {
    router.push("/profil");
  };

  return (
    <div className="text-gray-700 min-h-screen bg-blue-50 flex flex-col items-center justify-center relative p-6">
      <button
        onClick={goToProfil}
        className="absolute top-4 right-4 bg-white text-indigo-600 border border-indigo-500 font-semibold px-4 py-1 rounded-full shadow hover:bg-blue-100 transition"
      >
        profil
      </button>

      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-indigo-500 py-4 px-6 text-white text-center">
          <h2 className="text-2xl font-bold">Daftar Mata Kuliah</h2>
        </div>

        <div className="p-6">
          {error ? (
            <p className="text-orange-600 text-center">{error}</p>
          ) : (
            <>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left text-indigo-800 border-b-2 border-blue-300">
                    <th className="py-2">ID</th>
                    <th className="py-2">Matkul</th>
                    <th className="py-2">SKS</th>
                    <th className="py-2 text-center">✓</th>
                  </tr>
                </thead>
                <tbody>
                  {matkulList.map((mk) => (
                    <tr key={mk.id} className="border-b hover:bg-blue-50 transition">
                      <td className="py-2">{mk.id}</td>
                      <td className="py-2">{mk.nama_matkul}</td>
                      <td className="py-2">{mk.sks}</td>
                      <td className="py-2 text-center">
                        <input
                          type="checkbox"
                          checked={selected.includes(mk.id)}
                          onChange={() => togglePilihan(mk.id)}
                          className="w-4 h-4 accent-indigo-600"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 text-center">
                <button
                  onClick={handleSimpan}
                  className="bg-orange-400 text-white font-semibold py-2 px-6 rounded-full hover:opacity-90 transition"
                >
                  Simpan yang Terpilih
                </button>
              </div>

              {hasilSimpan && (
                <div className="mt-8 bg-indigo-100 p-4 rounded-lg text-indigo-900">
                  <h3 className="text-lg font-semibold mb-2">Mata Kuliah Terpilih:</h3>
                  <p>{hasilSimpan.matkulTerpilih.join(", ") || "-"}</p>
                  <h3 className="text-lg font-semibold mt-4">Jumlah Mata Kuliah Dipilih:</h3>
                  <p>{hasilSimpan.matkulTerpilih.length}</p>
                  <h3 className="text-lg font-semibold mt-4">Total SKS:</h3>
                  <p>{hasilSimpan.totalSks}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}