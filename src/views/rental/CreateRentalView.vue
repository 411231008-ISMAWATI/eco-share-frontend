<template>
  <div class="container py-4">

    <div class="card shadow border-0">

      <div class="card-header bg-success text-white">
        <h4 class="mb-0">
          Rental Barang
        </h4>
      </div>

      <div class="card-body">

        <div class="mb-3">

          <label class="form-label">
            Tanggal Mulai
          </label>

          <input
            type="date"
            class="form-control"
            v-model="form.start_date"
          />

        </div>

        <div class="mb-3">

          <label class="form-label">
            Tanggal Selesai
          </label>

          <input
            type="date"
            class="form-control"
            v-model="form.end_date"
          />

        </div>

        <button
          class="btn btn-success"
          @click="submitRental"
          :disabled="loading"
        >

          {{ loading ? "Memproses..." : "Konfirmasi Rental" }}

        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { createRental } from "@/api/rental";

const route = useRoute();
const router = useRouter();

const loading = ref(false);

const form = reactive({

  item_id: Number(route.params.id),

  start_date: "",

  end_date: ""

});

const submitRental = async () => {

  loading.value = true;

  try {

    await createRental(form);

    alert("Rental berhasil dibuat.");

    router.push("/rentals");

  } catch (err) {

    alert(
      err.response?.data?.message ||
      "Gagal membuat rental."
    );

  } finally {

    loading.value = false;

  }

};
</script>