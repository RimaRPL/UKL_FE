"use client"

import { axiosInstance } from "@/helper/api"
import { storeCookie } from "@/helper/client_cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = `/login`
      const requestData = { username, password }
      const response: any = await axiosInstance.post(url, requestData)

      if (response.data.success === false) {
        toast(response.data.message, {
          type: "warning",
          containerId: "toastLogin",
        })
      } else {
        storeCookie("token", response.data.token)
        toast(response.data.message, {
          type: "success",
          containerId: "toastLogin",
        })
        setTimeout(() => {
          router.push("/matkul")
        }, 1500)
      }
    } catch (error) {
      console.error(error)
      toast("Terjadi kesalahan saat login", {
        containerId: "toastLogin",
        type: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <ToastContainer containerId="toastLogin" />
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl">
        {/* Side image / branding */}
        <div className="hidden md:flex flex-col justify-center items-center bg-indigo-600 text-white w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-4">Selamat Datang!</h2>
          <p className="text-sm text-center leading-relaxed">
            Akses platform Bank kami dan nikmati layanan yang memudahkan aktivitas Anda.
          </p>
        </div>

        {/* Login form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 p-8 space-y-6"
        >
          <h1 className="text-2xl font-bold text-indigo-700 text-center">Login ke Akun Anda</h1>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 outline-none transition text-black placeholder-black"
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 outline-none transition text-black placeholder-black"
              placeholder="Masukkan password"
            />
          </div>

          <button
            type="submit"
            className={`w-full text-white font-semibold py-2 rounded-md transition ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-400"
            }`}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Belum punya akun?{" "}
            <a href="/register" className="text-indigo-600 hover:underline font-medium">
              Daftar di sini
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
