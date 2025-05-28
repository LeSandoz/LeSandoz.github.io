// terminationList.js

let allTerminatedEmployees = []; // 儲存所有終止的員工資料
let currentPage = 1; // 目前頁數
const itemsPerPage = 10; // 每頁顯示筆數

// ** 修改：顯示 Termination 員工資料到表格 (加上按鈕) **
function displayTerminatedEmployees(dataToDisplay) {
    const tableBody = document.querySelector("#terminationTable tbody");

    if (!tableBody) {
        console.error("找不到 #terminationTable tbody 元素！");
        return;
    }

    tableBody.innerHTML = ''; // 清空表格

    if (!dataToDisplay || dataToDisplay.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">找不到任何 Termination 員工資料。</td></tr>`; // Colspan 改 5
        return;
    }

    dataToDisplay.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.id || ''}</td>
            <td>${employee.lastName || ''}</td>
            <td>${employee.firstName || ''}</td>
            <td>${employee.department || ''}</td>
            <td>
                <button class="recover-button" data-id="${employee.id}">Recover</button> </td>
        `;
        tableBody.appendChild(row);
    });

    // ** 新增：呼叫按鈕監聽器 **
    addRecoverButtonListeners();
}

// ** 新增：為 Recover 按鈕加上事件監聽器 **
function addRecoverButtonListeners() {
    const tableBody = document.querySelector("#terminationTable tbody");
    if (tableBody) {
        // ** 移除舊的監聽器，避免重複綁定 **
        const newTableBody = tableBody.cloneNode(true);
        tableBody.parentNode.replaceChild(newTableBody, tableBody);

        newTableBody.addEventListener('click', function(event) {
            const target = event.target;

            // 處理 Recover 按鈕
            if (target && target.classList.contains('recover-button')) {
                const employeeId = target.getAttribute('data-id');
                const employee = allTerminatedEmployees.find(emp => emp.id === employeeId);

                let confirmMessage = `確定是否 recover 這筆員工 (${employeeId})?`;
                if (employee) {
                    confirmMessage = `確定是否 recover ${employee.lastName || ''} ${employee.firstName || ''} (${employeeId})?`;
                }

                // ** 使用 confirm 來顯示確認對話框 **
                const isConfirmed = confirm(confirmMessage);

                if (isConfirmed) {
                    console.log(`Confirmed recovery for ID: ${employeeId}`);
                    alert(`使用者 ${employeeId} 已確認恢復！(實際恢復功能尚未實作)`);
                    // ** 這裡可以加上實際呼叫後端 API 恢復資料的程式碼 **
                    // recoverEmployee(employeeId);
                } else {
                    console.log(`Recovery cancelled for ID: ${employeeId}`);
                }
            }
        });
    }
}

// ** (可選) 實際恢復的函式範例 (目前不會執行) **
// function recoverEmployee(id) {
//     // 1. 從 allTerminatedEmployees 移除 或 從 allUser.json 更新 isDelete
//     allTerminatedEmployees = allTerminatedEmployees.filter(emp => emp.id !== id);
//     // 2. 重新渲染
//     updateTableForPage();
//     console.log(`Employee ${id} recovered locally.`);
//     // 3. 呼叫後端 API
// }


// ** 渲染分頁控制項 (保留不變) **
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


// ** 跳轉頁面函式 (保留不變) **
function goToPage(pageNumber) {
    const totalPages = Math.ceil(allTerminatedEmployees.length / itemsPerPage);
    if (pageNumber < 1 || pageNumber > totalPages) return;
    currentPage = pageNumber;
    updateTableForPage();
}

// ** 更新表格內容函式 (保留不變) **
function updateTableForPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = allTerminatedEmployees.slice(startIndex, endIndex);
    displayTerminatedEmployees(paginatedData);
    renderPagination();
}

// ** 載入 Navbar 函式 (保留不變) **
function loadNavbar() {
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) throw new Error("無法載入 navbar.html");
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            const link = document.getElementById('nav-term');
            if(link) {
                link.classList.add('active');
            }
        })
        .catch(error => console.error('載入 Navbar 時發生錯誤:', error));
}

// ** 載入員工資料並過濾 (保留不變) **
function loadUsers() {
    fetch('../json/allUser.json') //
        .then(response => {
            if (!response.ok) throw new Error("無法載入 allUser.json"); //
            return response.json();
        })
        .then(data => {
            allTerminatedEmployees = data.filter(employee => employee.isDelete); //
            console.log("成功載入 Termination 員工資料:", allTerminatedEmployees.length, "筆");
            currentPage = 1;
            updateTableForPage();
        })
        .catch(error => {
            console.error('載入員工資料時發生錯誤:', error);
            const tableBody = document.querySelector("#terminationTable tbody");
            if (tableBody) {
                 tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: red;">載入資料失敗！</td></tr>`; // Colspan 改 5
            }
        });
}

// ** DOM 載入完成後執行 (保留不變) **
document.addEventListener("DOMContentLoaded", function() {
    loadNavbar();
    loadUsers();
});