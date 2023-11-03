import pymongo
from pymongo import MongoClient
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from collections import defaultdict

app = Flask(__name__)
cors = CORS(app)

app.config[
    "MONGO_URI"
] = "mongodb+srv://test:test@cluster0.iku4q9b.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(app.config["MONGO_URI"])
db = client["UserInfo"]
collection = db["Users"]
# fix


@app.route("/create-user", methods=["POST"])
@cross_origin()
def create_user():
    # getting user information
    print("server received")
    userdata = request.get_json()
    username = userdata.get("user")
    password = userdata.get("pass")
    confirm = userdata.get("confirm")
    if collection.count_documents({"user": username}) > 0: #if the username alr exists in the db
        return jsonify({"status": "failure"})
    elif password != confirm: #if the confirm password doesn't match
        return jsonify({"status": "failure"})
    else:
        collection.insert_one({"user": username, "pass": password, "projects": []}) #projects is the projects that the user has access to
        return jsonify({"status": "success"})


@app.route("/login", methods=["POST"])
@cross_origin()
def login():
    userdata = request.json
    username = userdata.get("user")
    password = userdata.get("pass")
    doc = collection.find_one({"user": username})
    if doc:
        userPass = doc.get("pass")
        if password == userPass:
            # the user exists and the password matches
            return jsonify({"status": "success"})
        
        else:
            return jsonify({"status": "failure"})
    else:
        return jsonify({"status": "failure"})


@app.route("/get-docs", methods=["GET"])
@cross_origin()
def getDocs():
    db = client["Projects"]
    res = defaultdict(lambda: [0, 0])
    if db.list_collection_names():
        for topic in db.list_collection_names():
            collection = db[topic]
            for doc in collection.find():
                temp = {}
                temp["name"] = doc["name"]
                temp["quantity"] = doc["quantity"]
                temp["capacity"] = doc["capacity"]
                res[topic][0] = temp
        return jsonify({"map": res, "topics": db.list_collection_names()})
    else:
        # if there are no topics in the Project DB
        return jsonify({"status": "none"})

    # creates a hashmap to key: topic, value: array
    # array[0] is a hashmap of HWSet1 and array[1] is a hashmap of HWSet2
    return jsonify({"status" : "none"})

if __name__ == "__main__":
    app.run(debug=True)