// conversionList.js

let allEmployeesData = []; // 儲存從 employees.json 載入的原始資料
let displayedConvertedEmployees = []; // 儲存過濾後用於顯示的 Conversion 員工資料
let currentPage = 1;
const itemsPerPage = 10;

// ** 顯示 Conversion 員工資料到表格 (已修改) **
function displayConvertedEmployees(dataToDisplay) {
    const tableBody = document.querySelector("#conversionTable tbody");

    if (!tableBody) {
        console.error("找不到 #conversionTable tbody 元素！");
        return;
    }
    tableBody.innerHTML = '';

    // 根據 HTML，桌面版有5欄 (ID, Pre-ID, 姓氏, 名字, 部門)
    // 手機版 CSS 會隱藏「名字」，並合併「姓」和「名」到「姓氏」欄
    const isMobileView = window.innerWidth <= 768; // 假設 768px 是斷點
    const colspanValue = isMobileView ? 4 : 5; // 手機版視覺上變4欄

    if (!dataToDisplay || dataToDisplay.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="${colspanValue}" style="text-align: center;">找不到任何符合條件的 Conversion 員工資料。</td></tr>`;
        return;
    }

    dataToDisplay.forEach(employee => {
        const row = document.createElement('tr');
        let nameCellContentLastName;
        let nameCellContentFirstName = ''; // 初始化

        if (isMobileView) {
            // 手機版：合併姓名到「姓氏」欄位 (對應到 HTML 的第三個 th)
            nameCellContentLastName = (employee.Emp_LName || '') + ' ' + (employee.Emp_FName || '');
        } else {
            // 桌面版：姓氏和名字分開
            nameCellContentLastName = employee.Emp_LName || '';
            nameCellContentFirstName = employee.Emp_FName || '';
        }

        row.innerHTML = `
            <td>${employee.Emp_ID || ''}</td>
            <td>${employee.Pre_Emp_FK || ''}</td> 
            <td>${nameCellContentLastName}</td>
            <td>${nameCellContentFirstName}</td> 
            <td>${employee.Emp_Dep_Code || ''}</td>
        `;
        tableBody.appendChild(row);
    });
}

// ** (renderPagination, goToPage, updateTableForPage, loadNavbar 保持不變) **
function renderPagination() {
    const paginationContainer = document.getElementById('paginationControls');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';
    // 使用 displayedConvertedEmployees 計算總頁數
    const totalPages = Math.ceil(displayedConvertedEmployees.length / itemsPerPage);

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

function goToPage(pageNumber) {
    // 使用 displayedConvertedEmployees 計算總頁數
    const totalPages = Math.ceil(displayedConvertedEmployees.length / itemsPerPage);
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage) return;
    currentPage = pageNumber;
    updateTableForPage();
}

function updateTableForPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // 從 displayedConvertedEmployees 切片
    const paginatedData = displayedConvertedEmployees.slice(startIndex, endIndex);
    displayConvertedEmployees(paginatedData);
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
            const convLink = navbarPlaceholder.querySelector('#nav-conv'); // ID for Conversion List link
            if(convLink) {
                const activeLinks = navbarPlaceholder.querySelectorAll('#nav-menu a.active');
                activeLinks.forEach(link => link.classList.remove('active'));
                convLink.classList.add('active');
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
            console.log("成功載入 employees.json (原始 Conversion List 用):", allEmployeesData.length, "筆");

            // ** 修改：過濾條件 **
            // 1. Pre_Emp_FK 有值 (不為 null 且不為空字串)
            // 2. IsDelete 為 0
            displayedConvertedEmployees = allEmployeesData.filter(employee =>
                employee.Pre_Emp_FK && employee.Pre_Emp_FK.toString().trim() !== '' && // 確保 Pre_Emp_FK 有實際值
                employee.IsDelete === 0
            );

            console.log("過濾後 Conversion 員工資料 (顯示):", displayedConvertedEmployees.length, "筆");

            currentPage = 1;
            updateTableForPage();
        })
        .catch(error => {
            console.error('載入員工資料時發生錯誤 (Conversion List):', error);
            const tableBody = document.querySelector("#conversionTable tbody");
            if (tableBody) {
                 tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: red;">載入 Conversion 資料失敗！</td></tr>`;
            }
        });
}

// 建議加上 resize listener
window.addEventListener('resize', function() {
    if (displayedConvertedEmployees.length > 0) { // 檢查 displayedConvertedEmployees
        updateTableForPage();
    }
});

// ** DOM 載入完成後執行 **
document.addEventListener("DOMContentLoaded", function() {
    loadNavbar(); // Navbar 應該由 navbar.js 自己處理載入和事件
    loadUsers();
});