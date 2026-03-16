let students = [];

/* xếp loại */

function getRank(score){

    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";

}

/* render bảng */

function renderTable(){

    const tbody = document.getElementById("tableBody");

    tbody.innerHTML = "";

    students.forEach((sv,index)=>{

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
        <button data-index="${index}" class="deleteBtn">Xóa</button>
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

    if(total > 0){

        let sum = students.reduce((a,b)=> a + b.score ,0);

        avg = (sum / total).toFixed(2);

    }

    stats.textContent = `Tổng sinh viên: ${total} | Điểm trung bình: ${avg}`;

}

/* thêm sinh viên */

function addStudent(){

    const nameInput = document.getElementById("name");
    const scoreInput = document.getElementById("score");

    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if(name === ""){
        alert("Họ tên không được để trống");
        return;
    }

    if(isNaN(score) || score < 0 || score > 10){
        alert("Điểm phải từ 0 đến 10");
        return;
    }

    students.push({
        name: name,
        score: score
    });

    renderTable();

    nameInput.value = "";
    scoreInput.value = "";

    nameInput.focus();

}

/* click thêm */

document.getElementById("addBtn")
.addEventListener("click", addStudent);


/* enter ở ô điểm */

document.getElementById("score")
.addEventListener("keydown", function(e){

    if(e.key === "Enter"){
        addStudent();
    }

});


/* event delegation xóa */

document.getElementById("tableBody")
.addEventListener("click", function(e){

    if(e.target.classList.contains("deleteBtn")){

        const index = e.target.dataset.index;

        students.splice(index,1);

        renderTable();

    }

});