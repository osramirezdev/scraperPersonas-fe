# React + TypeScript + Vite

<p align="center">
  <a target="_blank" href="http://scraperpersonas.yocreativo.com/">
    <picture>
      <source height="350" media="(prefers-color-scheme: dark)" srcset="src/assets/scraperlogo.png">
      <img height="350" alt="Scraper Perosnas" src="src/assets/scraperlogo.png">
    </picture>
  </a>
  <br>
</p>
<p align="left">
  <b>ScraperPersonas</b> provee un RESTfulapi para obtener datos de cédulas, haciendo scraping de los siguientes sitios:
  <br>
  <ol>
    <li><a target="_blank" href="https://ruc.com.py">Datos de RUC</a></li>
    <li><a target="_blank" href="https://servicios.ips.gov.py/consulta_asegurado/comprobacion_de_derecho_externo.php">Datos de IPS</a></li>
    <li><a target="_blank" href="https://datos.sfp.gov.py/data/funcionarios">Datos de Funcionarios Publicos</a></li>
  </ol>
</p>

## [API Demo](http://apiscraper.yocreativo.com/swagger)
## [Client Demo](http://scraperpersonas.yocreativo.com/)
<br>

## 🚀 Usage

```bash
cp .env.example .env
```

Ingresar las url en el archivo `.env`

Build con docker
```bash
docker build -t viter .
docker run -d -p 5173:5173 --name viter viter
```

Build con docker-compose
```bash
docker-compose build
docker-compose up -d clientapiscraper
```

## 👨‍💻 Author

#### [Oscar Ramirez](https://yocreativo.com)

## ✍️ License

[MIT](https://choosealicense.com/licenses/mit/)
