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
            new_alt = db.session.execute('select country from WWIIop2')
            db.session.add(new_alt)
            db.session.commit()
            return {"message": f"car {new_alt.Country} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        alt = db.session.execute('Select * From "WWIIop2"')
        columns = (
            'Mission_ID',
            'Mission_Date',
            'Theater_of_Operations',
            'Country',
            'Aircraft' ,
            'Takeoff_Base',
            'Takeoff_Location' ,
            'Takeoff_Latitude' ,
            'Takeoff_Longitude' ,
            'Target_Country' ,
            'Target_City' ,
            'Target_Latitude' ,
            'Target_Longitude' ,
            'Altitude',
            'High_Explosives',
            'High_Explosives_Type' ,
            'High_Explosives_Weight',
            'High_Explosives_Weight_Tons',
            'Incendiary_Devices',
            'Incendiary_Devices_Type',
            'Incendiary_Devices_Weight',
            'Incendairy_Devices_Weight_Tons',
            'Fragmentation_Devices',
            'Fragmentation_Devices_Type',
            'Fragmentation_Devices_Weight',
            'Fragmentation_Devices_Weight_Tons',
            'Total_Weight',
            'Total_Weight_Tons'
        )
        alt2 = alt.fetchall()
        results = []
        for row in alt2:
            results.append(dict(zip(columns, row)))
        return json.dumps(results, indent=2)

if __name__ == '__main__':
    app.run(debug=True)
    app.run()