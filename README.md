Esqueleto de una aplicación web 
1 - BBDD encendida

sudo systemctl start mongod

2 - Importar la BBDD:

mongorestore -d videoJuegos ./dump_lliga/

3 - Instalar paquetes nodejs:

npm install

4 - Ejecutar

./bin/www
http://localhost:3000
