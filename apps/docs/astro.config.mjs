// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			// Configure i18n with English as default and Spanish as secondary language
			defaultLocale: 'en',
			locales: {
				en: {
					label: 'English',
					lang: 'en',
				},
				es: {
					label: 'Español',
					lang: 'es',
				},
			},
			sidebar: [
				{
					label: 'Guides',
					translations: {
						es: 'Guías',
					},
					items: [
						{ label: 'Example Guide', slug: 'guides/example', translations: { es: 'Guía de Ejemplo' } },
					],
				},
				{
					label: 'Reference',
					translations: {
						es: 'Referencia',
					},
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
