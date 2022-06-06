import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/signup',
        name: 'signup',
        component: () =>
            import ('../views/signupView.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        component: () =>
            import ('../views/ProfileView.vue'),
        beforeEnter: async(to, from, next) => {
            if (sessionStorage.getItem('id') === null) {
                return next('/')
            }
            next()
        },
    },
    {
        path: '/event',
        name: 'event',
        component: () =>
            import ('../views/EventView.vue'),
        beforeEnter: async(to, from, next) => {
            if (sessionStorage.getItem('id') === null) {
                return next('/')
            }
            next()
        },
    },
    {
        path: '/displayEvents',
        name: 'displayEvents',
        component: () =>
            import ('../views/DisplayEvents.vue'),
        beforeEnter: async(to, from, next) => {
            if (sessionStorage.getItem('id') === null) {
                return next('/')
            }
            next()
        },
    },
    {
        path: '/createEvent',
        name: 'createEvent',
        component: () =>
            import ('../views/CreateeventView.vue'),
        beforeEnter: async(to, from, next) => {
            if (sessionStorage.getItem('id') === null) {
                return next('/')
            }
            next()
        },
    },
    {
        path: '/map',
        name: 'map',
        component: () =>
            import ('../views/mapView.vue'),
        beforeEnter: async(to, from, next) => {
            if (sessionStorage.getItem('id') === null) {
                return next('/')
            }
            next()
        },
    },
    {
        path: '/settings',
        name: 'settings',
        component: () =>
            import ('../views/settingsView.vue'),
        beforeEnter: async(to, from, next) => {
            if (sessionStorage.getItem('id') === null) {
                return next('/')
            }
            next()
        },
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router