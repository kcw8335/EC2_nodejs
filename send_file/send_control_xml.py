# 현재 상황에 대한 전역변수 초기상황은 정상상황
current_occasion = "NA"
from function1 import *
import os
# control.xml 파일의 경로
file_path_xml = "/home/ubuntu/project2/data/control.xml"

while True:
    if os.path.isfile(file_path_xml):
        # control.xml 파싱하기
        tmp_list = parsing_XML_control(file_path_xml)
        occasion = tmp_list[3]
        # 상황판단
        tmp = occasion_decision(current_occasion, occasion)
        current_occasion = tmp[0]
        if tmp[1] == True:
            logging(tmp_list)
            # 관리자 페이지에서 생성된 xml 파일을 라파통신 폴더로 넘겨주기
            os.system('scp -i "/home/ubuntu/send_file/socket_programming.pem" ' + file_path_xml + ' ubuntu@ec2-3-35-141-152.ap-northeast-2.compute.amazonaws.com:/home/ubuntu/EC2_python_realtime/control_data_xml')
            os.remove(file_path_xml)
        else:
            os.remove(file_path_xml) 
