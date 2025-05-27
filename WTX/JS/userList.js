// userList.js

let allEmployees = []; // 儲存所有員工資料
let currentPage = 1; // 目前頁數
const itemsPerPage = 10; // 每頁顯示筆數

// ** 顯示員工資料到表格的函式 **
function displayEmployees(dataToDisplay) {
    const tableBody = document.querySelector("#employeeTable tbody");

    if (!tableBody) {
        console.error("找不到 #employeeTable tbody 元素！");
        return;
    }

    tableBody.innerHTML = ''; // 清空表格

    if (!dataToDisplay || dataToDisplay.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="9" style="text-align: center;">找不到任何員工資料。</td></tr>`;
        return;
    }

    dataToDisplay.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.id || ''}</td>
            <td>${employee.lastName || ''}</td>
            <td>${employee.firstName || ''}</td>
            <td>${employee.department || ''}</td>
            <td>${employee.ServiceMe ? '✔️' : '❌'}</td>
            <td>${employee.myService ? '✔️' : '❌'}</td>
            <td>${employee.LMS ? '✔️' : '❌'}</td>
            <td>${employee.SAP ? '✔️' : '❌'}</td>
            <td>
                <div style="display: flex; justify-content: center; align-items: center; gap: 5px;">
                    <button class="update-button" data-id="${employee.id}">Update</button>
                    <button class="delete-button" data-id="${employee.id}">Delete</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });

    addTableButtonListeners();
}

function addTableButtonListeners() {
    const tableBody = document.querySelector("#employeeTable tbody");
    if (tableBody) {
        const newTableBody = tableBody.cloneNode(true);
        tableBody.parentNode.replaceChild(newTableBody, tableBody);

        newTableBody.addEventListener('click', function(event) {
            const target = event.target;

            // ** 修改：處理 Update 按鈕 -> 跳轉頁面 **
            if (target && target.classList.contains('update-button')) {
                const employeeId = target.getAttribute('data-id');
                console.log(`Redirecting to edit page for ID: ${employeeId}`);
                // ** 跳轉到 editUser.html 並帶上 id 參數 **
                window.location.href = `../HTML/editUser.html?id=${employeeId}`;
            }

            // 處理 Delete 按鈕 (保留之前的修改)
            if (target && target.classList.contains('delete-button')) {
                const employeeId = target.getAttribute('data-id');
                const employee = allEmployees.find(emp => emp.id === employeeId);
                let confirmMessage = `是否刪除該員?`;
                if (employee) {
                    confirmMessage = `是否刪除 ${employee.lastName || ''} ${employee.firstName || ''} (${employee.id})?`;
                }
                const isConfirmed = confirm(confirmMessage);
                if (isConfirmed) {
                    console.log(`Confirmed deletion for ID: ${employeeId}`);
                    alert(`使用者 ${employee ? `${employee.lastName} ${employee.firstName}` : employeeId} 已確認刪除！(實際刪除功能尚未實作)`);
                    // deleteEmployee(employeeId);
                } else {
                    console.log(`Deletion cancelled for ID: ${employeeId}`);
                }
            }
        });
    }
}

// ** 渲染分頁控制項的函式 **
function renderPagination() {
    const paginationContainer = document.getElementById('paginationControls');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(allEmployees.length / itemsPerPage);

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
    const totalPages = Math.ceil(allEmployees.length / itemsPerPage);
    if (pageNumber < 1 || pageNumber > totalPages) return;
    currentPage = pageNumber;
    updateTableForPage();
}

// ** 更新表格內容函式 **
function updateTableForPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = allEmployees.slice(startIndex, endIndex);
    displayEmployees(paginatedData);
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
            const queryLink = document.getElementById('nav-query');
            if(queryLink) {
                queryLink.classList.add('active');
            }
        })
        .catch(error => console.error('載入 Navbar 時發生錯誤:', error));
}

// ** 載入員工資料的函式 (已修改：加入 isDelete 過濾) **
function loadUsers() {
    fetch('../json/allUser.json') //
        .then(response => {
            if (!response.ok) throw new Error("無法載入 allUser.json"); //
            return response.json();
        })
        .then(data => {
            console.log("成功載入員工資料 (原始):", data.length, "筆"); //

            // ** 關鍵修改：過濾掉 isDelete 為 true 的員工 **
            allEmployees = data.filter(employee => !employee.isDelete); //

            console.log("過濾後員工資料 (顯示):", allEmployees.length, "筆");

            currentPage = 1; // 每次載入都回到第一頁
            updateTableForPage(); // 顯示第一頁並建立分頁 (現在會用過濾後的資料)
        })
        .catch(error => {
            console.error('載入員工資料時發生錯誤:', error);
            const tableBody = document.querySelector("#employeeTable tbody");
            if (tableBody) {
                 tableBody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: red;">載入資料失敗！</td></tr>`;
            }
        });
}

// ** DOM 載入完成後執行 **
document.addEventListener("DOMContentLoaded", function() {
    loadNavbar();
    loadUsers();
});