<template>
  <div class="container-fluid">

    <!-- Header -->
    <div class="mb-4">
      <h2 class="fw-bold">
        {{ isEdit ? "Edit Barang" : "Tambah Barang" }}
      </h2>

      <p class="text-muted">
        {{
          isEdit
            ? "Perbarui informasi barang."
            : "Tambahkan barang baru ke EcoShare."
        }}
      </p>
    </div>

    <div class="card shadow-sm border-0">

      <div class="card-body">

        <ErrorAlert
          v-if="error"
          :message="error"
        />

        <form @submit.prevent="saveItem">

          <!-- Nama -->
          <div class="mb-3">
            <label class="form-label">
              Nama Barang
            </label>

            <input
              v-model="form.item_name"
              class="form-control"
              type="text"
              placeholder="Masukkan nama barang"
            />
          </div>

          <!-- Deskripsi -->
          <div class="mb-3">

            <label class="form-label">
              Deskripsi
            </label>

            <textarea
              v-model="form.description"
              rows="4"
              class="form-control"
            ></textarea>

          </div>

          <!-- Harga -->
          <div class="mb-3">

            <label class="form-label">
              Harga / Hari
            </label>

            <input
              v-model.number="form.price_per_day"
              type="number"
              class="form-control"
              min="0"
            />

          </div>

          <!-- Stock -->
          <div class="mb-3">

            <label class="form-label">
              Stock
            </label>

            <input
              v-model.number="form.stock"
              type="number"
              class="form-control"
              min="0"
            />

          </div>

          <!-- Upload Gambar -->
          <div class="mb-4">

            <label class="form-label">
              Gambar Barang
            </label>

            <input
              type="file"
              class="form-control"
              accept="image/*"
              @change="handleImage"
            />

          </div>

          <!-- Preview -->
          <div
            v-if="preview"
            class="text-center mb-4"
          >

            <img
              :src="preview"
              class="preview-image"
            />

          </div>

          <!-- Button -->
          <div class="d-flex justify-content-end gap-2">

            <RouterLink
              to="/items"
              class="btn btn-secondary"
            >
              Batal
            </RouterLink>

            <button
              class="btn btn-success"
              :disabled="loading"
            >

              <span
                v-if="loading"
                class="spinner-border spinner-border-sm me-2"
              ></span>

              {{ isEdit ? "Update Barang" : "Simpan Barang" }}

            </button>

          </div>

        </form>

      </div>

    </div>

  </div>
</template>

<script setup>
import {
  reactive,
  ref,
  computed,
  onMounted
} from "vue";

import {
  useRouter,
  useRoute
} from "vue-router";

import {
  createItem,
  updateItem,
  getItemById
} from "@/api/item";

import ErrorAlert from "@/components/common/ErrorAlert.vue";

const router = useRouter();
const route = useRoute();

const loading = ref(false);
const error = ref("");

const preview = ref("");

const imageFile = ref(null);

const isEdit = computed(() => !!route.params.id);

const form = reactive({

  item_name: "",

  description: "",

  price_per_day: 0,

  stock: 1,

});

// ===============================
// Preview gambar
// ===============================

const handleImage = (event) => {

  const file = event.target.files[0];

  if (!file) return;

  imageFile.value = file;

  preview.value = URL.createObjectURL(file);

};

// ===============================
// Load Data
// ===============================

const loadItem = async () => {

  if (!isEdit.value) return;

  try {

    loading.value = true;

    const response = await getItemById(route.params.id);

    const item = response.data.data;

    form.item_name = item.item_name;
    form.description = item.description;
    form.price_per_day = item.price_per_day;
    form.stock = item.stock;

    if (item.image) {

      preview.value =
        `http://localhost:3000/uploads/${item.image}`;

    }

  } catch (err) {

    error.value =
      err.response?.data?.message ||
      "Gagal mengambil data.";

  } finally {

    loading.value = false;

  }

};

// ===============================
// Simpan
// ===============================

const saveItem = async () => {

  error.value = "";

  if (!form.item_name.trim()) {

    error.value = "Nama barang wajib diisi.";

    return;

  }

  if (form.price_per_day <= 0) {

    error.value = "Harga harus lebih dari 0.";

    return;

  }

  try {

    loading.value = true;

    const formData = new FormData();

    formData.append(
      "item_name",
      form.item_name
    );

    formData.append(
      "description",
      form.description
    );

    formData.append(
      "price_per_day",
      form.price_per_day
    );

    formData.append(
      "stock",
      form.stock
    );

    if (imageFile.value) {

      formData.append(
        "image",
        imageFile.value
      );

    }

    if (isEdit.value) {

      await updateItem(
        route.params.id,
        formData
      );

    } else {

      await createItem(formData);

    }

    router.push("/items");

  } catch (err) {

    error.value =
      err.response?.data?.message ||
      "Gagal menyimpan data.";

  } finally {

    loading.value = false;

  }

};

onMounted(() => {

  loadItem();

});
</script>

<style scoped>

.container-fluid{
    padding:25px;
}

.card{
    border-radius:18px;
}

.form-control{
    border-radius:10px;
}

.preview-image{

    width:220px;
    height:180px;

    object-fit:cover;

    border-radius:12px;

    border:1px solid #ddd;

}

.btn{
    min-width:140px;
}

</style>