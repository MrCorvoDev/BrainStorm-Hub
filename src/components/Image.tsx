interface ImageProps {
   src: string | string[];
   sizes?: number[];
   alt?: string;
   lazy?: 'lazy' | 'eager';
}
const Image = ({
   src,
   sizes = [960, 1920, 2560],
   alt = '',
   lazy = 'lazy',
}: ImageProps) => {
   const isResponsiveImage = Array.isArray(src);
   let srcSet, srcUrl;

   if (isResponsiveImage) {
      srcSet = sizes.map((size, i) => `${src[i]} ${size}w`).join(', ');
   } else {
      srcUrl = src;
   }

   return <img src={srcUrl} srcSet={srcSet} alt={alt} loading={lazy} />;
};

export default Image;
