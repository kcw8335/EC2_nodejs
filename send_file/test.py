# 정책 변경시 update할 함수
import pymysql
def update_Non_Acc(tmp_list):
    # MySQL Connection 연결
    conn = pymysql.connect(host='database-1.ckkbkqdct7py.ap-northeast-2.rds.amazonaws.com', user='admin', password='kshieldjr', db='project', charset='utf8')
    # Connection으로부터 Cursor 생성
    curs = conn.cursor()
    edgeNo = tmp_list[0]
    traffic_light = tmp_list[1]
    how_many = tmp_list[2]
    # Non_Acc_E1 테이블 변경
    T_N = ["empty", "Non_Acc_E1", "Non_Acc_E2"]
    T_L = ["empty", "T1_G","T2_G","T3_G","T4_G"]
    sql = "update %s set %s = %s + %s where idx = 1"
    # 테이블, 컬럼, 컬럼, 더하는 값
    print(T_N[int(edgeNo)], T_L[int(traffic_light)], T_L[int(traffic_light)], how_many)
    curs.execute(sql, (T_N[int(edgeNo)], T_L[int(traffic_light)], T_L[int(traffic_light)], how_many))
    conn.commit()
    conn.close()

tmp_list = ["1", "2", "10"]
update_Non_Acc(tmp_list)
