import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";
import { useAuthStore } from "@/stores/auth";
import Dashboard from "@/views/admin/Dashboard.vue";
import TicketList from "@/views/admin/ticket/TicketList.vue";
import TicketDetail from "@/views/admin/ticket/TicketDetail.vue";
import Login from "@/views/auth/Login.vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "@/layouts/App.vue";
import AppDashboard from "@/views/app/Dashboard.vue";
import AppTicketDetail from "@/views/app/TicketDetail.vue";
import AppTicketCreate from "@/views/app/TicketCreate.vue";
import Register from "@/views/auth/Register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: App,
      children: [
        {
          path: "",
          name: "app.dashboard",
          component: AppDashboard,
          meta: {
            requiresAuth: true,
            role: "user",
            title: "Dashboard",
          },
        },
        {
          path: "ticket/:code",
          name: "app.ticket.detail",
          component: AppTicketDetail,
          meta: {
            requiresAuth: true,
            role: "user",
            title: "Ticket Detail",
          },
        },
        {
          path: "ticket/create",
          name: "app.ticket.create",
          component: AppTicketCreate,
          meta: {
            requiresAuth: true,
            role: "user",
            title: "Create Ticket",
          },
        },
      ],
    },
    {
      path: "/admin",
      component: Admin,
      children: [
        {
          path: "dashboard",
          name: "admin.dashboard",
          component: Dashboard,
          meta: {
            requiresAuth: true,
            role: "admin",
            title: "Dashboard",
          },
        },
        {
          path: "ticket",
          name: "admin.ticket",
          component: TicketList,
          meta: {
            requiresAuth: true,
            role: "admin",
            title: "Ticket",
          },
        },
        {
          path: "ticket/:code",
          name: "admin.ticket.detail",
          component: TicketDetail,
          meta: {
            requiresAuth: true,
            role: "admin",
            title: "Ticket Detail",
          },
        },
      ],
    },
    {
      path: "/auth",
      component: Auth,
      children: [
        {
          path: "login",
          name: "login",
          component: Login,
          meta: {
            requiresUnauth: true,
          },
        },
        {
          path: "register",
          name: "register",
          component: Register,
          meta: {
            requiresUnauth: true,
          },
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const userFromLocal = await localStorage.getItem("user");
  const user = JSON.parse(userFromLocal);

  if (to.meta.requiresAuth) {
    if (authStore.token) {
      try {
        if (!authStore.user) {
          await authStore.checkAuth();
        }

        const requiredRole = to.meta.role;

        if (requiredRole && user?.role !== requiredRole) {
          if (user?.role === "admin") {
            return next({ name: "admin.dashboard" });
          } else {
            return next({ name: "app.dashboard" });
          }
        }

        next();
      } catch (error) {
        next({ name: "login" });
      }
    } else {
      next({ name: "login" });
    }
  } else if (to.meta.requiresUnauth && authStore.token) {
    if (user?.role === "admin") {
      next({ name: "admin.dashboard" });
    } else {
      next({ name: "app.dashboard" });
    }
  } else {
    next();
  }
});

export default router;
