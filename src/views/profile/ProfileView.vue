<template>

<div class="container-fluid">

<div class="row justify-content-center">

<div class="col-lg-6">

<div class="card shadow border-0">

<div class="card-body p-5 text-center">

<i
class="bi bi-person-circle display-1 text-success"
></i>

<h3 class="mt-3">

{{ auth.user?.name }}

</h3>

<p class="text-muted">

{{ auth.user?.email }}

</p>

<hr>

<div class="row">

<div class="col-6">

<h6>Role</h6>

<span
class="badge bg-success"
>

{{ auth.user?.role }}

</span>

</div>

<div class="col-6">

<h6>Status</h6>

<span
class="badge bg-primary"
>

Active

</span>

</div>

</div>

</div>

</div>

</div>

</div>

</div>

</template>

<script setup>

import { useAuthStore } from "@/stores/auth";

const auth=useAuthStore();

</script>