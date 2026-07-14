import api from "./axios";

/**
 * Ambil semua barang
 */
export const getItems = () => {
  return api.get("/items");
};

/**
 * Ambil detail barang
 */
export const getItemById = (id) => {
  return api.get(`/items/${id}`);
};

/**
 * Tambah barang
 */
export const createItem = (formData) => {
  return api.post("/items", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * Update barang
 */
export const updateItem = (id, formData) => {
  return api.put(`/items/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * Hapus barang
 */
export const deleteItem = (id) => {
  return api.delete(`/items/${id}`);
};