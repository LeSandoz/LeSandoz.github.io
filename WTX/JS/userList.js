let allEmployeesData = [];
let allEmployeeSystemsData = [];
let allSystemsData = [];

let displayedEmployees = []; // 這個陣列儲存經過所有篩選和搜尋後的結果
let currentPage = 1;
const itemsPerPage = 10;

// DOM 元素 - 會在 DOMContentLoaded 後初始化
let keywordSearchInput, systemFilterSelect, statusFilterSelect, departmentFilterSelect, clearFiltersButton, applySearchButton;
let tableBody, paginationControls;

// --- Helper Functions (保持不變) ---
function getSystemCodeById(systemId) {
    if (!allSystemsData) return null;
    const system = allSystemsData.find(s => s.System_ID === systemId);
    return system ? system.System_Code : null;
}

function hasActiveAccess(employeeId, systemCode) {
    if (!allEmployeeSystemsData || !allEmployeeSystemsData.length || !allSystemsData || !allSystemsData.length) return false;
    const system = allSystemsData.find(s => s.System_Code === systemCode);
    if (!system) return false;
    const systemId = system.System_ID;
    return allEmployeeSystemsData.some(record =>
        record.Employee_FK === employeeId &&
        record.System_FK === systemId &&
        record.Is_Active === 1
    );
}

// --- Populate Filter Dropdowns (保持不變) ---
function populateSystemFilter() {
    if (!systemFilterSelect || !allSystemsData || !allSystemsData.length) return;
    while (systemFilterSelect.options.length > 1) { systemFilterSelect.remove(1); }
    allSystemsData.forEach(system => {
        const option = document.createElement('option');
        option.value = system.System_ID;
        option.textContent = system.System_Name || system.System_Code;
        systemFilterSelect.appendChild(option);
    });
}

function populateDepartmentFilter() {
    if (!departmentFilterSelect || !allEmployeesData || !allEmployeesData.length) return;
    while (departmentFilterSelect.options.length > 1) { departmentFilterSelect.remove(1); }
    const departments = [...new Set(allEmployeesData.map(emp => emp.Emp_Dep_Code).filter(dept => dept))].sort();
    departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept;
        option.textContent = dept;
        departmentFilterSelect.appendChild(option);
    });
}

// --- Apply Filters and Search ---
function applyFiltersAndSearch() {
    console.log("applyFiltersAndSearch CALLED");
    if (!allEmployeesData) {
        console.warn("applyFiltersAndSearch: allEmployeesData 未載入，篩選中止。");
        if (tableBody) tableBody.innerHTML = `<tr><td colspan="9" style="text-align: center;">資料尚未完全載入，請稍後再試...</td></tr>`;
        return;
    }

    const keyword = keywordSearchInput ? keywordSearchInput.value.toLowerCase().trim() : "";
    const selectedSystemId = systemFilterSelect && systemFilterSelect.value ? parseInt(systemFilterSelect.value, 10) : "";
    const selectedStatus = statusFilterSelect ? statusFilterSelect.value : "";
    const selectedDepartment = departmentFilterSelect ? departmentFilterSelect.value : "";

    console.log("當前篩選條件:", { keyword, selectedSystemId, selectedStatus, selectedDepartment });

    let filteredEmployees = [...allEmployeesData]; // 從完整的原始資料開始篩選

    if (selectedStatus === "active") {
        filteredEmployees = filteredEmployees.filter(emp => emp.IsDelete === 0);
    } else if (selectedStatus === "deleted") {
        filteredEmployees = filteredEmployees.filter(emp => emp.IsDelete === 1);
    }

    if (selectedDepartment) {
        filteredEmployees = filteredEmployees.filter(emp => emp.Emp_Dep_Code === selectedDepartment);
    }

    if (selectedSystemId) {
        if (!allEmployeeSystemsData || !allSystemsData) {
            console.warn("applyFiltersAndSearch: 系統權限資料尚未載入，無法執行系統篩選。");
        } else {
            filteredEmployees = filteredEmployees.filter(emp => {
                return allEmployeeSystemsData.some(record =>
                    record.Employee_FK === emp.ID &&
                    record.System_FK === selectedSystemId &&
                    record.Is_Active === 1
                );
            });
        }
    }

    if (keyword) {
        filteredEmployees = filteredEmployees.filter(emp => {
            const fullNameDirect = `${emp.Emp_LName || ''} ${emp.Emp_FName || ''}`.toLowerCase();
            const fullNameReversed = `${emp.Emp_FName || ''} ${emp.Emp_LName || ''}`.toLowerCase();
            return (emp.Emp_ID && emp.Emp_ID.toLowerCase().includes(keyword)) ||
                   (emp.Emp_LName && emp.Emp_LName.toLowerCase().includes(keyword)) ||
                   (emp.Emp_FName && emp.Emp_FName.toLowerCase().includes(keyword)) ||
                   (fullNameDirect.includes(keyword)) ||
                   (fullNameReversed && fullNameReversed.includes(keyword) && emp.Emp_FName);
        });
    }

    displayedEmployees = filteredEmployees; // **更新 displayedEmployees**

    // --- **修改：詳細列出篩選結果的員工細節** ---
    console.log(`篩選/搜尋完成。共 ${displayedEmployees.length} 筆員工符合條件：`);
        if (displayedEmployees.length > 0) {
        console.log("以下為篩選後的員工詳細資料 (ID, 姓名, 部門):");
        displayedEmployees.forEach((emp, index) => {
            console.log(
                `  Record <span class="math-inline">\{index \+ 1\}\: Emp\_ID\=</span>{emp.Emp_ID}, Name=${emp.Emp_LName || ''} <span class="math-inline">\{emp\.Emp\_FName \|\| ''\}, Department\=</span>{emp.Emp_Dep_Code}`
            );
        });
    }
    // --- Log 修改結束 ---

    currentPage = 1; // 重置到第一頁
    console.log("準備呼叫 updateTableForPage (從 applyFiltersAndSearch)");
    updateTableForPage(); // **確保這一行被呼叫以更新表格和分頁**
}

// --- Update Table For Page ---
function updateTableForPage() {
    console.log("updateTableForPage CALLED. currentPage:", currentPage, "displayedEmployees length:", displayedEmployees ? displayedEmployees.length : 'undefined');
    if (!displayedEmployees) {
        console.warn("updateTableForPage: displayedEmployees 未定義。");
        if (tableBody) {
             tableBody.innerHTML = `<tr><td colspan="9" style="text-align: center;">資料錯誤，請稍後再試。</td></tr>`;
        }
        if (paginationControls) paginationControls.innerHTML = '';
        return;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = displayedEmployees.slice(startIndex, endIndex);

    console.log(`準備傳給 displayEmployees 的分頁資料 (paginatedData) 長度: ${paginatedData.length}`);
    displayEmployees(paginatedData);
    renderPagination();
}

// --- Display Employees ---
function displayEmployees(dataToDisplay) {
    console.log("displayEmployees CALLED. 實際渲染的資料長度:", dataToDisplay ? dataToDisplay.length : 'undefined');
    if (!tableBody) {
        console.error("displayEmployees: tableBody is not defined or not found in DOM.");
        return;
    }
    tableBody.innerHTML = ''; // **確保每次都先清空**
    const colspanValue = 9;

    if (!dataToDisplay || dataToDisplay.length === 0) { // 即使 dataToDisplay 是空陣列，也應該顯示 "無資料" 而不是 "準備中"
        console.log("displayEmployees: dataToDisplay 為空或未定義，顯示無資料訊息。");
        tableBody.innerHTML = `<tr><td colspan="${colspanValue}" style="text-align: center;">找不到任何符合篩選條件的員工資料。</td></tr>`;
        if (paginationControls) paginationControls.innerHTML = '';
        return;
    }

    const isMobileView = window.innerWidth <= 768;
    dataToDisplay.forEach(employee => {
        const row = document.createElement('tr');
        if (isMobileView) {
            row.classList.add('mobile-clickable-row');
            row.setAttribute('data-id', employee.ID);
        }
        let nameCellContentLastName = isMobileView ? `${employee.Emp_LName || ''} ${employee.Emp_FName || ''}` : (employee.Emp_LName || '');
        let nameCellContentFirstName = isMobileView ? '' : (employee.Emp_FName || '');

        row.innerHTML = `
            <td>${employee.Emp_ID || ''}</td>
            <td>${nameCellContentLastName}</td>
            <td>${nameCellContentFirstName}</td>
            <td>${employee.Emp_Dep_Code || ''}</td>
            <td>${hasActiveAccess(employee.ID, "SME") ? '✔️' : '❌'}</td>
            <td>${hasActiveAccess(employee.ID, "mySvs") ? '✔️' : '❌'}</td>
            <td>${hasActiveAccess(employee.ID, "LMS") ? '✔️' : '❌'}</td>
            <td>${hasActiveAccess(employee.ID, "SAP") ? '✔️' : '❌'}</td>
            <td>
                <div style="display: flex; justify-content: center; align-items: center; gap: 5px;">
                    <button class="update-button" data-id="${employee.ID}" title="更新">
                        <span class="button-icon update-icon">&#9998;</span>
                        <span class="button-text">Update</span>
                    </button>
                    <button class="delete-button" data-id="${employee.ID}" title="刪除">
                        <span class="button-icon delete-icon">&#128465;</span>
                        <span class="button-text">Delete</span>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
    addTableButtonListeners();
}

// --- Event Listeners for Filters ---
function addFilterListeners() {
    console.log("addFilterListeners CALLED");
    // 移除 'input' 和 'change' 事件的自動觸發，僅依賴搜尋按鈕
    // if(keywordSearchInput) keywordSearchInput.addEventListener('input', applyFiltersAndSearch);
    // if(systemFilterSelect) systemFilterSelect.addEventListener('change', applyFiltersAndSearch);
    // if(statusFilterSelect) statusFilterSelect.addEventListener('change', applyFiltersAndSearch);
    // if(departmentFilterSelect) departmentFilterSelect.addEventListener('change', applyFiltersAndSearch);

    if(applySearchButton) { // 確保你的HTML有 id="applySearchButton" 的搜尋按鈕
        applySearchButton.addEventListener('click', applyFiltersAndSearch);
        console.log("已為 applySearchButton 綁定 click 事件。");
    } else {
        console.warn("applySearchButton 未找到，無法綁定搜尋事件。");
        // 如果沒有搜尋按鈕，那麼篩選器改變時應自動觸發
        if(keywordSearchInput) keywordSearchInput.addEventListener('input', applyFiltersAndSearch);
        if(systemFilterSelect) systemFilterSelect.addEventListener('change', applyFiltersAndSearch);
        if(statusFilterSelect) statusFilterSelect.addEventListener('change', applyFiltersAndSearch);
        if(departmentFilterSelect) departmentFilterSelect.addEventListener('change', applyFiltersAndSearch);
        console.log("已為各篩選器綁定 input/change 事件以自動觸發搜尋。");
    }

    if(clearFiltersButton) {
        clearFiltersButton.addEventListener('click', () => {
            console.log("清除篩選按鈕被點擊。");
            if(keywordSearchInput) keywordSearchInput.value = '';
            if(systemFilterSelect) systemFilterSelect.value = '';
            if(statusFilterSelect) statusFilterSelect.value = "active"; // 清除後預設回 active
            if(departmentFilterSelect) departmentFilterSelect.value = '';
            applyFiltersAndSearch(); // 清除篩選後，重新執行一次篩選和渲染
        });
    }
}

// --- Add Table Button Listeners (使用事件委派) ---
function addTableButtonListeners() {
    if (!tableBody) {
        console.warn("addTableButtonListeners: tableBody is not defined.");
        return;
    }
    // 將事件監聽器綁定在 tableBody 上，只需執行一次 (例如在 DOMContentLoaded 後)
    // 這裡的邏輯假設 tableBody 已經存在並且是穩定的 (不會被整個替換)
    // 如果 displayEmployees 會重建 tableBody，那麼這個監聽器需要重新綁定或綁在更上層的靜態元素

    // 為了確保每次 displayEmployees 重建 tbody 後事件能作用，
    // 我們還是保持在 displayEmployees 後呼叫 addTableButtonListeners，
    // 但這裡的綁定方式要小心，避免在同一個 tbody 實例上重複綁定。
    // 你之前的 cloneNode 方式是為了這個。如果不用 cloneNode，
    // 並且 displayEmployees 確實重建了 tbody，那麼直接在新的 tbody 上綁定是OK的。
    // 我們假設 displayEmployees 中的 tableBody 是最新的 DOM 引用。

    // 移除舊的監聽器（如果用 cloneNode 的話，這不是必要的，因為是新節點）
    // 但如果我們直接在 tableBody 上重複 addEventListener，最好先 remove。
    // 為了簡化，我們先不處理 remove，假設 cloneNode 會處理好。
    // 或者，最簡單的方式是事件委派，只綁定一次在 table 上。

    // 沿用你之前的 cloneNode 方式，但確保 tableBody 是最新的
    const currentTableBody = document.querySelector("#employeeTable tbody");
    if(!currentTableBody || !currentTableBody.parentNode) { // 增加 parentNode 檢查
        console.warn("addTableButtonListeners: cannot find currentTableBody or its parent.");
        return;
    }

    const newTableBody = currentTableBody.cloneNode(true);
    currentTableBody.parentNode.replaceChild(newTableBody, currentTableBody);
    // 更新全域 tableBody 的引用，確保其他地方使用的是新的 tbody
    tableBody = newTableBody;


    tableBody.addEventListener('click', function(event) {
        const target = event.target;
        const clickedRow = target.closest('tr');

        const updateButton = target.closest('.update-button');
        if (updateButton) {
            event.stopPropagation();
            const employeeId = updateButton.getAttribute('data-id');
            window.location.href = `../HTML/editUser.html?id=${employeeId}`;
            return;
        }

        const deleteButton = target.closest('.delete-button');
        if (deleteButton) {
            event.stopPropagation();
            const employeeId = deleteButton.getAttribute('data-id');
            const employee = displayedEmployees.find(emp => emp.ID.toString() === employeeId);
            let confirmMessage = `是否刪除該員 (${employeeId})?`;
            if (employee) {
                confirmMessage = `是否刪除 ${employee.Emp_LName || ''} ${employee.Emp_FName || ''} (${employee.Emp_ID || employeeId})?`;
            }
            if (confirm(confirmMessage)) {
                alert(`員工 ${employeeId} 已確認刪除！(實際刪除功能尚未實作)`);
                // 實際刪除邏輯
            }
            return;
        }

        if (window.innerWidth <= 768 && clickedRow && clickedRow.classList.contains('mobile-clickable-row')) {
            const employeeId = clickedRow.getAttribute('data-id');
            if (employeeId) {
                window.location.href = `../HTML/viewUser.html?id=${employeeId}`;
            }
        }
    });
}
function renderPagination() {
    if (!paginationControls) return;
    paginationControls.innerHTML = '';
    const totalPages = Math.ceil(displayedEmployees.length / itemsPerPage);

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
    paginationControls.appendChild(createButton('第一頁', 1, currentPage === 1));
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
        paginationControls.appendChild(createButton('1', 1));
        if (startPage > 2) {
            paginationControls.appendChild(createButton('...', 0, true, false, true));
        }
    }
    for (let i = startPage; i <= endPage; i++) {
        if (i > 0 && i <= totalPages) {
            paginationControls.appendChild(createButton(i, i, false, i === currentPage));
        }
    }
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationContainer.appendChild(createButton('...', 0, true, false, true));
        }
        paginationControls.appendChild(createButton(totalPages, totalPages));
    }
    paginationControls.appendChild(createButton('最後一頁', totalPages, currentPage === totalPages));
}

function goToPage(pageNumber) {
    const totalPages = Math.ceil(displayedEmployees.length / itemsPerPage);
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage) return;
    currentPage = pageNumber;
    updateTableForPage();
}

function updateTableForPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = displayedEmployees.slice(startIndex, endIndex);
    displayEmployees(paginatedData);
    renderPagination();
}

function loadNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (!navbarPlaceholder) return;
    fetch('../HTML/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarPlaceholder.innerHTML = data;
            const queryLink = navbarPlaceholder.querySelector('#nav-query');
            if(queryLink) {
                const activeLinks = navbarPlaceholder.querySelectorAll('#nav-menu a.active');
                activeLinks.forEach(link => link.classList.remove('active'));
                queryLink.classList.add('active');
            }
        })
        .catch(error => console.error('載入 Navbar 時發生錯誤:', error));
}

// --- Load All Data (資料載入) ---
async function loadAllData() {
    tableBody = document.querySelector("#employeeTable tbody"); // 初始化 tableBody
    paginationControls = document.getElementById('paginationControls'); // 初始化 paginationControls

    if (tableBody) {
        tableBody.innerHTML = `<tr><td colspan="9" style="text-align: center;">資料載入中，請稍候...</td></tr>`;
    }
    if (paginationControls) {
        paginationControls.innerHTML = '';
    }

    try {
        const [employeesRes, employeeSystemsRes, systemsRes] = await Promise.all([
            fetch('../json/employees.json'),
            fetch('../json/employeeSystems.json'),
            fetch('../json/systems.json')
        ]);

        if (!employeesRes.ok) throw new Error(`無法載入 employees.json: ${employeesRes.statusText}`);
        if (!employeeSystemsRes.ok) throw new Error(`無法載入 employeeSystems.json: ${employeeSystemsRes.statusText}`);
        if (!systemsRes.ok) throw new Error(`無法載入 systems.json: ${systemsRes.statusText}`);

        allEmployeesData = await employeesRes.json();
        allEmployeeSystemsData = await employeeSystemsRes.json();
        allSystemsData = await systemsRes.json();

        console.log("employees.json 已載入:", allEmployeesData.length, "筆");
        console.log("employeeSystems.json 已載入:", allEmployeeSystemsData.length, "筆");
        console.log("systems.json 已載入:", allSystemsData.length, "筆");

        populateSystemFilter();    // 動態填充系統下拉選單
        populateDepartmentFilter(); // 動態填充部門下拉選單
        addFilterListeners();      // 為篩選器加上事件監聽

        processAndDisplayEmployees(); // 初始處理和顯示 (預設只顯示 active)

    } catch (error) {
        console.error('載入所有資料時發生錯誤:', error);
        if (tableBody) {
            tableBody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: red;">載入資料失敗！</td></tr>`;
        }
    }
}

// --- Process and Display (初始資料處理，現在由 applyFiltersAndSearch 處理主要邏輯) ---
function processAndDisplayEmployees() {
    // 初始載入時，我們希望預設顯示 IsDelete = 0 的員工，
    // 並且讓 applyFiltersAndSearch 根據預設的篩選器值 (通常是 "active" for status) 來處理
    // 如果 statusFilterSelect 的預設值是 "active"，那麼 applyFiltersAndSearch 就會自動做這個過濾
    // 如果預設是 "所有狀態"，則這裡需要手動過濾一次，或者讓 applyFiltersAndSearch 處理
    // 為了簡潔，讓 applyFiltersAndSearch 根據篩選器的初始值來決定顯示內容。
    // statusFilterSelect.value = "active"; // 可以設定預設篩選條件
    applyFiltersAndSearch(); // 初始根據篩選器值來顯示
}

// --- Resize Listener (保持不變) ---
window.addEventListener('resize', function() {
    if (displayedEmployees.length > 0 || allEmployeesData.length > 0) { // 即使 filtered 為空，也應重新計算 isMobileView
        updateTableForPage();
    }
});

// --- DOMContentLoaded (初始化) ---
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded - 初始化開始");
    keywordSearchInput = document.getElementById('keywordSearchInput');
    systemFilterSelect = document.getElementById('systemFilterSelect');
    statusFilterSelect = document.getElementById('statusFilterSelect');
    departmentFilterSelect = document.getElementById('departmentFilterSelect');
    clearFiltersButton = document.getElementById('clearFiltersButton');
    applySearchButton = document.getElementById('applySearchButton');
    tableBody = document.querySelector("#employeeTable tbody"); // <--- 重要：初始化全域 tableBody
    paginationControls = document.getElementById('paginationControls');  // <--- 重要：初始化全域 paginationControls

    console.log("DOM 元素獲取完畢");

    if (statusFilterSelect) {
        statusFilterSelect.value = "active"; // 設定狀態篩選器的預設值
        console.log("狀態篩選器預設值設定為 'active'");
    }

    loadNavbar();
    loadAllData(); // loadAllData 內部會填充下拉選單並綁定篩選器事件，最後呼叫 applyFiltersAndSearch
    console.log("DOMContentLoaded - 初始化結束");
});