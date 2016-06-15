# -*- coding: utf-8 -*-
import json
import requests
import time
import sys

if len(sys.argv) ==1:
	print 'Insert google api Key'
	quit()
apiKey=sys.argv[1]
badCriminalData=[]
criminal = json.loads(open('../json/2011-2014-rust.json').read())



def aggregrateGEO(criminal):
	print criminal['municipio'].encode('utf-8')
	r= requests.get('https://maps.googleapis.com/maps/api/geocode/json',params={'address':criminal['municipio'].encode('utf-8')+' '+criminal['UF'].encode('utf-8'),'key':apiKey,'components':'country:brasil'})

	try:	
		criminal['geometry'] = r.json()['results'][0]['geometry']
	except:
		badCriminalData.append(criminal)

		print  isinstance(criminal['municipio'].encode('utf-8'),str)
		print criminal['municipio'].encode('utf-8')
	return criminal

healedCriminalData=map(aggregrateGEO,criminal)


with open('../json/2011-2014-healed(dadosGeoInseridos).json', 'w') as fp:
    json.dump(healedCriminalData, fp)


