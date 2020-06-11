import json
from functools import reduce
from . import db
from Bill import app
from .models import *
from flask import jsonify, request
from sqlalchemy import func, and_, extract
from .utils import handle_time, handle_sum
import time
import pprint


@app.route('/accounts')
def get_home():
    res = {"data": []}
    t = handle_time(request.args.get("t", round(time.time() * 1000)))
    id = request.args.get("id", 1)
    acolist = list(
        db.session.execute(f"SELECT * FROM account WHERE user_id={id} and MONTH(date)={t.month}"))
    outcome_sum = sum([i[1] for i in acolist if i[3] == "1" and i[2].month == t.month])
    income_sum = sum([i[1] for i in acolist if i[3] == "0" and i[2].month == t.month])

    accounts = list(
        db.session.execute(
            f"SELECT date FROM account WHERE user_id={id}  and MONTH(date)={t.month} GROUP BY date ORDER BY date ASC"))
    if accounts:
        for i in accounts:
            item = {"date": '', "list": [], "income": 0, "outcome": 0}
            item["income_sum"] = income_sum
            item["outcome_sum"] = outcome_sum
            item["date"] = f"{i[0].year}年{i[0].month}月{i[0].day}日"
            for j in acolist:
                if i[0].day == j[2].day:
                    resp = {}
                    resp["id"] = j[0]
                    resp["money"] = j[1]
                    resp["date"] = f"{j[2].year}年{j[2].month}月{j[2].day}日"
                    resp["type"] = j[3]
                    resp["desc"] = j[4]
                    resp["user_id"] = j[5]
                    resp["type_id"] = j[6]
                    resp["img"] = Type.query.filter(j.type_id == Type.id).all()[0].to_dict()
                    item["list"].append(resp)

            res["data"].append(item)
        for account in res["data"]:
            try:
                account["income"] = reduce(lambda x, y: x + y,
                                           [i["money"] for i in account["list"] if i["type"] == "0"])
            except Exception as e:
                account["income"] = 0
            try:
                account["outcome"] = reduce(lambda x, y: x + y,
                                            [i["money"] for i in account["list"] if i["type"] == "1"])
            except Exception as e:
                account["outcome"] = 0
        return jsonify(res)
    else:
        return jsonify(res)


@app.route('/detail')
def get_detail():
    res = {"data": {}}
    aid = request.args.get("aid", '')
    account = Account.query.filter(Account.id == aid).first()
    types = Type.query.filter(account.type_id == Type.id).first().to_dict()
    res["data"]["account"] = account.to_dict()
    res["data"]["type"] = types
    return jsonify(res)


@app.route('/categrays')
def get_categray():
    res = {"income": [], "outcome": []}
    categrays = Type.query.all()
    for item in categrays:
        if item.kind == 0:
            res["outcome"].append(item.to_dict())
        else:
            res["income"].append(item.to_dict())

    return jsonify(res)
    pass


@app.route('/bill')
def get_bill():
    res = {"income_sum": 0, "outcome_sum": 0, "list": []}
    t = handle_time(request.args.get("t", 1588953777329))
    id = request.args.get("userid", 1)

    acolist = list(db.session.execute(f"SELECT * FROM account WHERE user_id={id}"))
    for a in acolist:
        if a[2].year == t.year and a[3] == "0":
            res["income_sum"] += a[1]
        if a[2].year == t.year and a[3] == "1":
            res["outcome_sum"] += a[1]

    res["jieyu"] = res["income_sum"] - res["outcome_sum"]

    for i in range(1, 13):
        item = {"month": i, "income": 0, "outcome": 0, "jieyu": 0}
        for each in acolist:
            if each[2].month == i and each[3] == "0" and each[2].year == t.year:
                item["income"] += each[1]
            if each[2].month == i and each[3] == "1" and each[2].year == t.year:
                item["outcome"] += each[1]
        item["jieyu"] = item["income"] - item["outcome"]
        res["list"].append(item)
    return jsonify(res)


@app.route('/delete')
def get_delete():
    id = request.args.get("id", "")
    account = Account.query.filter(Account.id == id).first()
    db.session.delete(account)
    db.session.commit()
    return jsonify()


@app.route('/addaccount', methods=["post"])
def add_account():
    params = json.loads(request.get_data().decode("utf-8"))
    t = handle_time(round(time.time()) * 1000)
    db.session.add(Account(money=params.get("money"), date=t, type=params["typeid"], desc=params["desc"],
                           user_id=params["userid"], type_id=params["id"]))
    db.session.commit()
    return jsonify()


@app.route("/edit")
def handle_edit():
    id = request.args.get("id", '')
    money = request.args.get("money", "0")
    desc = request.args.get("desc", '')
    accoun = Account.query.filter(Account.id == id).first()
    accoun.money = money
    accoun.desc = desc
    db.session.commit()
    new_account = Account.query.filter(Account.id == id).first()
    return jsonify(new_account.to_dict())


@app.route("/login")
def login():
    username = request.args.get("username")
    pwd = request.args.get("pwd")
    user = User.query.filter(and_(User.username == username, User.password == pwd)).first()
    if user:
        return jsonify(user.to_dict())
    else:
        return jsonify()


@app.route("/register", methods=["post"])
def register():
    params = json.loads(request.get_data().decode("utf-8"))
    user = User.query.filter(User.username == params.get("username")).first()
    if user:
        return jsonify({"state": 1})
    user = User(username=params.get("username"), password=params.get("pwd"))
    db.session.add(user)
    db.session.commit()
    return jsonify({"state": 0})


@app.route('/total')
def total():
    res = {"accountSum": 0, "daySum": 0}
    id = request.args.get("id")
    acolist = list(db.session.execute(f"SELECT * FROM account WHERE user_id={id}"))
    if acolist:
        res["accountSum"] = len(acolist)
        res["daySum"] = len(list(set([i[2] for i in acolist])))
        return jsonify(res)
    return jsonify(res)


@app.route('/test')
def get_test():
    sd = db.session.execute("select * from account")
    print(list(sd))
    return jsonify()
