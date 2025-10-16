param()

Write-Host "[MCP] Cloudflare 연결 검증" -ForegroundColor Cyan

$token = $env:CLOUDFLARE_API_TOKEN
if (-not $token) { Write-Error "CLOUDFLARE_API_TOKEN 없음"; exit 1 }

function Try-Call($attempt) {
	try {
		$response = Invoke-WebRequest -Uri "https://api.cloudflare.com/client/v4/user" -Headers @{ Authorization = "Bearer $token" } -TimeoutSec 10 -ErrorAction Stop
		return $true
	} catch {
		Write-Warning "시도 #$attempt 실패: $($_.Exception.Message)"
		return $false
	}
}

$max=3
for ($i=1; $i -le $max; $i++) {
	if (Try-Call $i) { Write-Host "Cloudflare 토큰 유효" -ForegroundColor Green; exit 0 }
	Start-Sleep -Seconds 1
}

Write-Error "Cloudflare 연결 검증 실패"
exit 2



