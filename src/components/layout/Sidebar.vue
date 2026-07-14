<template>
  <aside class="sidebar">

    <!-- Logo -->
    <div class="logo">
      <h4>🌿 EcoShare</h4>
      <small>Rental Management</small>
    </div>

    <!-- Menu -->
    <nav class="menu">

      <!-- Dashboard -->
      <RouterLink to="/dashboard" class="menu-item">
        <i class="bi bi-speedometer2"></i>
        Dashboard
      </RouterLink>

      <!-- ADMIN -->
      <template v-if="isAdmin">

        <RouterLink to="/items" class="menu-item">
          <i class="bi bi-box-seam"></i>
          Kelola Barang
        </RouterLink>

        <RouterLink to="/rentals" class="menu-item">
          <i class="bi bi-arrow-left-right"></i>
          Data Rental
        </RouterLink>

      </template>

      <!-- USER -->
      <template v-else>

        <RouterLink to="/items" class="menu-item">
          <i class="bi bi-box-seam"></i>
          Daftar Barang
        </RouterLink>

        <RouterLink to="/rentals" class="menu-item">
          <i class="bi bi-bag-check"></i>
          Rental Saya
        </RouterLink>

        <RouterLink to="/history" class="menu-item">
          <i class="bi bi-clock-history"></i>
          History
        </RouterLink>

      </template>

      <!-- Profile -->
      <RouterLink to="/profile" class="menu-item">
        <i class="bi bi-person-circle"></i>
        Profile
      </RouterLink>

    </nav>

    <!-- Logout -->
    <div class="logout">

      <button
        class="menu-item logout-btn w-100 border-0"
        @click="logout"
      >
        <i class="bi bi-box-arrow-right"></i>
        Logout
      </button>

    </div>

  </aside>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

/*
Sesuaikan role dengan yang ada di database.
Kalau database memakai "admin" dan "user",
ganti "admin" menjadi "user".
*/
const isAdmin = computed(() => {
  return auth.role === "admin";
});

const logout = () => {
  auth.logout();
  router.push("/login");
};
</script>

<style scoped>

.sidebar{
    width:260px;
    min-height:100vh;
    background:#212529;
    display:flex;
    flex-direction:column;
}

.logo{
    padding:25px;
    border-bottom:1px solid rgba(255,255,255,.1);
}

.logo h4{
    color:#fff;
    margin:0;
    font-weight:700;
}

.logo small{
    color:#adb5bd;
}

.menu{
    padding:20px 12px;
    display:flex;
    flex-direction:column;
    gap:8px;
    flex:1;
}

.menu-item{
    color:#dee2e6;
    text-decoration:none;
    padding:12px 16px;
    border-radius:10px;
    display:flex;
    align-items:center;
    gap:12px;
    transition:.3s;
    background:transparent;
}

.menu-item:hover{
    background:#343a40;
    color:white;
}

.router-link-active{
    background:#198754;
    color:white;
}

.logout{
    padding:20px 12px;
    border-top:1px solid rgba(255,255,255,.1);
}

.logout-btn{
    color:#ffb3b3;
}

.logout-btn:hover{
    background:#dc3545;
    color:white;
}

</style>