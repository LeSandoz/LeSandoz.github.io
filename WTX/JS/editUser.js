// editUser.js

document.addEventListener("DOMContentLoaded", function() {
    // 載入 Navbar (如果 navbar.js 沒有自動載入的話)
    // 注意：如果 navbar.js 已經在 editUser.html 載入了，這裡就不需要再 fetch
    // 但為了確保，我們還是檢查一下。不過，我們在 HTML 已經載入了 navbar.js
    // navbar.js 應該會自己處理載入 navbar.html 的事。

    // 1. 取得 URL 中的員工 ID
    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get('id');

    if (!employeeId) {
        alert("找不到員工 ID，無法載入資料！");
        window.location.href = 'userList.html'; // 如果沒 ID 就跳回去
        return;
    }

    // 2. 取得表單元素
    const form = document.getElementById('editAccountForm');
    const idInput = document.getElementById('employeeId');
    const lastNameInput = document.getElementById('lastName');
    const firstNameInput = document.getElementById('firstName');
    const departmentInput = document.getElementById('department');
    const serviceMeCheckbox = document.getElementById('systemServiceMe');
    const myServiceCheckbox = document.getElementById('systemMyService');
    const lmsCheckbox = document.getElementById('systemLMS');
    const sapCheckbox = document.getElementById('systemSAP');
    const updateButton = document.getElementById('updateButton');

    // 3. 載入 allUser.json 並填入資料
    fetch('../json/allUser.json')
        .then(response => {
            if (!response.ok) throw new Error("無法載入 allUser.json");
            return response.json();
        })
        .then(allUsers => {
            const employee = allUsers.find(emp => emp.id === employeeId);

            if (!employee) {
                alert(`找不到 ID 為 ${employeeId} 的員工資料！`);
                window.location.href = 'userList.html';
                return;
            }

            // 填入表單
            idInput.value = employee.id;
            lastNameInput.value = employee.lastName || '';
            firstNameInput.value = employee.firstName || '';
            departmentInput.value = employee.department || '';

            // 勾選系統權限
            serviceMeCheckbox.checked = employee.ServiceMe || false;
            myServiceCheckbox.checked = employee.myService || false;
            lmsCheckbox.checked = employee.LMS || false;
            sapCheckbox.checked = employee.SAP || false;
        })
        .catch(error => {
            console.error('載入或尋找員工資料時發生錯誤:', error);
            alert('載入員工資料失敗！');
        });

    // 4. 處理更新按鈕點擊事件
    updateButton.addEventListener('click', function() {
        // 獲取目前表單上的所有值
        const updatedData = {
            id: idInput.value,
            lastName: lastNameInput.value,
            firstName: firstNameInput.value,
            department: departmentInput.value,
            ServiceMe: serviceMeCheckbox.checked,
            myService: myServiceCheckbox.checked,
            LMS: lmsCheckbox.checked,
            SAP: sapCheckbox.checked,
            // 記得加上更新時間和使用者
            Update_Datetime: new Date().toLocaleString(),
            Update_User: "CurrentUser" // 這裡應該換成實際的登入使用者 ID
        };

        // 簡單驗證
        if (!updatedData.lastName || !updatedData.firstName || !updatedData.department) {
            alert('請填寫所有必填欄位！');
            return;
        }

        console.log("準備更新的帳號資料：", updatedData);
        alert(`員工 ${updatedData.lastName} ${updatedData.firstName} 的資料已準備更新 (請查看 Console)。\n(實際更新功能尚未實作)`);

        // ** 這裡可以加上實際呼叫後端 API 更新資料的程式碼 **
        // fetch(`/api/users/${updatedData.id}`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(updatedData)
        // })
        // .then(response => response.json())
        // .then(result => {
        //     alert('更新成功！');
        //     window.location.href = 'userList.html'; // 更新成功後跳回列表
        // })
        // .catch(err => alert('更新失敗！'));
    });
});