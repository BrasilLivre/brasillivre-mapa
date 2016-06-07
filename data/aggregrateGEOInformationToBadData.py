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
criminal = json.loads(open('2014-2016.json').read())
apiKey='AIzaSyAvPgkMXz2OqWP8FXqPFbyJOleDyvUwKws'
def excludeWrongData(criminal):
	noCity = isinstance(criminal['ESTABELECIMENTO'],int)
	if noCity is True:
		badCriminalData.append(criminal)
	return noCity is False

def getExtraData(criminal):
	cityName = str(criminal['ESTABELECIMENTO'].encode('utf-8')).split(',').pop().split('/')[0]	
	criminal['cityName']=cityName.decode('utf-8')
	return criminal

def aggregrateGEO(criminal):
	r= requests.get('https://maps.googleapis.com/maps/api/geocode/json',params={'address':criminal['cityName'],'key':apiKey})
	try:	
		criminal['geometry'] = r.json()['results'][0]['geometry'] 
	except:
		badCriminalData.append(criminal)
		print criminal['cityName']
	return criminal
healedCriminalData=map(getExtraData,filter(excludeWrongData,criminal))
healedCriminalData=map(aggregrateGEO,healedCriminalData)

with open('healedCriminalData.json', 'w') as fp:
    json.dump(healedCriminalData, fp)
with open('badCriminalData.json', 'w') as fp:
    json.dump(badCriminalData, fp)


