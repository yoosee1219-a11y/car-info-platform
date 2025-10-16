param()

Write-Host "[MCP] Supabase 연결 검증" -ForegroundColor Cyan

$url = $env:SUPABASE_URL
$key = $env:SUPABASE_ANON_KEY

if (-not $url -or -not $key) {
	Write-Error "SUPABASE_URL 또는 SUPABASE_ANON_KEY가 없습니다. 먼저 scripts/set-mcp-env.ps1 실행."
	exit 1
}

$health = "$url/rest/v1/"

function Try-Call($attempt) {
	try {
		$response = Invoke-WebRequest -Uri $health -Headers @{ apikey = $key } -Method Head -TimeoutSec 10 -ErrorAction Stop
		return $true
	} catch {
		Write-Warning "시도 #$attempt 실패: $($_.Exception.Message)"
		return $false
	}
}

$max = 3
for ($i=1; $i -le $max; $i++) {
	if (Try-Call $i) { Write-Host "Supabase 헤드 체크 성공" -ForegroundColor Green; exit 0 }
	Start-Sleep -Seconds 1
}

Write-Error "Supabase 연결 검증 실패"
exit 2


