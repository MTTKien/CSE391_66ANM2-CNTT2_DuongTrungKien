const prices = {
"Áo":150000,
"Quần":200000,
"Giày":500000
};

const form = document.getElementById("orderForm");

/* utility */

function showError(id,msg){
document.getElementById(id).textContent = msg;
}

function clearError(id){
document.getElementById(id).textContent = "";
}

/* validate product */

function validateProduct(){

const product = document.getElementById("product").value;

if(product === ""){
showError("productError","Vui lòng chọn sản phẩm");
return false;
}

clearError("productError");
return true;

}

/* validate quantity */

function validateQuantity(){

const q = parseInt(document.getElementById("quantity").value);

if(isNaN(q) || q < 1 || q > 99){
showError("quantityError","Số lượng 1-99");
return false;
}

clearError("quantityError");
return true;

}

/* validate date */

function validateDate(){

const input = document.getElementById("deliveryDate").value;

if(!input){
showError("dateError","Chọn ngày giao");
return false;
}

const today = new Date();
today.setHours(0,0,0,0);

const selected = new Date(input);

const maxDate = new Date();
maxDate.setDate(today.getDate()+30);

if(selected < today){
showError("dateError","Không được chọn ngày quá khứ");
return false;
}

if(selected > maxDate){
showError("dateError","Không quá 30 ngày");
return false;
}

clearError("dateError");
return true;

}

/* validate address */

function validateAddress(){

const addr = document.getElementById("address").value.trim();

if(addr.length < 10){
showError("addressError","Địa chỉ ≥ 10 ký tự");
return false;
}

clearError("addressError");
return true;

}

/* validate note */

function validateNote(){

const note = document.getElementById("note").value;

if(note.length > 200){
showError("noteError","Tối đa 200 ký tự");
return false;
}

clearError("noteError");
return true;

}

/* validate payment */

function validatePayment(){

const methods = document.getElementsByName("payment");

for(let m of methods){
if(m.checked){
clearError("paymentError");
return true;
}
}

showError("paymentError","Chọn phương thức thanh toán");
return false;

}

/* tính tổng tiền */

function updateTotal(){

const product = document.getElementById("product").value;
const quantity = Number(document.getElementById("quantity").value);

if(prices[product] && quantity){

const total = prices[product] * quantity;

document.getElementById("totalPrice")
.textContent = total.toLocaleString("vi-VN");

}

}

/* note counter */

document.getElementById("note")
.addEventListener("input",function(){

const len = this.value.length;

const counter = document.getElementById("noteCounter");

counter.textContent = `${len}/200`;

if(len > 200){

counter.style.color = "red";
showError("noteError","Quá 200 ký tự");

}else{

counter.style.color = "black";
clearError("noteError");

}

});

/* auto total */

document
.getElementById("product")
.addEventListener("change",updateTotal);

document
.getElementById("quantity")
.addEventListener("input",updateTotal);

/* blur validation */

document.getElementById("product")
.addEventListener("blur",validateProduct);

document.getElementById("quantity")
.addEventListener("blur",validateQuantity);

document.getElementById("deliveryDate")
.addEventListener("blur",validateDate);

document.getElementById("address")
.addEventListener("blur",validateAddress);

/* submit */

form.addEventListener("submit",function(e){

e.preventDefault();

const valid =
validateProduct() &
validateQuantity() &
validateDate() &
validateAddress() &
validateNote() &
validatePayment();

if(!valid) return;

const product = document.getElementById("product").value;
const quantity = document.getElementById("quantity").value;
const date = document.getElementById("deliveryDate").value;
const total = document.getElementById("totalPrice").textContent;

document.getElementById("orderSummary").textContent =
`Sản phẩm: ${product} | SL: ${quantity} | Tổng tiền: ${total} VNĐ | Ngày giao: ${date}`;

document.getElementById("confirmBox").style.display="block";

});

/* confirm */

document
.getElementById("confirmBtn")
.addEventListener("click",()=>{

form.style.display="none";

document.getElementById("confirmBox").style.display="none";

document.getElementById("successMessage")
.textContent = "Đặt hàng thành công! 🎉";

});

/* cancel */

document
.getElementById("cancelBtn")
.addEventListener("click",()=>{

document.getElementById("confirmBox").style.display="none";

});