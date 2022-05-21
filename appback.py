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


@app.route("/Prod", methods=['POST'])
def Prod():
    data = request.get_json()
    conn = sqlite3.connect("empreint_carbon.db")
    cur = conn.cursor()
    query = """SELECT DISTINCT Name FROM ProduitsComposees"""
    cur.execute(query)
    res = cur.fetchall()
    return {'prod': list(np.array(res).reshape(-1))}


@app.route("/DoneNewProduct", methods=['POST'])
def NewProduitDone():
    conn = sqlite3.connect("E:/FootprintBack/empreint_carbon.db")

    cur = conn.cursor()
    data = request.get_json()
    prodName = data['prodName']
    results = data['dt']
    sum = 0
    # print(results)
    for res in results:
        sector = res['sector']
        domain = res['domain']
        activitie = res['activitie']
        typee = res['type']
        subtype = res['subtype']
        name = res['name']
        qty = res['qty']
        req = f"""INSERT INTO ProduitsComposees VALUES ("{prodName}", "{sector}", "{domain}", "{activitie}", "{typee}", "{subtype}", "{name}", "NULL", "{0}", "{qty}")"""  # res['footprint']

        sum += int(qty)  # *res['footprint']
        cur.execute(req)
        conn.commit()
    return {'td': data['dt'], 'sum': sum}


@app.route("/ExistingProd", methods=['POST'])
def ExistingProd():
    conn = sqlite3.connect("E:/FootprintBack/empreint_carbon.db")
    cur = conn.cursor()
    result = request.get_json()
    print(result['name'])
    query = f"""SELECT * FROM ProduitsComposees where name='{result['name']}'"""
    cur.execute(query)
    results = cur.fetchall()
    list_values = []
    sum = 0
    print(request)
    print(results)
    for res in results:
        dic = {}
        dic['nameP'] = res[0]
        dic['sector'] = res[2]
        dic['domain'] = res[3]
        dic['activitie'] = res[4]
        dic['type'] = res[5]
        dic['subtype'] = res[6]
        dic['name'] = res[7]
        dic['unit'] = res[8]
        dic['qty'] = res[9]
        sum += dic['qty']  # *dic['empreinte']
        list_values.append(dic)
    print(list_values)
    return {'td': list_values, 'sum': sum}


if __name__ == "__main__":

    app.run(debug=True, port=5000)
