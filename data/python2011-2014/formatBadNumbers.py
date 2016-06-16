# -*- coding: utf-8 -*-
import json

criminals = json.loads(open('../json/2011-2014-healed(dadosGeoInseridos).json').read())


def formatBadNumber(criminal):
    strTrabalhadores= str(criminal['trabalhadores']).replace('.','')
    if strTrabalhadores =='':
        strTrabalhadores='0'
    criminal['trabalhadores']=int(strTrabalhadores)
    return criminal

healedCriminalData=map(formatBadNumber,criminals)


with open('../json/2011-2014-healed(dadosGeoInseridos)(corrigidaMaFormatacaoDeNumeros).json', 'w') as fp:
    json.dump(healedCriminalData, fp)


