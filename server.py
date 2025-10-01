#!/usr/bin/env python3
"""
Servidor HTTP simples para servir o site TechBooks
Resolve problemas de CORS ao carregar arquivos JSON
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Configurações
PORT = 8000
HOST = 'localhost'

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Adiciona headers CORS para permitir carregamento de JSON
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    # Muda para o diretório do projeto
    project_dir = Path(__file__).parent
    os.chdir(project_dir)
    
    # Cria o servidor
    with socketserver.TCPServer((HOST, PORT), CORSHTTPRequestHandler) as httpd:
        print(f"🚀 Servidor TechBooks rodando em http://{HOST}:{PORT}")
        print(f"📁 Diretório: {project_dir}")
        print("💻 Abrindo navegador...")
        print("⏹️  Pressione Ctrl+C para parar o servidor")
        
        # Abre o navegador automaticamente
        webbrowser.open(f'http://{HOST}:{PORT}')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Servidor parado!")

if __name__ == "__main__":
    main()
