const resolveCssCalc = (cssCalc: string): number => {
   const tempElement = document.createElement('div');
   tempElement.hidden = true;
   tempElement.style.width = cssCalc;

   document.body.appendChild(tempElement);

   const resolvedValue = parseFloat(getComputedStyle(tempElement).width); // in pixels

   document.body.removeChild(tempElement);

   return resolvedValue;
};

export default resolveCssCalc;
