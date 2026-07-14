<template>
  <div class="container-fluid">

    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">

      <div>
        <h2 class="fw-bold">
          Kelola Barang
        </h2>

        <p class="text-muted mb-0">
          Daftar seluruh barang yang tersedia di EcoShare.
        </p>
      </div>

      <div>

        <button
          class="btn btn-outline-success me-2"
          @click="loadItems"
        >
          <i class="bi bi-arrow-clockwise me-1"></i>
          Refresh
        </button>

        <RouterLink
          v-if="auth.role === 'admin'"
          to="/items/create"
          class="btn btn-success"
        >
          <i class="bi bi-plus-lg me-1"></i>
          Tambah Barang
        </RouterLink>

      </div>

    </div>

    <!-- Loading -->
    <LoadingSpinner v-if="loading" />

    <!-- Error -->
    <ErrorAlert
      v-else-if="error"
      :message="error"
    />

    <!-- Empty -->
    <div
      v-else-if="items.length === 0"
      class="text-center py-5"
    >
      <i class="bi bi-box display-1 text-secondary"></i>

      <h4 class="mt-3">
        Belum ada barang
      </h4>

      <p class="text-muted">
        Belum ada data barang di database.
      </p>

    </div>

    <!-- List Barang -->
    <div
      v-else
      class="row g-4"
    >

      <div
        v-for="item in items"
        :key="item.id"
        class="col-lg-4 col-md-6"
      >

        <ItemCard
          :item="item"
          :role="auth.role"
          @edit="handleEdit"
          @delete="handleDelete"
          @rent="handleRent"
        />

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import {
  getItems,
  deleteItem
} from "@/api/item";

import ItemCard from "@/components/ui/ItemCard.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import ErrorAlert from "@/components/common/ErrorAlert.vue";

const router = useRouter();
const auth = useAuthStore();

const items = ref([]);
const loading = ref(false);
const error = ref("");

const loadItems = async () => {

  loading.value = true;
  error.value = "";

  try {

    const response = await getItems();

    items.value = response.data.data;

  } catch (err) {

    console.error(err);

    error.value =
      err.response?.data?.message ||
      "Gagal mengambil data barang.";

  } finally {

    loading.value = false;

  }

};

const handleEdit = (item) => {

  router.push(`/items/edit/${item.id}`);

};

const handleRent = (item) => {

  router.push(`/rentals/${item.id}`);

};

const handleDelete = async (item) => {

  const confirmDelete = confirm(
    `Yakin ingin menghapus "${item.item_name}" ?`
  );

  if (!confirmDelete) return;

  try {

    await deleteItem(item.id);

    alert("Barang berhasil dihapus.");

    loadItems();

  } catch (err) {

    alert(
      err.response?.data?.message ||
      "Gagal menghapus barang."
    );

  }

};

onMounted(() => {

  loadItems();

});
</script>

<style scoped>

.container-fluid{

    padding:25px;

}

</style>