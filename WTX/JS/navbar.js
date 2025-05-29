document.addEventListener("DOMContentLoaded", function() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');

    if (!navbarPlaceholder) {
        console.error("錯誤：在主 HTML 檔案中找不到 ID 為 'navbar-placeholder' 的元素。Navbar 無法載入。");
        return;
    }

    const navbarHtmlPath = '../HTML/navbar.html';

    fetch(navbarHtmlPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`無法載入 navbar.html，狀態碼：${response.status}。請檢查路徑 '${navbarHtmlPath}' 是否正確。`);
            }
            return response.text();
        })
        .then(data => {
            navbarPlaceholder.innerHTML = data;
            console.log("navbar.html 已載入到 placeholder。");

            // --- (hover 效果主要由 CSS 控制，以下點擊邏輯可選) ---
            // 如果你仍然希望在觸控裝置上保留點擊功能，可以保留這段，
            // 並在 CSS 中也保留 .active 的樣式。
            // 但如果純粹改為 hover，這段就可以移除或註解。
            /*
            const menuToggle = navbarPlaceholder.querySelector('.menu-toggle');
            const navMenu = navbarPlaceholder.querySelector('#nav-menu');

            if (menuToggle && navMenu) {
                menuToggle.addEventListener('click', function() {
                    console.log("漢堡按鈕被點擊了！(若為 hover 則此 log 不應輕易出現)");
                    navMenu.classList.toggle('active');
                    const isExpanded = navMenu.classList.contains('active');
                    menuToggle.setAttribute('aria-expanded', isExpanded);
                });
            } else {
                // ...錯誤處理...
            }
            */

            // --- 設定目前頁面對應的選單項目為 active ---
            try {
                const navMenu = navbarPlaceholder.querySelector('#nav-menu'); // 確保 navMenu 被選取
                const currentPageFileName = window.location.pathname.split("/").pop();
                if (navMenu && currentPageFileName) {
                    const navLinks = navMenu.querySelectorAll('a');
                    navLinks.forEach(link => {
                        const linkHref = link.getAttribute('href');
                        if (linkHref) {
                            const linkFileName = linkHref.split("/").pop();
                            if (linkFileName === currentPageFileName) {
                                link.classList.add('active');
                            } else {
                                link.classList.remove('active');
                            }
                        }
                    });
                }
            } catch (e) {
                console.error("設定 active 導覽連結時發生錯誤:", e);
            }
        })
        .catch(error => {
            console.error('載入 Navbar 或執行其 JavaScript 時發生嚴重錯誤:', error);
            if (navbarPlaceholder) {
                navbarPlaceholder.innerHTML = '<p style="color:red; text-align:center;">導覽列載入失敗！請檢查 Console 錯誤訊息。</p>';
            }
        });
});