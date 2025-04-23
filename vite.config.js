import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';
import { splitVendorChunkPlugin } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  base: '/interactive-portfolio/',
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/, /\.(png|jpe?g|gif|webp)$/i],
      threshold: 1024,
    }),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/, /\.(png|jpe?g|gif|webp)$/i],
      threshold: 1024,
    }),
    // Uncomment to analyze bundle size
    // visualizer({
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    // }),
  ],
  server: {
    open: true
  },
  build: {
    // Generate source maps for production builds
    sourcemap: false,
    
    // Reduce chunk size
    chunkSizeWarningLimit: 1000,
    
    // Optimize build settings
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
        },
      },
    },
    
    // Enable minification options
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console.log in production
        drop_console: true,
        // Remove debugger statements
        drop_debugger: true,
        // Remove unreachable code
        dead_code: true,
      },
    },
    
    // Optimize assets
    assetsInlineLimit: 4096, // 4kb - small assets will be inlined to reduce HTTP requests
  },
  
  // Optimize images handling
  assetsInclude: ['**/*.webp', '**/*.avif'],
  
  // Improve CSS processing
  css: {
    devSourcemap: true,
    modules: {
      scopeBehaviour: 'local',
    },
  },
  
  // Optimize prefetching and preloading
  experimental: {
    renderBuiltUrl(filename) {
      if (filename.endsWith('.webp') || filename.endsWith('.avif')) {
        return { type: 'asset', value: filename };
      }
      return { type: 'public', value: filename };
    },
  },
}); 