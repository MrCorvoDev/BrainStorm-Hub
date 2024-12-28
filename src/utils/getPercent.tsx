const getPercent = (
   part: number,
   whole: number,
   type: 'part' | 'percent' = 'percent',
) => {
   const unsafeResult = part / whole;
   const result = isNaN(unsafeResult) ? 0 : unsafeResult;

   if (type === 'part') return result; // Part
   return `${result * 100}%`; // Percent
};

export default getPercent;
