"use client"

import { axiosInstance } from "@/helper/api"
import { getCookie } from "@/helper/client_cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

const RegisterForm = () => {
    const [nama_nasabah, setNama_nasabah] = useState<string>("")
    const [gender, setGender] = useState<string>("")
    const [alamat, setAlamat] = useState<string>("")
    const [telepon, setTelepon] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [foto, setFoto] = useState<File | null>(null)
    const [teleponError, setTeleponError] = useState<string>("")
    const [passwordError, setPasswordError] = useState("")

    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (telepon.length < 12) {
            setTeleponError("Nomor telepon minimal 12 digit")
            return
        }
        if (password.length < 12) {
            setPasswordError("Password minimal 12 karakter")
            return
        }

        try {
            const TOKEN = getCookie("token")
            const url = `/register`

            const formData = new FormData()
            formData.append("nama_nasabah", nama_nasabah)
            formData.append("gender", gender)
            formData.append("alamat", alamat)
            formData.append("telepon", telepon)
            formData.append("username", username)
            formData.append("password", password)
            if (foto) {
                formData.append("foto", foto)
            }

            const response: any = await axiosInstance.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "multipart/form-data"
                }
            })

            const message = response.data.message
            toast.success(message, { containerId: "toastAdd" })
            setTimeout(() => router.push("/"), 1000)
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong", { containerId: "toastAdd" })
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-8 text-black">
            <ToastContainer containerId="toastAdd" />

            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8">
                <h2 className="text-3xl text-indigo-500 font-bold text-center mb-6">BANK INDONESIA</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nama Nasabah"
                        value={nama_nasabah}
                        onChange={e => setNama_nasabah(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-700"
                    />

                    <select
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-700"
                    >
                        <option value="">Jenis Kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>

                    <textarea
                        placeholder="Alamat"
                        value={alamat}
                        onChange={e => setAlamat(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-700"
                    />

                    <input
                        type="text"
                        placeholder="Telepon"
                        value={telepon}
                        onChange={e => {
                            const value = e.target.value
                            if (/^\d*$/.test(value)) {
                                setTelepon(value)
                                setTeleponError(value.length < 12 ? "Nomor telepon minimal 12 digit" : "")
                            } else {
                                setTeleponError("Telepon hanya boleh berisi angka")
                            }
                        }}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-700"
                    />
                    {teleponError && (
                        <p className="text-red-600 text-sm mt-1">{teleponError}</p>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Foto</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => e.target.files && setFoto(e.target.files[0])}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg outline-none file:bg-slate-200 file:border-none file:rounded-lg file:px-4 file:py-2 file:text-black"
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-700"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value)
                            setPasswordError(e.target.value.length < 12 ? "Password minimal 12 karakter" : "")
                        }}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-700"
                    />
                    {passwordError && (
                        <p className="text-red-600 text-sm mt-1">{passwordError}</p>
                    )}

                    <button
                        type="submit"
                        disabled={!!teleponError || !!passwordError}
                        className={`w-full py-3 bg-orange-600 text-white font-semibold rounded-lg transition duration-200 hover:bg-orange-900
                            ${teleponError || passwordError ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm
