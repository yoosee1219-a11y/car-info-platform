param()

Write-Host "[MCP] 환경 변수 등록을 시작합니다." -ForegroundColor Cyan

function Prompt-Secret($label) {
	Write-Host "$label: " -NoNewline -ForegroundColor Yellow
	$secure = Read-Host -AsSecureString
	return [Runtime.InteropServices.Marshal]::PtrToStringAuto(
		[Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
	)
}

$supabaseUrl = if ($env:SUPABASE_URL) { $env:SUPABASE_URL } else { Read-Host "SUPABASE_URL (예: https://xxxx.supabase.co)" }
$supabaseAnon = if ($env:SUPABASE_ANON_KEY) { $env:SUPABASE_ANON_KEY } else { Prompt-Secret "SUPABASE_ANON_KEY" }
$vercelToken = if ($env:VERCEL_TOKEN) { $env:VERCEL_TOKEN } else { Prompt-Secret "VERCEL_TOKEN" }
$cfToken = if ($env:CLOUDFLARE_API_TOKEN) { $env:CLOUDFLARE_API_TOKEN } else { Prompt-Secret "CLOUDFLARE_API_TOKEN(선택)" }
$cfAccountId = if ($env:CLOUDFLARE_ACCOUNT_ID) { $env:CLOUDFLARE_ACCOUNT_ID } else { Read-Host "CLOUDFLARE_ACCOUNT_ID(선택)" }

function Set-Env($name, $value) {
	if ([string]::IsNullOrWhiteSpace($value)) { return }
	[System.Environment]::SetEnvironmentVariable($name, $value, 'User')
	Write-Host "설정됨: $name" -ForegroundColor Green
}

Set-Env "SUPABASE_URL" $supabaseUrl
Set-Env "SUPABASE_ANON_KEY" $supabaseAnon
Set-Env "VERCEL_TOKEN" $vercelToken
Set-Env "CLOUDFLARE_API_TOKEN" $cfToken
Set-Env "CLOUDFLARE_ACCOUNT_ID" $cfAccountId

Write-Host "완료. 새 PowerShell 세션을 열어 환경 변수를 확인하세요." -ForegroundColor Cyan


