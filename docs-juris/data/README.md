
##Fonte
Tais planilhas foram obtidas através do site da organização (Reporter Brasil)[http://reporterbrasil.org.br/]

## Como auxiliar no tratamento dos dados?

Como você pode constatar cada planilha apresenta as informações usando tabelas distintas. A informação não está padronizada, e também não possui dados sobre a localização da cidade(Latitude e Longitude). Então, para que tais dados tornen-se úteis é necessário tratar e agregar informações  para os dados obtidos pelas planilhas. Estou com o seguinte workflow:


. Abro a planilha year e tento tratar o máximo possível a planilha
..Removo acentos dos nomes das colunas
..Tento agrupar os dados com a seguinte nomenclatura
...ANO
...UF
...MUNICIPIO
...CNAE
...RESPONSAVEL
...CPF/CNPJ
...ESTABELECIMENTO
...TRABALHADORES
. Exporto a tabela para csv, e salvo a mesma em (data/csv/year.csv)[https://github.com/devmessias/brasillivre/tree/master/data/csv/]
. Uso (csvtojson)[https://www.npmjs.com/package/csvtojson) para converter o year.csv para year.json que  ficará localizado em (data/json/rust-year.json)[https://github.com/devmessias/brasillivre/tree/master/data/json/]
. Crio um script em python na pasta (data/)[https://github.com/devmessias/brasillivre/tree/master/data/] year.py que   carregará as informações de data/json/rust-year.json e ficará responsável por colocar as informações geográficas(no mesmo modelo que (2014.py)[https://github.com/devmessias/brasillivre/tree/master/data/2014.py]) e agrupar os dados respeitando a seguinte nomenclatura

..year
..cityName
..UF
..CNAE
..employer
..CPF/CNPJ

..establishment
..workers
..geometry
..address_components
..formatted_address
###observações

year se refere ao ano de soltura dos trabalhadores

cityName se refere ao município

employer se refere a pessoa responsável por esses trabalhadores, e que foi processada

geometry, formatted_address, address_components se refere ao resultado da consulta da api do google maps 
..Exemplo o (link)[https://maps.googleapis.com/maps/api/geocode/json?address=Crix%C3%A1s+do+Tocantins] retorna um json e devemos capturar o resultado de results

