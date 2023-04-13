import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),

	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../components/Intro.vue'),
		},
		{
			path: '/story/:id',
			name: 'story',
			component: () => import('../components/Story.vue'),
		},
	],
});

export default router;
