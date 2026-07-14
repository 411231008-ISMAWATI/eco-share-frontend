import api from "./axios";


/**
 * Ambil rental milik user login
 */
export const getRentals = () => {
  return api.get("/rentals/my");
};


/**
 * Membuat transaksi peminjaman
 */
export const createRental = (data) => {
  return api.post("/rentals", data);
};


/**
 * Mengembalikan barang
 */
export const returnRental = (id) => {
  return api.put(`/rentals/${id}/return`);
};