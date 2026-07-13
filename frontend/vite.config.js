import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, '..'), '');
  const appPort = env.APP_PORT || '3000';
  const webPort = parseInt(env.WEB_PORT || '5173', 10);

  return {
    plugins: [react()],
    server: {
      port: webPort,
      proxy: {
        '/api': {
          target: `http://localhost:${appPort}`,
          changeOrigin: true,
        },
      },
    },
  };
});
