<template>
  <nav class="navbar-custom">

    <!-- Judul Halaman -->
    <div class="navbar-left">

      <button class="menu-btn">
        <i class="bi bi-list"></i>
      </button>

      <h5>Dashboard</h5>

    </div>

    <!-- User -->
    <div class="navbar-right">

      <div class="user-info">

        <div class="avatar">
          <i class="bi bi-person-fill"></i>
        </div>


      </div>

    </div>

  </nav>
</template>

<script setup>

// Nanti setelah login selesai,
// nama dan role akan diambil dari Pinia.

</script>

<style scoped>

.navbar-custom{
    height:70px;
    background:#ffffff;
    border-bottom:1px solid #dee2e6;

    display:flex;
    justify-content:space-between;
    align-items:center;

    padding:0 25px;
}

.navbar-left{
    display:flex;
    align-items:center;
    gap:15px;
}

.menu-btn{
    border:none;
    background:none;
    font-size:24px;
    color:#212529;
    cursor:pointer;
}

.navbar-left h5{
    margin:0;
    font-weight:600;
}

.navbar-right{
    display:flex;
    align-items:center;
}

.user-info{
    display:flex;
    align-items:center;
    gap:12px;
}

.avatar{

    width:45px;
    height:45px;

    border-radius:50%;

    background:#198754;
    color:white;

    display:flex;
    justify-content:center;
    align-items:center;

    font-size:20px;

}

.user-text{
    display:flex;
    flex-direction:column;
}

.user-text strong{
    font-size:15px;
}

.user-text small{
    color:#6c757d;
}

</style>