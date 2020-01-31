import json
from flask import Response, Flask, request, json
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost:5432/WWII_db"
app.config ['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

@app.route('/')
def hello():
    return {"hello": "world"}

@app.route('/WWII', methods=['POST', 'GET'])
def handle_alt():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_alt = db.session.execute('select country from WIIops2')
            db.session.add(new_alt)
            db.session.commit()
            return {"message": f"car {new_alt.Country} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        alt = db.session.execute('select * from wwiii_ops limit 100')
        columns = (
            'Mission ID',
            'Mission Date','Theater of Operations',
            'Country',
            'Aircraft' ,
            'Takeoff Base',
            'Takeoff Location' ,
            'Takeoff Latitude' ,
            'Takeoff Longitude' ,
            'Target Country' ,
            'Target City' ,
            'Target Latitude' ,
            'Target Longitude' ,
            'Altitude',
            'High Explosives',
            'High Explosives_Type' ,
            'High Explosives_Weight',
            'High Explosives_Weight_Tons',
            'Incendiary Devices',
            'Incendiary Devices_Type',
            'Incendiary Devices_Weight',
            'Incendairy Devices_Weight_Tons',
            'Fragmentation Devices',
            'Fragmentation Devices_Type',
            'Fragmentation Devices_Weight',
            'Fragmentation Devices_Weight_Tons',
            'Total Weight',
            'Total Weight Tons'
        )
        alt2 = alt.fetchall()
        results = []
        for row in alt2:
            results.append(dict(zip(columns, row)))
        return json.dumps(results, indent=2)

if __name__ == '__main__':
    app.run(debug=True)
    app.run()