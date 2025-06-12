// upload.js

document.addEventListener("DOMContentLoaded", function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const submitUploadButton = document.getElementById('submitUploadButton');

    if (uploadArea && fileInput && fileNameDisplay && submitUploadButton) {
        
        // 點擊區域時，觸發隱藏的檔案選擇框
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        // 處理拖曳檔案進入的事件
        uploadArea.addEventListener('dragover', (event) => {
            event.preventDefault(); // 阻止瀏覽器預設行為 (例如打開檔案)
            uploadArea.style.backgroundColor = '#e9ecef';
        });

        // 處理拖曳檔案離開的事件
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.backgroundColor = '#f8f9fa';
        });

        // 處理放下檔案的事件
        uploadArea.addEventListener('drop', (event) => {
            event.preventDefault();
            uploadArea.style.backgroundColor = '#f8f9fa';
            
            const files = event.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files; // 將拖曳的檔案賦給 input
                updateFileInfo(); // 更新顯示
            }
        });

        // 當使用者透過檔案選擇框選擇了檔案
        fileInput.addEventListener('change', updateFileInfo);

        function updateFileInfo() {
            if (fileInput.files.length > 0) {
                const fileName = fileInput.files[0].name;
                fileNameDisplay.textContent = `已選擇檔案：${fileName}`;
                submitUploadButton.style.display = 'block'; // 顯示上傳按鈕
            } else {
                fileNameDisplay.textContent = '';
                submitUploadButton.style.display = 'none'; // 隱藏上傳按鈕
            }
        }

        // 處理假的 "上傳" 按鈕點擊事件
        submitUploadButton.addEventListener('click', () => {
            if (fileInput.files.length > 0) {
                const fileName = fileInput.files[0].name;
                
                // 模擬上傳中...
                submitUploadButton.textContent = '上傳中...';
                submitUploadButton.disabled = true;

                // 假裝上傳需要一點時間 (例如 1.5 秒)
                setTimeout(() => {
                    // 顯示成功訊息
                    alert(`檔案 "${fileName}" 上傳成功！\n(這是一個假的上傳功能)`);

                    // 重置介面
                    submitUploadButton.textContent = '上傳檔案';
                    submitUploadButton.disabled = false;
                    submitUploadButton.style.display = 'none';
                    fileNameDisplay.textContent = '';
                    fileInput.value = ''; // 清除已選擇的檔案
                }, 1500);
            } else {
                alert('請先選擇一個檔案！');
            }
        });

    } else {
        console.error("上傳頁面的必要元素未找到！");
    }
});