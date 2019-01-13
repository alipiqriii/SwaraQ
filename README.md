# SwaraQ
Cara Instalasi Aplikasi BlockChain
“Asumsi sudah menginstall Ganache dan Metamask, XAMPP, truffle, NodeJS, NPM”

    1. Clone Github Repository SwaraQ BlockChain 
       git clone https://github.com/alipiqriii/SwaraQ.git
       
SwaraQ Event Management :

    1. Extract SwaraQWebManagement.zip ke direktori htdocs XAMPP
    2. jalankan XAMPP,
    3. Start Service Apache & MySQL
    4. Buat Database Baru dengan Nama SwaraQ
    5. Masuk Ke PhpMyAdmin Import Database dari SwaraQ.SQL
    6. Setting Database SwaraQWebManagement yang berada di file Config/database.php
    7. Selesai
       
SwaraQ BlockChain :

    1. Masuk Ke direktori hasil Clone
    2. Ketikan perintah npm-install
    3. setting truffle.js dengan network host dan port sesuai dari ganache
    4. setting database di Server.js
    5. compile & migrate smart contract dengan perintah truffle-migrate –compile-all –reset
    6. start web SwaraQ dengan perintah npm start (sebelum start pastikan DB MySQL sudah jalan)
