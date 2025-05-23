// userList.js

// ** 顯示員工資料到表格的函式 **
function displayEmployees(dataToDisplay) {
    const tableBody = document.querySelector("#employeeTable tbody");

    if (!tableBody) {
        console.error("找不到 #employeeTable tbody 元素！");
        return;
    }

    tableBody.innerHTML = ''; // 先清空目前的表格內容 (包含 "正在載入...")

    if (dataToDisplay.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align: center;">找不到任何員工資料。</td></tr>';
        return;
    }

    // 遍歷每一筆員工資料
    dataToDisplay.forEach(employee => {
        // 建立一個新的表格列 <tr>
        const row = document.createElement('tr');

        // 建立並填入每一格 <td>
        row.innerHTML = `
            <td>${employee.id || ''}</td>
            <td>${employee.lastName || ''}</td>
            <td>${employee.firstName || ''}</td>
            <td>${employee.department || ''}</td>
            <td>${employee.ServiceMe ? '✔️' : '❌'}</td>
            <td>${employee.myService ? '✔️' : '❌'}</td>
            <td>${employee.LMS ? '✔️' : '❌'}</td>
            <td>${employee.SAP ? '✔️' : '❌'}</td>
        `; 
        // 加上 || '' 避免資料是 null 或 undefined 時顯示錯誤

        // 把建立好的 <tr> 加到 <tbody> 裡面
        tableBody.appendChild(row);
    });
}

// ** 載入 Navbar 的函式 **
function loadNavbar() {
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) throw new Error("無法載入 navbar.html");
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            // ** (可選) 在這裡設定 Navbar 的 Active 狀態 **
            // 例如，假設 "查詢員工" 的連結 ID 是 nav-query
            // const queryLink = document.getElementById('nav-query');
            // if(queryLink) {
            //     queryLink.classList.add('active');
            // }
        })
        .catch(error => console.error('載入 Navbar 時發生錯誤:', error));
}

// ** 載入員工資料的函式 **
function loadUsers() {
    fetch('/json/allUser.json')
        .then(response => {
            if (!response.ok) throw new Error("無法載入 allUser.json");
            return response.json();
        })
        .then(data => {
            console.log("成功載入員工資料:", data);
            displayEmployees(data); // 呼叫顯示函式
        })
        .catch(error => {
            console.error('載入員工資料時發生錯誤:', error);
            const tableBody = document.querySelector("#employeeTable tbody");
            if (tableBody) {
                 tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: red;">載入資料失敗！</td></tr>`;
            }
        });
}

// ** 當 HTML DOM 載入完成後，執行我們的函式 **
document.addEventListener("DOMContentLoaded", function() {
    loadNavbar(); // 載入 Navbar
    loadUsers();  // 載入並顯示員工資料
});