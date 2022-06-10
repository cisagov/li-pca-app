"""Con-PCA to Li-PCA template conversion and loading script."""
# Standard Python Libraries
import json

# Third-Party Libraries
import requests

json_obj = json.load(open("/Users/cantuj/Documents/templates.json"))
temp_list = []
counter = 0
url = "http://localhost:8080/li-pca/v1/templates"
headers = {"Content-Type": "application/json"}
for template in json_obj:
    data = {}
    data["name"] = f"template_{counter}"
    data["from_address"] = template["from_address"]
    data["landing_page_id"] = ""
    data["sender_profile_id"] = ""
    data["deception_score"] = template["deception_score"]
    data["retired"] = False
    data["retired_description"] = ""
    data["sending_profile_id"] = ""
    data["sophisticated"] = ""
    data["red_flag"] = ""
    data["subject"] = template["subject"]
    data["text"] = template["text"]
    data["html"] = template["html"]
    data["indicators"] = [str(template["indicators"])]
    data["campaigns"] = []
    data["recommendation_type"] = ""
    r = requests.post(url, data=json.dumps(data), headers=headers)
    print(r)
    counter += 1
