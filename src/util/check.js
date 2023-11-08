export function isEmail(asValue) {
    var regExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regExp.test(asValue);  
}
export function isPassword(asValue){
    var regExp =/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  return regExp.test(asValue);  
}

export function isPhone(asValue){
    var regExp = /^010\d{8}$/;
    return regExp.test(asValue);
}