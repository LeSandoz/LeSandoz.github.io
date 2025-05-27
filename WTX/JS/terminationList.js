// terminationList.js

let allTerminatedEmployees = []; // 儲存所有終止的員工資料
let currentPage = 1; // 目前頁數
const itemsPerPage = 10; // 每頁顯示筆數

// ** 顯示 Termination 員工資料到表格 **
function displayTerminatedEmployees(dataToDisplay) {
    const tableBody = document.querySelector("#terminationTable tbody");

    if (!tableBody) {
        console.error("找不到 #terminationTable tbody 元素！");
        return;
    }

    tableBody.innerHTML = ''; // 清空表格

    if (!dataToDisplay || dataToDisplay.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" style="text-align: center;">找不到任何 Termination 員工資料。</td></tr>`;
        return;
    }

    dataToDisplay.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.id || ''}</td>
            <td>${employee.lastName || ''}</td>
            <td>${employee.firstName || ''}</td>
            <td>${employee.department || ''}</td>
        `; // ** 沒有操作按鈕 **
        tableBody.appendChild(row);
    });
}

// ** 渲染分頁控制項 (與 userList.js 類似) **
function renderPagination() {
    const paginationContainer = document.getElementById('paginationControls');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(allTerminatedEmployees.length / itemsPerPage);

    if (totalPages <= 1) return;

    function createButton(text, pageNum, isDisabled = false, isActive = false, isEllipsis = false) {
        const button = document.createElement('button');
        button.textContent = text;
        if (isEllipsis) {
            button.classList.add('ellipsis');
            button.disabled = true;
        } else {
            button.dataset.page = pageNum;
            button.disabled = isDisabled;
            if (isActive) button.classList.add('active');
            button.addEventListener('click', (e) => {
                goToPage(parseInt(e.target.dataset.page));
            });
        }
        return button;
    }

    paginationContainer.appendChild(createButton('第一頁', 1, currentPage === 1));

    const maxPagesToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow + 2) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - Math.floor(maxPagesToShow / 2);
            endPage = currentPage + Math.floor(maxPagesToShow / 2);
        }
    }

    if (startPage > 1) {
        paginationContainer.appendChild(createButton('1', 1));
        if (startPage > 2) {
             paginationContainer.appendChild(createButton('...', 0, true, false, true));
        }
    }

    for (let i = startPage; i <= endPage; i++) {
         if (i > 0 && i <= totalPages) {
            paginationContainer.appendChild(createButton(i, i, false, i === currentPage));
         }
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
             paginationContainer.appendChild(createButton('...', 0, true, false, true));
        }
         paginationContainer.appendChild(createButton(totalPages, totalPages));
    }

    paginationContainer.appendChild(createButton('最後一頁', totalPages, currentPage === totalPages));
}

// ** 跳轉頁面函式 **
function goToPage(pageNumber) {
    const totalPages = Math.ceil(allTerminatedEmployees.length / itemsPerPage);
    if (pageNumber < 1 || pageNumber > totalPages) return;
    currentPage = pageNumber;
    updateTableForPage();
}

// ** 更新表格內容函式 **
function updateTableForPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = allTerminatedEmployees.slice(startIndex, endIndex);
    displayTerminatedEmployees(paginatedData);
    renderPagination();
}

// ** 載入 Navbar 函式 **
function loadNavbar() {
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) throw new Error("無法載入 navbar.html");
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            // ** 設定 Navbar 的 Active 狀態 **
            const link = document.getElementById('nav-term'); // ** 對應 ID **
            if(link) {
                link.classList.add('active');
            }
        })
        .catch(error => console.error('載入 Navbar 時發生錯誤:', error));
}

// ** 載入員工資料並過濾 **
function loadUsers() {
    fetch('../json/allUser.json') //
        .then(response => {
            if (!response.ok) throw new Error("無法載入 allUser.json"); //
            return response.json();
        })
        .then(data => {
            // ** 過濾: isDelete 為 true **
            allTerminatedEmployees = data.filter(employee => employee.isDelete); //
            console.log("成功載入 Termination 員工資料:", allTerminatedEmployees.length, "筆");
            currentPage = 1;
            updateTableForPage();
        })
        .catch(error => {
            console.error('載入員工資料時發生錯誤:', error);
            const tableBody = document.querySelector("#terminationTable tbody");
            if (tableBody) {
                 tableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: red;">載入資料失敗！</td></tr>`;
            }
        });
}

// ** DOM 載入完成後執行 **
document.addEventListener("DOMContentLoaded", function() {
    loadNavbar();
    loadUsers();
});