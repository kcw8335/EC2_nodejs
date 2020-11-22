from xml.etree import ElementTree

# 제어신호 값들을 데이터베이스에 로깅하기 위해
# control.xml 값들을 parsing 해옴
# 첫번째 매개변수는 str 타입의 xml 파일 경로
def parsing_XML_control(filename):
    tree = ElementTree.parse(filename)
    root = tree.getroot()
    # root에서 나머지 세부 문자 추출
    edgeNo = root.findtext("edgeNo")
    traffic_light = root.findtext("traffic_light")
    how_many = root.findtext("how_many")
    occasion = root.findtext("occasion")
    return [edgeNo, traffic_light, how_many, occasion]


import json

with open('secrets.json', encoding="UTF-8") as json_file:
        json_data = json.load(json_file)

# pip install pymysql
import pymysql

# 어떤 control.xml 데이터가 들어왔는 지에 대한 로그
# 모든 control.xml 데이터를 로깅
def control_xml_logging(control_list, db_list):
    # control 정보 가져오기
    edgeNo = control_list[0]
    traffic_light = control_list[1]
    how_many = control_list[2]
    occasion = control_list[3]

    # db 계정 정보 가져오기
    host = db_list[0]
    user = db_list[1]
    password = db_list[2]
    db = db_list[3]

    # MySQL Connection 연결
    conn = pymysql.connect(host=host, user=user, password=password, db=db, charset='utf8')
    # Connection으로부터 Cursor 생성
    curs = conn.cursor()
    # 모든 xml 데이터 로깅
    sql = json_data["All_Control_Log"]
    curs.execute(sql, (edgeNo, traffic_light, how_many, occasion))
    
    if occasion == "NA":
        state_change = "정책변경"
        curs.execute(json_data["NA_Log"], (state_change, edgeNo, traffic_light, how_many))
    elif occasion == "A":
        state_change = "사고대응"
        curs.execute(json_data["A_Log"], (state_change, edgeNo, traffic_light, how_many))
    elif occasion == "normalization":
        state_change = "정상화"
        curs.execute(json_data["A_Log"], (state_change, edgeNo, "all_reset", 0))
    conn.commit()
    conn.close()


