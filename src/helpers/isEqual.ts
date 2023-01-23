function isEqual(a:object, b: object): boolean {
  const props1 = Object.getOwnPropertyNames(a);
  const props2 = Object.getOwnPropertyNames(b);

  if(props1.length !==props2.length){
    return false
  }
  else{
    for (const [key, value] of Object.entries(a)) {
      // eslint-disable-next-line no-prototype-builtins
      if(!b.hasOwnProperty(key)){
        return false;
      }
      else if(typeof value ==="object"){
        for (const [key2, value2] of Object.entries(b)) {
          if(key===key2&&value!==null&&value2!==null){
            isEqual(value, value2);
          }
        }
      }
      else{
        for (const [key2, value2] of Object.entries(b)) {
          if(key===key2&&value!==value2){
            return false
          }
        }
      }
    }
  }
  return true

}

export default isEqual
