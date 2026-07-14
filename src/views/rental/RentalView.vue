<template>
  <div class="container-fluid">

    <div class="d-flex justify-content-between align-items-center mb-4">

      <div>
        <h2 class="fw-bold">
          Peminjaman Barang
        </h2>

        <p class="text-muted">
          Daftar transaksi peminjaman Anda.
        </p>
      </div>

      <button
        class="btn btn-success"
        @click="loadRentals"
      >
        <i class="bi bi-arrow-clockwise me-1"></i>
        Refresh
      </button>

    </div>

    <LoadingSpinner v-if="loading" />

    <ErrorAlert
      v-else-if="error"
      :message="error"
    />

    <div
      v-else
      class="card shadow-sm border-0"
    >

      <div class="table-responsive">

        <table class="table table-hover align-middle mb-0">

          <thead class="table-light">

            <tr>

              <th>ID</th>
              <th>Nama Barang</th>
              <th>Mulai</th>
              <th>Selesai</th>
              <th>Total</th>
              <th>Status</th>
              <th>Aksi</th>

            </tr>

          </thead>

          <tbody>

            <tr
              v-for="rental in rentals"
              :key="rental.id"
            >

              <td>{{ rental.id }}</td>

              <td>
                {{ rental.Item?.item_name || "-" }}
              </td>

              <td>
                {{ formatDate(rental.start_date) }}
              </td>

              <td>
                {{ formatDate(rental.end_date) }}
              </td>

              <td>
                Rp {{ formatPrice(rental.total_price) }}
              </td>

              <td>

                <span
                  class="badge"
                  :class="
                    rental.status === 'returned'
                      ? 'bg-success'
                      : 'bg-warning text-dark'
                  "
                >
                  {{ rental.status }}
                </span>

              </td>

              <td>

                <button
                  v-if="rental.status === 'pending'"
                  class="btn btn-sm btn-success"
                  @click="returnItem(rental.id)"
                >
                  Return
                </button>

                <span
                  v-else
                  class="text-success fw-semibold"
                >
                  Selesai
                </span>

              </td>

            </tr>

            <tr v-if="rentals.length === 0">

              <td
                colspan="7"
                class="text-center py-4"
              >
                Belum ada data rental.
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import {
  getRentals,
  returnRental
} from "@/api/rental";

import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import ErrorAlert from "@/components/common/ErrorAlert.vue";

const rentals = ref([]);
const loading = ref(false);
const error = ref("");

const loadRentals = async () => {

  loading.value = true;
  error.value = "";

  try {

    const response = await getRentals();

    rentals.value = response.data.data;

  } catch (err) {

    error.value =
      err.response?.data?.message ||
      "Gagal mengambil data rental.";

  } finally {

    loading.value = false;

  }

};

const returnItem = async (id) => {

  try {

    await returnRental(id);

    alert("Barang berhasil dikembalikan.");

    loadRentals();

  } catch (err) {

    alert(
      err.response?.data?.message ||
      "Gagal mengembalikan barang."
    );

  }

};

const formatPrice = (price) => {

  return Number(price).toLocaleString("id-ID");

};

const formatDate = (date) => {

  return new Date(date).toLocaleDateString("id-ID");

};

onMounted(loadRentals);

</script>