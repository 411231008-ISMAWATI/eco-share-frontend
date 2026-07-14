import { createRouter, createWebHistory } from "vue-router";

// Layout
import MainLayout from "@/layouts/MainLayout.vue";

// Views
import LoginView from "@/views/auth/LoginView.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import ItemListView from "@/views/items/ItemListView.vue";
import ItemFormView from "@/views/items/ItemFormView.vue";
import RentalView from "@/views/rental/RentalView.vue";
import CreateRentalView from "@/views/rental/CreateRentalView.vue";
import HistoryView from "@/views/history/HistoryView.vue";
import ProfileView from "@/views/profile/ProfileView.vue";

const routes = [
  // Redirect awal
  {
    path: "/",
    redirect: "/login",
  },

  // Login (tanpa layout)
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: "Login",
    },
  },

  // Semua halaman menggunakan MainLayout
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: DashboardView,
        meta: {
          title: "Dashboard",
        },
      },
      {
        path: "items",
        name: "items",
        component: ItemListView,
        meta: {
          title: "Kelola Barang",
        },
      },
      {
        path: "items/create",
        name: "create-item",
        component: ItemFormView,
        meta: {
          title: "Tambah Barang",
        },
      },
      {
        path: "items/edit/:id",
        name: "edit-item",
        component: ItemFormView,
        meta: {
          title: "Edit Barang",
        },
      },
      {
        path: "rentals",
        name: "rentals",
        component: RentalView,
        meta: {
          title: "Peminjaman Barang",
        },
      },
      {
        path: "rentals/:id",
        name: "create-rental",
        component: CreateRentalView,
        meta: {
          title: "Rental Barang",
        },
      },
      {
        path: "history",
        name: "history",
        component: HistoryView,
        meta: {
          title: "Riwayat Transaksi",
        },
      },
      {
        path: "profile",
        name: "profile",
        component: ProfileView,
        meta: {
          title: "Profil",
        },
      },
    ],
  },

  // Route tidak ditemukan
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Hanya mengubah judul halaman
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || "EcoShare"} | EcoShare`;
  next();
});

export default router;