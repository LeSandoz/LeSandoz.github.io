

// ** 原本的按鈕事件監聽器 **
// 注意：我們需要確保 Navbar 載入後再綁定事件，
// 或者用事件委派。但因為按鈕不在 Navbar 裡，所以這裡暫時不受影響。
// 為了安全起見，最好也把它放進 DOMContentLoaded 裡面，或確保 script 在 body 尾部。
document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitButton');
    
    // 檢查按鈕是否存在，避免在沒有按鈕的頁面出錯
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            // 獲取各個欄位的值
            const employeeId = document.getElementById('employeeId').value;
            const lastName = document.getElementById('lastName').value;
            const firstName = document.getElementById('firstName').value;
            const department = document.getElementById('department').value;

            // 獲取所有被勾選的系統
            const selectedSystems = [];
            const systemCheckboxes = document.querySelectorAll('input[name="systems"]:checked');
            systemCheckboxes.forEach(function(checkbox) {
                selectedSystems.push(checkbox.value);
            });

            // 簡單的驗證 (可以再加強)
            if (!employeeId || !lastName || !firstName || !department) {
                alert('請填寫所有必填欄位！');
                return; // 阻止執行下去
            }

            // 將資料組合_成一個物件
            const accountData = {
                id: employeeId,
                lastName: lastName,
                firstName: firstName,
                department: department,
                systems: selectedSystems
            };

            // 在 Console 印出資料
            console.log("準備新增的帳號資料：", accountData);
            alert(`帳號資料已擷取 (請查看 Console)：\nID: ${accountData.id}\n姓名: ${accountData.lastName} ${accountData.firstName}\n部門: ${accountData.department}\n系統: ${accountData.systems.join(', ')}`);
        });
    }
});