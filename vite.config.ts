import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';
import react from '@vitejs/plugin-react-swc';
import {defineConfig, loadEnv} from 'vite';
import {imagetools} from 'vite-imagetools';

// https://vite.dev/config/
export default ({mode}: {mode: string}) => {
   const env = loadEnv(mode, process.cwd(), '');

   return defineConfig({
      base: mode === 'development' ? '/' : env.VITE_PRODUCTION_ROOT,
      plugins: [
         react(),
         imagetools(),
         VitePluginSvgSpritemap('./src/assets/svg/*.svg', {
            prefix: '',
            svgo: true,
            route: '__',
         }),
      ],
   });
};
