from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import sqlite3
import numpy as np

app = Flask(__name__)
CORS(app)

# name = ''


@app.route("/dropBox", methods=['POST'])
def dropBox():
    conn = sqlite3.connect("E:/FootprintBack/empreint_carbon.db")
    cur = conn.cursor()
    result = request.get_json()
    dic = {}
    passe = True
    condition = '1=1 '
    if not result['sector'] == '':
        res = cur.execute("SELECT DISTINCT Secteur FROM carbon").fetchall()

        dic['sector'] = list(np.array(res).reshape(-1))

        condition += f"""AND Secteur="{result['sector']}" """
    else:
        passe = False
        query = """SELECT Distinct Secteur FROM carbon"""
        cur.execute(query)
        res = cur.fetchall()
        dic['sector'] = list(np.array(res).reshape(-1))

    if not result['domain'] == '':
        query = f"""SELECT Distinct "Domaine" FROM carbon where {condition}"""
        cur.execute(query)
        res = cur.fetchall()
        dic['domain'] = list(np.array(res).reshape(-1))

        condition += f"""AND Domaine="{result['domain']}" """

    else:
        if passe == True:
            passe = False
            print(condition)
            query = f"""SELECT Distinct Domaine FROM carbon where {condition}"""
            cur.execute(query)
            res = cur.fetchall()
            dic['domain'] = list(np.array(res).reshape(-1))
        else:
            dic['domain'] = []

    if not result['activitie'] == '':
        query = f"""SELECT Distinct Activité FROM carbon where {condition}"""
        cur.execute(query)
        res = cur.fetchall()
        dic['activitie'] = list(np.array(res).reshape(-1))

        condition += f"""AND Activité="{result['activitie']}" """
    else:
        if passe == True:
            passe = False
            query = f"""SELECT Distinct Activité FROM carbon where {condition}"""
            cur.execute(query)
            res = cur.fetchall()
            dic['activitie'] = list(np.array(res).reshape(-1))
        else:
            dic['activitie'] = []

    if not result['type'] == '':
        query = f"""SELECT Distinct Type FROM carbon where {condition}"""
        cur.execute(query)
        res = cur.fetchall()
        dic['type'] = list(np.array(res).reshape(-1))
        condition += f"""AND Type="{result['type']}" """
    else:
        if passe == True:
            print('inType')
            passe = False
            query = f"""SELECT Distinct "Type" FROM carbon where {condition}"""
            cur.execute(query)
            res = cur.fetchall()
            print(query, res)
            dic['type'] = list(np.array(res).reshape(-1))
        else:
            dic['type'] = []
    if not result['subtype'] == '':
        query = f"""SELECT Distinct "Sous type" FROM carbon where {condition}"""
        cur.execute(query)
        res = cur.fetchall()
        dic['subtype'] = list(np.array(res).reshape(-1))
        condition += f"""AND "Sous type"="{result['subtype']}" """
    else:
        if passe == True:
            passe = False
            query = f"""SELECT Distinct "Sous type" FROM carbon where {condition}"""
            cur.execute(query)
            res = cur.fetchall()
            print(query, res)
            dic['subtype'] = list(np.array(res).reshape(-1))
        else:
            dic['subtype'] = []
    if not result['name'] == '':
        query = f"""SELECT Distinct "Nom attribut" FROM carbon where {condition}"""
        cur.execute(query)
        res = cur.fetchall()
        dic['name'] = list(np.array(res).reshape(-1))
        condition += f"""AND "Nom attribut"="{result['name']}" """
        query = f"""SELECT Distinct "Unité français" FROM carbon where {condition}"""
        print('inHere')
        print(query)
        cur.execute(query)
        res = cur.fetchall()
        print(res, 'res\n', query, 'query')
        dic['unit'] = list(np.array(res).reshape(-1))

    else:
        if passe == True:
            passe = False
            query = f"""SELECT Distinct "Nom attribut" FROM carbon where {condition}"""
            cur.execute(query)
            res = cur.fetchall()
            dic['name'] = list(np.array(res).reshape(-1))
        else:
            dic['name'] = []
            dic['unit'] = []
    # print(dic)
    return dic


@app.route("/NewProduct")
def NewProduit():
    conn = sqlite3.connect("E:/FootprintBack/empreint_carbon.db")
    cur = conn.cursor()
    result = request.get_json()
    global name
    name = result['ProdName']
    query = f"""SELECT "Identifiant de l'élément" FROM ProduitsComposees where Name='{name}'"""
    cur.execute(query)
    res = cur.fetchall()
    if len(res) > 0:
        return {'Alerte': 'False'}
    else:
        return {'Alerte': 'True', 'message': 'Existe deja'}


@app.route("/AddNewProduct")
def AddNewProduit():
    conn = sqlite3.connect("E:/FootprintBack/empreint_carbon.db")
    cur = conn.cursor()
    global name
    query = """SELECT MAX("Identifiant de l'élément") FROM carbon"""
    cur.execute(query)
    max = cur.fetchall()[0][0]
    result = request.get_json()
    req = 'INSERT INTO Produitstmp VALUES ("'+str(name)+'", "'+str(max+1)+'", "'+str(result['sector'])+'", "'+str(result['domain'])+'", "'+str(
        result['activitie'])+'", "'+str(result['type'])+'", "'+str(result['subtype'])+'", "'+str(result['name'])+'", "'+str(result['unit'])+'", "'+str(result['quantite'])+'")'
    cur.execute(req)
    conn.commit()
    return


@app.route("/DoneNewProduct")
def NewProduitDone():
    conn = sqlite3.connect("E:/FootprintBack/empreint_carbon.db")
    cur = conn.cursor()
    query = """SELECT * FROM Produitstmp"""
    cur.execute(query)
    results = cur.fetchall()
    list_values = []
    sum = 0
    for res in results:
        dic = {}
        req = 'INSERT INTO ProduitsComposees VALUES ("'+str(res[0])+'", "'+str(res[1])+'", "'+str(res[2])+'", "'+str(res[3])+'", "'+str(
            res[4])+'", "'+str(res[5])+'", "'+str(res[6])+'", "'+str(res[7])+'", "'+str(res[8])+'", "'+str(res[9])+'", "'+str(res[10])+'")'
        dic['name'] = res[0]
        dic['Secteur'] = res[2]
        dic['Domaine'] = res[3]
        dic['Activite'] = res[4]
        dic['Type'] = res[5]
        dic['subtype'] = res[6]
        dic['Nom attribut'] = res[7]
        dic['Unité français'] = res[8]
        dic['empreinte'] = res[9]
        dic['quantite'] = res[10]
        sum += dic['quantite']*dic['empreinte']
        cur.execute(req)
        conn.commit()
        list_values.append(dic)

    req = 'DELETE FROM Produitstmp'
    cur.execute(req)
    conn.commit()
    return {'td': list_values, 'sum': sum}


@app.route("/ExistingProd")
def ExistingProd():
    conn = sqlite3.connect("E:/FootprintBack/empreint_carbon.db")
    cur = conn.cursor()
    result = request.get_json()
    query = f"""SELECT * FROM ProduitsComposees where 'name'={result['name']}"""
    cur.execute(query)
    results = cur.fetchall()
    list_values = []
    sum = 0
    for res in results:
        dic = {}
        dic['name'] = res[0]
        dic['Secteur'] = res[2]
        dic['Domaine'] = res[3]
        dic['Activite'] = res[4]
        dic['Type'] = res[5]
        dic['Sous type'] = res[6]
        dic['Nom attribut'] = res[7]
        dic['Unité français'] = res[8]
        dic['empreinte'] = res[9]
        dic['quantite'] = res[10]
        sum += dic['quantite']*dic['empreinte']

        list_values.append(dic)

    return {'td': list_values, 'sum': sum}


if __name__ == "__main__":

    app.run(debug=True, port=5000)
