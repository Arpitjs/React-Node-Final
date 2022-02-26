/**
 * 
 * @param {*string} name 
 * @returns {*string} slug
 */
export const slugify = name => {
   const nameArr = name.split(' ');
   if(nameArr.length === 1) return nameArr[0];
   return `${nameArr[0]}-${nameArr[1]}`;
}