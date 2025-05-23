// ** 新增：在 DOM 載入完成後，載入 Navbar **
document.addEventListener("DOMContentLoaded", function() {
    fetch('navbar.html') // 去抓 navbar.html 檔案
        .then(response => {
            if (!response.ok) { // 如果抓不到 (例如檔名打錯)
                throw new Error("無法載入 navbar.html");
            }
            return response.text(); // 把檔案內容轉成文字
        })
        .then(data => {
            // 把抓回來的 HTML 文字塞進佔位區
            document.getElementById('navbar-placeholder').innerHTML = data;

            // ** (進階) 可以在這裡加上判斷目前頁面並設定 active class 的程式碼 **
            // 例如：
            // const currentPage = window.location.pathname.split("/").pop();
            // if (currentPage === 'index.html' || currentPage === '') {
            //     document.getElementById('nav-add')?.classList.add('active');
            // } else if (currentPage === 'query.html') {
            //     document.getElementById('nav-query')?.classList.add('active');
            // }
            // ... 等等
        })
        .catch(error => {
            console.error('載入 Navbar 時發生錯誤:', error);
            document.getElementById('navbar-placeholder').innerHTML = '<p style="color:red; text-align:center;">導覽列載入失敗！</p>';
        });
});