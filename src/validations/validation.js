
//<---------------------------Validations : String----------------------------->//
const isValidString = function (value) {
    if (typeof value === undefined || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false  
    return true
}

//<---------------------------Validations : Mobile Number----------------------------->//
const isValidMobileNo=function(mobile){
  const regexMob=/^[0-9]{10}$/
  return regexMob.test(mobile)
}

//<---------------------------Validations : Email----------------------------->//
const isValidEmail=function(email){
  const regexEmail=/[a-zA-Z_1-90]{3,}@[A-za-z]{3,}[.]{1}[a-zA-Z]{2,}/
  return regexEmail.test(email)
}

//<---------------------------Validations : Password----------------------------->//
const isValidPassword = function (password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/
  return passwordRegex.test(password);
}

const isIsbn = function(isbn){
  let regex = (/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d]+$/g)
  return regex.test(isbn)
}

const isValidDate = function(date){
  let regexDate = /^^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
  return regexDate.test(date)
}

module.exports = { isValidString , isValidMobileNo , isValidEmail , isValidPassword , isIsbn , isValidDate }