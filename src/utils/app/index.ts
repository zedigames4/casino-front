import resolveConfig from 'tailwindcss/resolveConfig';

const conf: any = './tailwind.config.cjs';

export const tailwindConfig = (): any => {
  // Tailwind config
  return resolveConfig(conf);
};
export enum notationsInterface {
  compact = 'compact',
  standard = 'standard',
  scientific = 'scientific',
  engineering = 'engineering',
}

export const formatValue = (
  value: number | bigint,
  notation?: notationsInterface,
  maxDigit?: number,
) =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'RWF',
    maximumSignificantDigits: maxDigit || 3,
    notation: notation || 'compact',
  }).format(value);
