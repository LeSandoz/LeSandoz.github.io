// editUser.js

document.addEventListener("DOMContentLoaded", function() {
    // 載入 Navbar (假設 navbar.js 會自行處理 active link)
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        fetch('../HTML/navbar.html')
            .then(response => {
                if (!response.ok) throw new Error("無法載入 navbar.html");
                return response.text();
            })
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                // Navbar JS logic (menu toggle) should be in navbar.js
            })
            .catch(error => console.error('載入 Navbar 時發生錯誤:', error));
    } else {
        console.error("Navbar placeholder not found!");
    }


    // 1. 取得 URL 中的員工 ID
    const urlParams = new URLSearchParams(window.location.search);
    const employeeIdParam = urlParams.get('id'); // 這是從 employees.json 來的 ID (數字)

    if (!employeeIdParam) {
        alert("找不到員工 ID 參數，無法載入資料！");
        document.body.innerHTML = '<div class="container"><h1>錯誤</h1><p>未提供員工ID，無法載入編輯頁面。</p><a href="userList.html">返回列表</a></div>';
        // window.location.href = 'userList.html'; // 如果沒 ID 就跳回去
        return;
    }

    // 2. 取得表單元素
    const form = document.getElementById('editAccountForm');
    const employeeIdInput = document.getElementById('employeeId'); // 這個顯示的是 Emp_ID
    const lastNameInput = document.getElementById('lastName');
    const firstNameInput = document.getElementById('firstName');
    const departmentInput = document.getElementById('department');
    const systemCheckboxes = { // 將 checkbox 元素存起來方便操作
        ServiceMe: document.getElementById('systemServiceMe'),
        myService: document.getElementById('systemMyService'),
        LMS: document.getElementById('systemLMS'),
        SAP: document.getElementById('systemSAP')
    };
    const updateButton = document.getElementById('updateButton');

    let currentEmployeeData = null; // 用來儲存當前編輯的員工原始資料
    let allEmployeesData = []; // 儲存所有員工資料，給更新人和建立人參考
    let allEmployeeSystemsData = [];
    let allSystemsData = [];


    // 3. 載入所有必要的 JSON 資料並填入表單
    async function loadAndPopulateForm() {
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

            // 根據 employeeIdParam (來自URL, 是字串) 找到員工
            // employees.json 中的 ID 是數字
            currentEmployeeData = allEmployeesData.find(emp => emp.ID.toString() === employeeIdParam);

            if (!currentEmployeeData) {
                alert(`找不到 ID 為 ${employeeIdParam} 的員工資料！`);
                // window.location.href = 'userList.html';
                if(form) form.innerHTML = `<p style="color:red;">找不到 ID 為 ${employeeIdParam} 的員工資料！</p><a href="userList.html">返回列表</a>`;
                return;
            }

            // 填入表單基本資料
            if(employeeIdInput) employeeIdInput.value = currentEmployeeData.Emp_ID; // 顯示 Emp_ID，但操作基於 ID
            if(lastNameInput) lastNameInput.value = currentEmployeeData.Emp_LName || '';
            if(firstNameInput) firstNameInput.value = currentEmployeeData.Emp_FName || '';
            if(departmentInput) departmentInput.value = currentEmployeeData.Emp_Dep_Code || '';

            // 填入系統權限
            allSystemsData.forEach(system => {
                const hasAccess = allEmployeeSystemsData.some(record =>
                    record.Employee_FK === currentEmployeeData.ID && // 使用 currentEmployeeData.ID (數字)
                    record.System_FK === system.System_ID &&
                    record.Is_Active === 1
                );
                // 根據 System_Code 找到對應的 checkbox
                const checkbox = systemCheckboxes[system.System_Code]; // 假設 checkbox 的 ID/value 與 System_Code 相關
                                                                    // 或者你需要一個更明確的 mapping
                if (checkbox) {
                    checkbox.checked = hasAccess;
                } else {
                    // 如果 checkbox 的 value 是 System_Name，需要調整
                    // 例如，systemServiceMe 的 value 是 "ServiceMe"，對應到 System_Code "SME"
                    // 你需要一個從 System_Code 到 checkbox ID 的映射
                    // 為了簡單，我們假設 checkbox 的 value 就是 System_Code
                    // 你的 HTML 中 checkbox 的 value 是 "ServiceMe", "myService" 等，
                    // 需要確保這和 systems.json 中的 System_Name 或 System_Code 一致
                    // 目前 systems.json 的 System_Code 是 "SME", "mySvs"
                    // 而 HTML checkbox value 是 "ServiceMe", "myService"
                    // 這裡需要一個轉換，或者統一 value
                    // 暫時假設 checkbox 的 value 和 System_Name 相同
                    const matchingCheckbox = document.querySelector(`input[name="systems"][value="${system.System_Name}"]`);
                    if (matchingCheckbox) {
                        matchingCheckbox.checked = hasAccess;
                    } else {
                         // 再嘗試用 System_Code
                         const matchingCheckboxByCode = document.querySelector(`input[name="systems"][value="${system.System_Code}"]`);
                         if(matchingCheckboxByCode) matchingCheckboxByCode.checked = hasAccess;
                    }
                }
            });

        } catch (error) {
            console.error('載入或填寫員工資料時發生錯誤:', error);
            alert('載入員工資料失敗！ ' + error.message);
            if(form) form.innerHTML = `<p style="color:red;">載入員工資料失敗！</p><a href="userList.html">返回列表</a>`;
        }
    }

    if (form && updateButton) { // 確保表單和按鈕存在才執行後續
        loadAndPopulateForm(); // 載入並填寫資料

        // 4. 處理更新按鈕點擊事件
        updateButton.addEventListener('click', function() {
            if (!currentEmployeeData) {
                alert("無法更新，員工原始資料未載入。");
                return;
            }

            const selectedSystemsCodes = [];
            document.querySelectorAll('input[name="systems"]:checked').forEach(checkbox => {
                // 將 checkbox 的 value (假設是 System_Name 或 System_Code) 轉換回 System_ID
                // 或者，後端 API 可能接受 System_Code
                // 這裡我們先收集 value (假設是 System_Code 或 System_Name)
                selectedSystemsCodes.push(checkbox.value);
            });

            // 獲取目前表單上的所有值
            const updatedEmployeeData = {
                ID: currentEmployeeData.ID, // 這是數字 ID，用於後端查找
                Emp_ID: employeeIdInput.value, // Emp_ID 通常不可修改，但這裡顯示的是 Emp_ID
                Emp_LName: lastNameInput.value,
                Emp_FName: firstNameInput.value,
                Emp_Dep_Code: departmentInput.value,
                // Pre_Emp_FK 通常不在這裡修改
                // isDelete 通常也不在這裡修改
            };

            // 簡單驗證
            if (!updatedEmployeeData.Emp_LName || !updatedEmployeeData.Emp_FName || !updatedEmployeeData.Emp_Dep_Code) {
                alert('請填寫所有必填的員工基本資料！');
                return;
            }

            const updatedPermissions = {
                employeeId: currentEmployeeData.ID,
                // 我們需要將 selectedSystemsCodes 轉換成後端能理解的格式
                // 例如，一個包含所有該員工有效權限的 System_ID 列表
                // 或者，更常見的是，API 會接收一個 "要新增的權限列表" 和 "要移除的權限列表"
                // 這裡簡化為只傳送當前勾選的系統代碼/名稱
                activeSystemCodes: selectedSystemsCodes
            };


            console.log("準備更新的員工基本資料：", updatedEmployeeData);
            console.log("準備更新的員工系統權限 (基於勾選)：", updatedPermissions);
            alert(`員工 ${updatedEmployeeData.Emp_LName} ${updatedEmployeeData.Emp_FName} 的資料已準備更新 (請查看 Console)。\n(實際更新功能尚未實作)`);

            // ** 實際的更新邏輯會是：**
            // 1. 發送請求到後端 API 更新 Employees 表的資料 (updatedEmployeeData)
            // 2. 發送請求到後端 API 更新 EmployeeSystems 表的資料 (updatedPermissions)
            //    這通常比較複雜，可能需要比較前後差異，執行 INSERT 和 UPDATE (Is_Active=0)
            //    或者後端提供一個 "設定用戶權限" 的 API，直接傳入該用戶應有的權限列表。

            // 範例：
            // Promise.all([
            //     fetch(`/api/employees/${updatedEmployeeData.ID}`, { method: 'PUT', body: JSON.stringify(updatedEmployeeData), headers: {'Content-Type': 'application/json'} }),
            //     fetch(`/api/employees/${updatedEmployeeData.ID}/permissions`, { method: 'PUT', body: JSON.stringify(updatedPermissions.activeSystemCodes), headers: {'Content-Type': 'application/json'} })
            // ])
            // .then(async ([resEmp, resPerm]) => {
            //     if (!resEmp.ok || !resPerm.ok) {
            //         const empError = await resEmp.text();
            //         const permError = await resPerm.text();
            //         throw new Error(`更新員工資料失敗: ${empError} \n更新權限失敗: ${permError}`);
            //     }
            //     alert('更新成功！');
            //     window.location.href = 'userList.html'; // 更新成功後跳回列表
            // })
            // .catch(err => {
            //      console.error("更新失敗:", err);
            //      alert('更新失敗！\n' + err.message);
            // });
        });
    } else {
        if (!form) console.error("找不到 ID 為 'editAccountForm' 的表單元素。");
        if (!updateButton) console.error("找不到 ID 為 'updateButton' 的更新按鈕。");
    }
});