# 🔗 ConnectOne

**ConnectOne** é uma interface web que permite conectar, enviar e receber dados de dispositivos Bluetooth Low Energy (BLE), como o módulo **HM-10**, diretamente do navegador — sem necessidade de instalação de software nativo.

Desenvolvido para ser leve, responsivo e acessível via **computadores ou celulares**, o projeto visa facilitar a comunicação serial com dispositivos embarcados por meio do **Web Bluetooth API**.

---

## 🚀 Funcionalidades

- Conexão BLE via navegador com dispositivos compatíveis
- Envio de comandos em tempo real
- Recebimento de dados com log ao vivo
- Fragmentação de mensagens longas (20 bytes por pacote)
- Interface responsiva (mobile friendly)
- Compatível com módulos como **HM-10**, **ESP32 BLE**, **nRF52** e similares

---

## 📷 Prévia da Interface

![ConnectOne Screenshot](./screenshot.png)  
*Interface responsiva em HTML5 com console de comunicação BLE*

---

## 📦 Estrutura do Projeto

```plaintext
📁 ConnectOne/
├── index.html         # Página principal com interface e lógica JavaScript
    📁 script/
    ├── script.js
    📁 style/
    ├── style.css
└── README.md          # Este arquivo
```

## 🛠️ Como usar

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/ConnectOne.git
cd ConnectOne
```

Abra `index.html` no navegador Google Chrome, Edge, ou qualquer navegador com suporte ao Web Bluetooth.

Clique em "Conectar" para selecionar seu dispositivo BLE (como HM-10).

Envie comandos via o campo de entrada e veja a resposta ao vivo no console.

---

## ⚠️ Requisitos

Navegador compatível com Web Bluetooth API

✅ Chrome (desktop e Android)

⚠️ Safari e Firefox não são suportados nativamente

Certifique-se de que seu dispositivo BLE:

- Usa UUID FFE0 para serviço e FFE1 para característica
- Está com BLE ativado e visível
- Está pareado corretamente no sistema operacional, se necessário

---

## 🧠 Tecnologias Utilizadas

- JavaScript
- Web Bluetooth API
- HTML5 + CSS3

---

## 📌 Observações

- Módulos como HC-05/HC-06 (Bluetooth clássico) não são compatíveis com Web Bluetooth. Use HM-10, ESP32 BLE, ou nRF52.
- A fragmentação de mensagens respeita o limite de 20 bytes por pacote BLE.
- Para projetos mais avançados, considere adaptar para múltiplas características ou notificações complexas.

---

## 📄 Licença

Este projeto está licenciado sob a MIT License.

---

## 👨‍💻 Autor

Desenvolvido por [Seu Nome ou Nome da Empresa]

📫 Contato: [leonardo.castrodesouza@gmail.com]
🔗 Site/LinkedIn/GitHub (opcional)


