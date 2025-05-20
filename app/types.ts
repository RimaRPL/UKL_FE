export interface NasabahType {
  nama_nasabah: string
  gender: string
  alamat: string
  telepon: string
  username: string
  password: string
  image: string
  foto: Foto
}

export interface Foto {}

export interface LoginType {
  username: string
  password: string
}

export interface MatkulType {
  id: number
  nama_matkul: string
  sks: number
}

export interface ProfileType {
  id: string
  nama_pelanggan: string
  alamat: string
  telepon: string
  gender: string
}