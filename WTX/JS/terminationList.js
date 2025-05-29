// terminationList.js

let allEmployeesData = []; // 儲存從 employees.json 載入的原始資料
let displayedTerminatedEmployees = []; // 儲存過濾後用於顯示的 Terminated 員工資料
let currentPage = 1;
const itemsPerPage = 10;

// ** 顯示 Termination 員工資料到表格 (已修改) **
function displayTerminatedEmployees(dataToDisplay) {
    const tableBody = document.querySelector("#terminationTable tbody");

    if (!tableBody) {
        console.error("找不到 #terminationTable tbody 元素！");
        return;
    }
    tableBody.innerHTML = '';

    // 根據 HTML，桌面版有5欄 (ID, 姓氏, 名字, 部門, 操作)
    // 手機版 CSS 會隱藏「名字」和「部門」，並合併「姓」和「名」到「姓氏」欄，按鈕圖示化
    const isMobileView = window.innerWidth <= 768; // 假設 768px 是斷點
    const colspanValue = isMobileView ? 3 : 5; // 手機版視覺上變3欄 (ID, 姓名, 操作)

    if (!dataToDisplay || dataToDisplay.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="${colspanValue}" style="text-align: center;">找不到任何符合條件的 Termination 員工資料。</td></tr>`;
        return;
    }

    dataToDisplay.forEach(employee => {
        const row = document.createElement('tr');
        let nameCellContentLastName;
        let nameCellContentFirstName = ''; // 初始化
        let departmentContent = ''; // 初始化

        if (isMobileView) {
            // 手機版：合併姓名到「姓氏」欄位 (對應到 HTML 的第二個 th)
            nameCellContentLastName = (employee.Emp_LName || '') + ' ' + (employee.Emp_FName || '');
            // 名字欄位和部門欄位在手機版不顯示 (由 CSS 控制 display:none)
        } else {
            // 桌面版：姓氏和名字分開，部門也顯示
            nameCellContentLastName = employee.Emp_LName || '';
            nameCellContentFirstName = employee.Emp_FName || '';
            departmentContent = employee.Emp_Dep_Code || '';
        }

        row.innerHTML = `
            <td>${employee.Emp_ID || ''}</td>
            <td>${nameCellContentLastName}</td>
            <td>${nameCellContentFirstName}</td> 
            <td>${departmentContent}</td> 
            <td>
                <button class="recover-button" data-id="${employee.ID}" title="恢復"> 
                    <span class="button-icon recover-icon">&#x21BB;</span>
                    <span class="button-text">Recover</span>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    addRecoverButtonListeners();
}

// ** (addRecoverButtonListeners, renderPagination, goToPage, updateTableForPage, loadNavbar 保持不變) **
function addRecoverButtonListeners() {
    const tableBody = document.querySelector("#terminationTable tbody");
    if (tableBody) {
        const newTableBody = tableBody.cloneNode(true);
        tableBody.parentNode.replaceChild(newTableBody, tableBody);

        newTableBody.addEventListener('click', function(event) {
            const target = event.target.closest('button'); // 確保點到按鈕

            if (target && target.classList.contains('recover-button')) {
                const employeeId = target.getAttribute('data-id');
                const employee = allEmployeesData.find(emp => emp.ID.toString() === employeeId); // 從原始數據找

                let confirmMessage = `確定是否 recover 這筆員工 (${employeeId})?`;
                if (employee) {
                    confirmMessage = `確定是否 recover ${employee.Emp_LName || ''} ${employee.Emp_FName || ''} (${employee.Emp_ID || employeeId})?`;
                }

                const isConfirmed = confirm(confirmMessage);

                if (isConfirmed) {
                    console.log(`Confirmed recovery for ID: ${employeeId}`);
                    alert(`員工 ${employee ? `${employee.Emp_LName} ${employee.Emp_FName}` : employeeId} 已確認恢復！(實際恢復功能尚未實作)`);
                    // ** 實際恢復邏輯：**
                    // 1. 更新 allEmployeesData 中該員工的 IsDelete 為 0
                    // 2. 可選：更新 Update_Datetime, Update_Emp_FK
                    // 3. 重新過濾 displayedTerminatedEmployees (它會自動從列表中移除)
                    // 4. 更新表格顯示
                    // 5. (重要) 如果有後端，需要發送請求到後端更新資料庫
                    //    然後可能需要重新 fetch `employees.json` 或至少更新本地的 `allEmployeesData`
                    //    為簡化前端演示，我們先假設只更新本地數據並重繪
                    const employeeToRecover = allEmployeesData.find(emp => emp.ID.toString() === employeeId);
                    if (employeeToRecover) {
                        employeeToRecover.IsDelete = 0;
                        // employeeToRecover.Update_Datetime = new Date().toLocaleString(); // 範例
                        // employeeToRecover.Update_Emp_FK = "CURRENT_USER_ID"; // 範例
                        
                        // 重新過濾 displayedTerminatedEmployees
                        displayedTerminatedEmployees = allEmployeesData.filter(emp => emp.IsDelete === 1);
                        updateTableForPage(); // 重新渲染當前頁面
                        alert('本地資料已標記為恢復，列表已更新。');
                    }

                } else {
                    console.log(`Recovery cancelled for ID: ${employeeId}`);
                }
            }
        });
    }
}

function renderPagination() {
    const paginationContainer = document.getElementById('paginationControls');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(displayedTerminatedEmployees.length / itemsPerPage); // 基於 displayedTerminatedEmployees

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
    // ... (分頁按鈕生成邏輯不變，確保使用 displayedTerminatedEmployees.length) ...
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


function goToPage(pageNumber) {
    const totalPages = Math.ceil(displayedTerminatedEmployees.length / itemsPerPage); // 基於 displayedTerminatedEmployees
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage) return;
    currentPage = pageNumber;
    updateTableForPage();
}

function updateTableForPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = displayedTerminatedEmployees.slice(startIndex, endIndex); // 從 displayedTerminatedEmployees 切片
    displayTerminatedEmployees(paginatedData);
    renderPagination();
}

function loadNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (!navbarPlaceholder) return;
    fetch('../HTML/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarPlaceholder.innerHTML = data;
            // Navbar JS logic (menu toggle, active link) should be in navbar.js
            const termLink = navbarPlaceholder.querySelector('#nav-term'); // ID for Termination List link
            if(termLink) {
                const activeLinks = navbarPlaceholder.querySelectorAll('#nav-menu a.active');
                activeLinks.forEach(link => link.classList.remove('active'));
                termLink.classList.add('active');
            }
        })
        .catch(error => console.error('載入 Navbar 時發生錯誤:', error));
}

// ** 載入員工資料並過濾 (已修改) **
function loadUsers() {
    fetch('../json/employees.json') // 確認抓取的是 employees.json
        .then(response => {
            if (!response.ok) throw new Error("無法載入 employees.json");
            return response.json();
        })
        .then(data => {
            allEmployeesData = data; // 保存原始載入的員工資料
            console.log("成功載入 employees.json (原始 Termination List 用):", allEmployeesData.length, "筆");

            // ** 修改：過濾條件 **
            // 只顯示 IsDelete 為 1 的員工
            displayedTerminatedEmployees = allEmployeesData.filter(employee => employee.IsDelete === 1);

            console.log("過濾後 Termination 員工資料 (顯示):", displayedTerminatedEmployees.length, "筆");

            currentPage = 1;
            updateTableForPage();
        })
        .catch(error => {
            console.error('載入員工資料時發生錯誤 (Termination List):', error);
            const tableBody = document.querySelector("#terminationTable tbody");
            if (tableBody) {
                 tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: red;">載入 Termination 資料失敗！</td></tr>`;
            }
        });
}

// 建議加上 resize listener
window.addEventListener('resize', function() {
    if (displayedTerminatedEmployees.length > 0) { // 檢查 displayedTerminatedEmployees
        updateTableForPage();
    }
});

// ** DOM 載入完成後執行 **
document.addEventListener("DOMContentLoaded", function() {
    loadNavbar(); // Navbar 應該由 navbar.js 自己處理載入和事件
    loadUsers();
});