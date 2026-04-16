$ErrorActionPreference = 'Stop'
try {
    Write-Host "Habilitando TCP/IP no SQL Server Express..."
    
    $tcpPath = "HKLM:\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL17.SQLEXPRESS\MSSQLServer\SuperSocketNetLib\Tcp"
    
    # 1. Habilita o protocolo TCP/IP
    Set-ItemProperty -Path $tcpPath -Name Enabled -Value 1
    
    # 2. Configura a porta fixa para 1433 e remove portas dinamicas (IPAll)
    Set-ItemProperty -Path "$tcpPath\IPAll" -Name TcpPort -Value "1433"
    Set-ItemProperty -Path "$tcpPath\IPAll" -Name TcpDynamicPorts -Value ""
    
    Write-Host "Reiniciando o serviço do SQL Server para aplicar as mudancas..."
    Restart-Service -Name 'MSSQL$SQLEXPRESS' -Force
    
    Write-Host "Sucesso! Pode fechar esta janela."
    Start-Sleep -Seconds 5
}
catch {
    Write-Host "Ocorreu um erro: $_"
    Start-Sleep -Seconds 10
}
