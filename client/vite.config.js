import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add any necessary aliases here
    },
  },
  optimizeDeps: {
    exclude: [
      'aws-sdk',
      'mock-aws-s3',
      'nock',
      'node-pre-gyp',
    ],
  },
  build: {
    rollupOptions: {
      external: [
        'aws-sdk',
        'mock-aws-s3',
        'nock',
        'node-pre-gyp',
      ],
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  server: {
    fs: {
      strict: false,
    },
  },
});
