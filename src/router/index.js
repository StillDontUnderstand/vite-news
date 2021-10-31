import {createWebHistory,createRouter} from "vue-router";

import News from '../components/News.vue';
import Model from '../components/Model.vue';
import Option from '../components/Option.vue';

const routes = [
    { path: "/", redirect: "/model" },
    {
        path: '/news',
        name:'news',
        component: News
    },
    {
        path: '/model',
        name:'model',
        component: Model
    },
    {
        path: '/option',
        name:'Option',
        component: Option
    },
]

export const router = createRouter({
    history:createWebHistory(),
    routes:routes
});
