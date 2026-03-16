const form = document.getElementById("registerForm");

/* utility */

function showError(id,message){
document.getElementById(id).textContent = message;
}

function clearError(id){
document.getElementById(id).textContent = "";
}

/* validate fullname */

function validateFullname(){

const name = document.getElementById("fullname").value.trim();

const regex = /^[A-Za-zÀ-ỹ\s]{3,}$/;

if(name === ""){
showError("fullnameError","Không được để trống");
return false;
}

if(!regex.test(name)){
showError("fullnameError","Tên ≥ 3 ký tự và chỉ chứa chữ");
return false;
}

clearError("fullnameError");
return true;

}

/* validate email */

function validateEmail(){

const email = document.getElementById("email").value.trim();

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(email === ""){
showError("emailError","Email không được trống");
return false;
}

if(!regex.test(email)){
showError("emailError","Email không đúng định dạng");
return false;
}

clearError("emailError");
return true;

}

/* validate phone */

function validatePhone(){

const phone = document.getElementById("phone").value.trim();

const regex = /^0\d{9}$/;

if(phone === ""){
showError("phoneError","SĐT không được trống");
return false;
}

if(!regex.test(phone)){
showError("phoneError","SĐT phải 10 số và bắt đầu bằng 0");
return false;
}

clearError("phoneError");
return true;

}

/* validate password */

function validatePassword(){

const pass = document.getElementById("password").value;

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

if(pass === ""){
showError("passwordError","Mật khẩu không được trống");
return false;
}

if(!regex.test(pass)){
showError("passwordError",
"Mật khẩu ≥8 ký tự, có chữ hoa, chữ thường, số");
return false;
}

clearError("passwordError");
return true;

}

/* confirm password */

function validateConfirm(){

const pass = document.getElementById("password").value;
const confirm = document.getElementById("confirmPassword").value;

if(confirm !== pass){
showError("confirmError","Mật khẩu không khớp");
return false;
}

clearError("confirmError");
return true;

}

/* validate gender */

function validateGender(){

const genders = document.getElementsByName("gender");

for(let g of genders){
if(g.checked){
clearError("genderError");
return true;
}
}

showError("genderError","Vui lòng chọn giới tính");
return false;

}

/* validate terms */

function validateTerms(){

if(!document.getElementById("terms").checked){
showError("termsError","Bạn phải đồng ý điều khoản");
return false;
}

clearError("termsError");
return true;

}

/* submit */

form.addEventListener("submit",function(e){

e.preventDefault();

const valid =
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirm() &
validateGender() &
validateTerms();

if(valid){

const name =
document.getElementById("fullname").value;

form.style.display = "none";

document.getElementById("successMessage")
.textContent = `Đăng ký thành công! 🎉 Chào ${name}`;

}

});

/* blur validation */

document
.getElementById("fullname")
.addEventListener("blur",validateFullname);

document
.getElementById("email")
.addEventListener("blur",validateEmail);

document
.getElementById("phone")
.addEventListener("blur",validatePhone);

document
.getElementById("password")
.addEventListener("blur",validatePassword);

document
.getElementById("confirmPassword")
.addEventListener("blur",validateConfirm);

/* clear error khi nhập lại */

document
.querySelectorAll("input")
.forEach(input=>{

input.addEventListener("input",()=>{

const errorId = input.id + "Error";

clearError(errorId);

});

});