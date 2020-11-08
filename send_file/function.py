import json
from collections import OrderedDict
# Json 파일 만들기
def make_Json_file(edgeNO, traffic_light, time, file_path):
    file_data = OrderedDict()
    file_data["edgeNo"] = edgeNO
    file_data["traffic_light"] = traffic_light
    file_data["time"] = time
    print(json.dumps(file_data, ensure_ascii=False, indent="\t"))
    with open(file_path, 'w', encoding='utf-8') as make_file:
        json.dump(file_data, make_file, ensure_ascii=False, indent="\t")
