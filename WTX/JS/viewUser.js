// viewUser.js

document.addEventListener("DOMContentLoaded", function() {
    // 載入 Navbar 的邏輯，確保 navbar.js 會處理
    // 如果 navbar.js 沒有自動處理，你可能需要 fetch navbar.html
    // 但我們假設 navbar.js 已經處理了

    const urlParams = new URLSearchParams(window.location.search);
    const employeeIdParam = urlParams.get('id'); // 從 URL 取得員工 ID (來自 employees.json 的 ID)

    if (!employeeIdParam) {
        alert("找不到員工 ID，無法載入資料！");
        // window.location.href = 'userList.html'; // 如果沒 ID 就跳回去
        document.getElementById('employeeDetailsForm').innerHTML = '<p style="color:red;">錯誤：未提供員工ID。</p>';
        return;
    }

    // 獲取顯示資料的元素
    const employeeIdDisplay = document.getElementById('employeeId');
    const preEmployeeIdDisplay = document.getElementById('preEmployeeId');
    const lastNameDisplay = document.getElementById('lastName');
    const firstNameDisplay = document.getElementById('firstName');
    const departmentDisplay = document.getElementById('department');
    const systemsPermissionsDisplay = document.getElementById('systemsPermissions');
    const createDatetimeDisplay = document.getElementById('createDatetime');
    const createUserDisplay = document.getElementById('createUser');
    const updateDatetimeDisplay = document.getElementById('updateDatetime');
    const updateUserDisplay = document.getElementById('updateUser');


    async function loadAndDisplayUserData() {
        try {
            const [employeesRes, employeeSystemsRes, systemsRes] = await Promise.all([
                fetch('../json/employees.json'),
                fetch('../json/employeeSystems.json'),
                fetch('../json/systems.json')
            ]);

            if (!employeesRes.ok) throw new Error(`無法載入 employees.json: ${employeesRes.statusText}`);
            if (!employeeSystemsRes.ok) throw new Error(`無法載入 employeeSystems.json: ${employeeSystemsRes.statusText}`);
            if (!systemsRes.ok) throw new Error(`無法載入 systems.json: ${systemsRes.statusText}`);

            const allEmployees = await employeesRes.json();
            const allEmployeeSystems = await employeeSystemsRes.json();
            const allSystems = await systemsRes.json();

            // 根據 employeeIdParam (字串) 找到員工，注意 employees.json 中 ID 是數字
            const employee = allEmployees.find(emp => emp.ID.toString() === employeeIdParam);

            if (!employee) {
                alert(`找不到 ID 為 ${employeeIdParam} 的員工資料！`);
                document.getElementById('employeeDetailsForm').innerHTML = `<p style="color:red;">找不到 ID 為 ${employeeIdParam} 的員工資料！</p>`;
                return;
            }

            // 填入基本資料
            employeeIdDisplay.textContent = employee.Emp_ID || 'N/A';
            preEmployeeIdDisplay.textContent = employee.Pre_Emp_FK || '無';
            lastNameDisplay.textContent = employee.Emp_LName || 'N/A';
            firstNameDisplay.textContent = employee.Emp_FName || 'N/A';
            departmentDisplay.textContent = employee.Emp_Dep_Code || 'N/A';
            createDatetimeDisplay.textContent = employee.Create_Datetime || 'N/A';
            // 若 Create_Emp_FK 是 ID，需要轉換為員工姓名 (可選的增強功能)
            const creator = allEmployees.find(e => e.ID === employee.Create_Emp_FK);
            createUserDisplay.textContent = creator ? `${creator.Emp_LName} ${creator.Emp_FName} (${creator.Emp_ID})` : (employee.Create_Emp_FK || 'N/A');

            updateDatetimeDisplay.textContent = employee.Update_Datetime || 'N/A';
            const updater = allEmployees.find(e => e.ID === employee.Update_Emp_FK);
            updateUserDisplay.textContent = updater ? `${updater.Emp_LName} ${updater.Emp_FName} (${updater.Emp_ID})` : (employee.Update_Emp_FK || 'N/A');


            // 填入系統權限
            systemsPermissionsDisplay.innerHTML = ''; // 清空預設的 "載入中..."
            let hasAnyPermission = false;

            allSystems.forEach(system => {
                const hasAccess = allEmployeeSystems.some(record =>
                    record.Employee_FK === employee.ID && // 注意這裡用 employee.ID (數字)
                    record.System_FK === system.System_ID &&
                    record.Is_Active === 1
                );
                hasAnyPermission = hasAnyPermission || hasAccess;

                const div = document.createElement('div');
                const iconSpan = document.createElement('span');
                iconSpan.textContent = hasAccess ? '✔️' : '❌';
                iconSpan.style.marginRight = '5px';

                const nameSpan = document.createElement('span');
                nameSpan.className = 'system-name';
                nameSpan.textContent = system.System_Name || system.System_Code;

                div.appendChild(iconSpan);
                div.appendChild(nameSpan);
                systemsPermissionsDisplay.appendChild(div);
            });

            if (!hasAnyPermission && allSystems.length > 0) {
                 systemsPermissionsDisplay.innerHTML = '<div class="no-systems">此員工目前無有效的系統權限。</div>';
            } else if (allSystems.length === 0) {
                systemsPermissionsDisplay.innerHTML = '<div class="no-systems">系統清單未載入或為空。</div>';
            }


        } catch (error) {
            console.error('載入或顯示員工詳細資料時發生錯誤:', error);
            document.getElementById('employeeDetailsForm').innerHTML = `<p style="color:red;">載入詳細資料失敗！ ${error.message}</p>`;
        }
    }

    loadAndDisplayUserData();
});