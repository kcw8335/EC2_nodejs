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

def occasion_decision(current_occasion, occasion):
    # 현재 상황이 정상, 제어신호는 사고 대응
    # 정상상황에서 사고대응상황으로 변경
    if current_occasion == "NA" and occasion == "A":
        # 현재 상황을 사고 상황으로 돌리기
        return ["A", True, "정상 => 사고"]
    # 현재 상황이 사고 대응, 제어신호는 정상화
    # 사고상황에서 정상상황으로 변경
    elif current_occasion == "A" and occasion == "normalization":
        # 현재 상황을 정상으로 돌리기
        return ["NA", True, "사고 => 정상"]
    # 현재 상황이 정상, 제어 신호 정상
    # 정책변경 상황
    elif current_occasion == "NA" and occasion == "NA":
        # 현재 상황은 정상으로 유지
        return ["NA", True, "정책변경"]
    # 나머지 신호에 대해서는 거부
    else:
        return [current_occasion, False]

# ===================================================================================================================================================
# pip install pymysql
import pymysql

# 어떤 control.xml 데이터가 들어왔는 지에 대한 로그
# 모든 control.xml 데이터를 로깅
def control_xml_logging(tmp_list):
    edgeNo = tmp_list[0]
    traffic_light = tmp_list[1]
    how_many = tmp_list[2]
    occasion = tmp_list[3]
    # MySQL Connection 연결
    conn = pymysql.connect(host='database-1.ckkbkqdct7py.ap-northeast-2.rds.amazonaws.com', user='admin', password='kshieldjr', db='project', charset='utf8')
    # Connection으로부터 Cursor 생성
    curs = conn.cursor()
    sql = "insert into Control_Xml_Log(edgeNo, traffic_light, how_many, occasion, logging_date) values(%s, %s, %s, %s, now())"
    curs.execute(sql, (edgeNo, traffic_light, how_many, occasion))
    conn.commit()
    conn.close()
    
# control.xml을 보내기 전에 데이터베이스에 로깅하기 위한 함수
# NA_Log, A_Log
def logging(tmp_list, state_change):
    edgeNo = tmp_list[0]
    traffic_light = tmp_list[1]
    how_many = tmp_list[2]
    occasion = tmp_list[3]
    # MySQL Connection 연결
    conn = pymysql.connect(host='database-1.ckkbkqdct7py.ap-northeast-2.rds.amazonaws.com', user='admin', password='kshieldjr', db='project', charset='utf8')
    # Connection으로부터 Cursor 생성
    curs = conn.cursor()
    # SQL문 만들기
    # 정책 변경시 로그 기록
    if state_change == "정책변경":
        sql = "insert into NA_Log(state_change, edgeNo, traffic_light, how_many, logging_date) values(%s, %s, %s, %s, now())"
        curs.execute(sql, (state_change, edgeNo, traffic_light, how_many))
        conn.commit()
        conn.close()
    # 정상 => 사고 상황 로그 기록
    elif state_change == "정상 => 사고":
        sql = "insert into A_Log(state_change, edgeNo, traffic_light, how_many, logging_date) values(%s, %s, %s, %s, now())"
        curs.execute(sql, (state_change, edgeNo, traffic_light, how_many))
        conn.commit()
        conn.close()
    # 사고 => 정상 상황 로그 기록
    elif state_change == "사고 => 정상":
        sql = "insert into A_Log(state_change, edgeNo, traffic_light, how_many, logging_date) values(%s, %s, %s, %s, now())"
        curs.execute(sql, (state_change, "all_reset", "all_reset", "all_reset"))
        conn.commit()
        conn.close()
