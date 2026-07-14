<template>
  <div class="login-page">

    <div class="container-fluid">

      <div class="row min-vh-100 align-items-center">

        <!-- LEFT -->
        <div class="col-lg-7 d-none d-lg-flex justify-content-center">

          <div class="left-side">

            <img
              src="@/assets/images/login-illustration.png"
              class="illustration"
              alt="EcoShare"
            />

          </div>

        </div>

        <!-- RIGHT -->
        <div class="col-lg-5 col-md-8 mx-auto">

          <div class="login-card shadow">

            <h1 class="title">
              Selamat Datang di
            </h1>

            <h1 class="brand">
              EcoShare
            </h1>

            <p class="subtitle">
              Silakan login untuk melanjutkan
            </p>

            <div
              v-if="auth.error"
              class="alert alert-danger"
            >
              {{ auth.error }}
            </div>

            <!-- Email -->

            <label class="form-label fw-semibold">
              Email
            </label>

            <div class="input-group mb-4">

              <span class="input-group-text">
                <i class="bi bi-person-fill"></i>
              </span>

              <input
                v-model="email"
                type="text"
                class="form-control"
                placeholder="Masukkan email"
              />

            </div>

            <!-- Password -->

            <label class="form-label fw-semibold">
              Password
            </label>

            <div class="input-group mb-4">

              <span class="input-group-text">
                <i class="bi bi-lock-fill"></i>
              </span>

              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                placeholder="Masukkan password"
              />

              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="showPassword=!showPassword"
              >
                <i
                  :class="showPassword
                    ? 'bi bi-eye-slash'
                    : 'bi bi-eye'"
                ></i>
              </button>

            </div>

            <!-- Remember -->

            <div class="d-flex justify-content-between mb-4">

              <div class="form-check">

                <input
                  class="form-check-input"
                  type="checkbox"
                >

                <label class="form-check-label">
                  Ingat saya
                </label>

              </div>

            </div>

            <!-- Button -->

            <button
              class="btn btn-success login-btn"
              @click="login"
              :disabled="auth.loading"
            >

              <span
                v-if="auth.loading"
                class="spinner-border spinner-border-sm me-2"
              ></span>

              {{ auth.loading ? "Logging in..." : "Login" }}

              <i class="bi bi-arrow-right ms-2"></i>

            </button>

            <div class="divider">

              <span>atau</span>

            </div>

            <p class="register-text">

              Belum punya akun?

              <span class="text-success">
                Hubungi administrator
              </span>

            </p>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();

const auth = useAuthStore();

const email = ref("");

const password = ref("");

const showPassword = ref(false);

const login = async()=>{

  if(!email.value || !password.value){

    auth.error="Username dan Password wajib diisi.";

    return;

  }

  const success=await auth.login({

    email:email.value,
    password:password.value

  });

  if(success){

    router.push("/dashboard");

  }

}

</script>

<style scoped>

.login-page{

    background:#f5f7f6;
    min-height:100vh;

}

.left-side{

    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;

}

.illustration{

    width:100%;
    max-width:760px;

}

.login-card{

    background:white;

    border-radius:28px;

    padding:55px;

}

.title{

    font-size:28px;
    font-weight:700;
    color:#343a40;
    text-align:center;

}

.brand{

    text-align:center;
    color:#2e7d32;
    font-size:58px;
    font-weight:800;
    margin-bottom:8px;

}

.subtitle{

    text-align:center;
    color:#6c757d;
    margin-bottom:35px;

}

.input-group-text{

    background:white;

}

.form-control{

    height:56px;

}

.input-group-text{

    height:56px;

}

.login-btn{

    width:100%;
    height:56px;

    border-radius:12px;

    font-size:20px;
    font-weight:600;

}

.divider{

    display:flex;
    align-items:center;
    margin:35px 0;

}

.divider::before,
.divider::after{

    content:"";

    flex:1;

    height:1px;

    background:#dee2e6;

}

.divider span{

    margin:0 15px;
    color:#888;

}

.register-text{

    text-align:center;
    color:#555;

}

@media(max-width:991px){

.login-card{

    margin:40px 15px;
    padding:35px;

}

.brand{

    font-size:44px;

}

}

</style>