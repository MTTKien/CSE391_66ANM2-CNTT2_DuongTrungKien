let students = [];
let filteredStudents = [];

let sortAsc = true;

/* xếp loại */

function getRank(score){

if(score >= 8.5) return "Giỏi";
if(score >= 7) return "Khá";
if(score >= 5) return "Trung bình";
return "Yếu";

}

/* thêm sinh viên */

function addStudent(){

const name = document.getElementById("name").value.trim();
const score = parseFloat(document.getElementById("score").value);

if(name === ""){
alert("Họ tên không được trống");
return;
}

if(isNaN(score) || score < 0 || score > 10){
alert("Điểm phải từ 0-10");
return;
}

students.push({name,score});

document.getElementById("name").value="";
document.getElementById("score").value="";

applyFilters();

}

/* áp dụng search + filter + sort */

function applyFilters(){

const keyword = document
.getElementById("search")
.value
.toLowerCase();

const rankFilter = document
.getElementById("filterRank")
.value;

filteredStudents = students.filter(sv =>{

const matchName =
sv.name.toLowerCase().includes(keyword);

const rank = getRank(sv.score);

const matchRank =
rankFilter === "all" || rank === rankFilter;

return matchName && matchRank;

});

filteredStudents.sort((a,b)=>{

return sortAsc
? a.score - b.score
: b.score - a.score;

});

renderTable();

}

/* render bảng */

function renderTable(){

const tbody = document.getElementById("tableBody");

tbody.innerHTML="";

if(filteredStudents.length === 0){

tbody.innerHTML = `
<tr>
<td colspan="5" class="no-result">
Không có kết quả
</td>
</tr>
`;

return;

}

filteredStudents.forEach((sv,index)=>{

const tr = document.createElement("tr");

if(sv.score < 5){
tr.classList.add("low-score");
}

tr.innerHTML = `
<td>${index+1}</td>
<td>${sv.name}</td>
<td>${sv.score}</td>
<td>${getRank(sv.score)}</td>
<td>
<button data-name="${sv.name}">
Xóa
</button>
</td>
`;

tbody.appendChild(tr);

});

updateStats();

}

/* thống kê */

function updateStats(){

const stats = document.getElementById("stats");

const total = students.length;

let avg = 0;

if(total>0){

const sum = students.reduce((a,b)=>a+b.score,0);

avg = (sum/total).toFixed(2);

}

stats.textContent =
`Tổng SV: ${total} | Điểm TB: ${avg}`;

}

/* sort */

document
.getElementById("sortScore")
.addEventListener("click",()=>{

sortAsc = !sortAsc;

document.getElementById("sortIcon").textContent =
sortAsc ? "▲" : "▼";

applyFilters();

});

/* search realtime */

document
.getElementById("search")
.addEventListener("input",applyFilters);

/* filter */

document
.getElementById("filterRank")
.addEventListener("change",applyFilters);

/* thêm */

document
.getElementById("addBtn")
.addEventListener("click",addStudent);

/* enter để thêm */

document
.getElementById("score")
.addEventListener("keydown",e=>{

if(e.key==="Enter") addStudent();

});

/* xóa */

document
.getElementById("tableBody")
.addEventListener("click",e=>{

if(e.target.tagName==="BUTTON"){

const name = e.target.dataset.name;

students =
students.filter(sv => sv.name !== name);

applyFilters();

}

});