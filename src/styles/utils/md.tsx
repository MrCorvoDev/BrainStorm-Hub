import rem from './rem';

const md = (value: number, type: 'max' | 'min' = 'max') => {
   const integer = type === 'min' ? 1 : 0;
   return `${type}-width: ${rem(value + integer)}`;
};

export default md;
