import type { RouteRecordRaw } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: MainLayout,
    meta: {
      requiresAuth: false
    },
    children: [
      {
        path: '/:catchAll(.*)',
        redirect: '404'
      },
      {
        path: '',
        redirect: 'dashboard'
      },
      {
        path: '404',
        name: '404',
        component: () => import(/* webpackChunkName: "404" */ '@/views/404View.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "main" */ '@/views/DashboardView.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'training_worksheets',
        name: 'TrainingWorksheetList',
        component: () =>
          import(
            /* webpackChunkName: "main" */ '@/views/training_worksheet/TrainingWorksheetListView.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/workout',
        name: 'Workout',
        component: () => import(/* webpackChunkName: "main" */ '@/views/WorkoutView.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'workouts/create',
        name: 'WorkoutsCreate',
        component: () =>
          import(/* webpackChunkName: "main" */ '@/views/training_worksheet/WorkoutCreateView.vue'),
        meta: {
          requiresAuth: true
        }
      },

      {
        path: 'history',
        name: 'History',
        component: () => import(/* webpackChunkName: "main" */ '@/views/HistoryView.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "main" */ '@/views/ProfileView.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import(/* webpackChunkName: "main" */ '@/views/AboutView.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '',
    component: DefaultLayout,
    children: [
      {
        path: 'signin',
        name: 'SignIn',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/SignInView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () =>
          import(/* webpackChunkName: "auth" */ '@/views/auth/ForgotPasswordView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'signup',
        name: 'SignUp',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/SignUpView.vue'),
        meta: {
          requiresAuth: false
        }
      }
    ]
  }
]

export default routes
