/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import Image, { ImageProps } from 'next/image';
import React from 'react';

interface ICustomImage extends ImageProps {
  errorImage?: string;
}

const CustomImage = (props: ICustomImage) => {
  const { alt, src: propsSrc, blurDataURL } = props;
  const errorImage = props.errorImage || '/images/zaddi/logo.svg';
  const [src, setSrc] = React.useState(propsSrc);

  React.useEffect(() => {
    setSrc(propsSrc);
  }, [propsSrc]);

  if (!src) {
    return null;
  }

  let imageUrl = `${src}`;

  if (imageUrl.slice(0, 1) !== '/' && imageUrl.slice(0, 3) !== 'http') {
    imageUrl = `/uploads/${src}`;
  }

  return (
    <Image
      {...props}
      alt={alt}
      src={src}
      onError={() => {
        setSrc(errorImage);
      }}
      onLoadingComplete={result => {
        if (result.naturalWidth === 0) {
          setSrc(errorImage);
        }
      }}
      blurDataURL={blurDataURL || '/images/zaddi/logo.svg'}
      placeholder="blur"
    />
  );
};

export default CustomImage;
