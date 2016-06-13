# -*- coding: utf-8 -*-
import json
import requests
import time
import sys



criminalHealed=[]
criminalRust = json.loads(open('../json/1995-2010.json').read())
criminalCity = json.loads(open('../json/tabelaCidadesFlagrantes.json').read())
def findCity(year,uf,workers):
	def filter(criminal):
		isYear=criminal['Ano']==year
		isUF=criminal['UF']==uf
		isWorkers=criminal['trabalhadores']=workers
		if isYear and isUF and isWorkers:
			return True
		return noCity is False


def aggregrateCity(criminal):
	cityEmpty=criminal['municipio']=='';
	if cityEmpty:
		filterCity=findCity(criminal['Ano'],criminal['UF'],criminal['trabalhadores'])
		citys=filter(filterCity,criminalCity)
		criminal['municipio']=citys[0]['municipio'].encode('utf-8')
	return criminal

healedCriminalData=map(aggregrateCity,criminalRust)



with open('../json/1995-2010-healed(cidadesInseridas).py', 'w') as fp:
    json.dump(healedCriminalData, fp)


