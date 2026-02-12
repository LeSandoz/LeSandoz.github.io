# fetch.ps1
param([string]$url)

# 強制使用 TLS 1.2 (許多防火牆只吃這個)
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# 偽裝成 Chrome 瀏覽器
$userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

try {
    # 執行請求，設定 15 秒超時
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -UserAgent $userAgent -TimeoutSec 15
    
    # 成功：輸出網頁內容
    Write-Output $response.Content
} catch {
    # 失敗：輸出錯誤訊息 (不要輸出整串錯誤物件)
    Write-Host "ERROR: $($_.Exception.Message)"
    exit 1
}