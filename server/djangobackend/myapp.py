import requests
import json
URL = "http://127.0.0.1:8000/campaign_create/"

data = {
 'name': 'maryamm',
 'brandmanager': 'bm1',
 'cost' : 100
}

json_data = json.dumps(data)
r = requests.post(url = URL, data=json_data)
data = r.json()
print(data)

