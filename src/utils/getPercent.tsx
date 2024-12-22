const getPercent = (
   part: number,
   whole: number,
   type: 'part' | 'percent' = 'percent',
) => {
   const result = part / whole;

   if (type === 'part') return result; // Part
   return `${result * 100}%`; // Percent
};

export default getPercent;
