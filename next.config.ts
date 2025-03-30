/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: 'standalone', // Для Docker
	// Удалены устаревшие/неподдерживаемые параметры
	webpack: (config: any, { isServer }: { isServer: boolean }) => {
		if (!isServer) {
			// Настройка polling для hot-reload в Docker
			config.watchOptions = {
				poll: 1000,
				aggregateTimeout: 300,
			}
		}
		return config
	},
}

export default nextConfig
