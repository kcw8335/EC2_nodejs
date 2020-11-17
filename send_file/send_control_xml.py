# 라즈베리파이로 xml데이터를 전송하기 위한 python file
from function import *
import os

import json # import json module

# with statement
with open('instruction.json', encoding="UTF-8") as json_file:
    json_data = json.load(json_file)

while True:
    # 파일이 있다면 상황판단 후 데이터베이스에 로깅 후 전송
    if os.path.isfile(json_data["file_path_xml"]):
        # control.xml 파싱하기
        tmp_list = parsing_XML_control(json_data["file_path_xml"])
       
        # 모든 xml 데이터를 데이터베이스에 로깅
        control_xml_logging(tmp_list)
        
        # 엣지 1로 보내기 위한 코드
        if tmp_list[0] == "1":
            os.system(json_data["mv_1"])
            # 관리자 페이지에서 생성된 xml 파일을 라파통신 폴더로 넘겨주기
            os.system(json_data["instruction_1"])
            os.remove(json_data["file_path_xml_1"])
        # 엣지 2로 보내기 위한 코드
        elif tmp_list[0] == "2":
            os.system(json_data["mv_2"])
            # 관리자 페이지에서 생성된 xml 파일을 라파통신 폴더로 넘겨주기
            os.system(json_data["instruction_2"])
            os.remove(json_data["file_path_xml_2"])
        # 그 외에 파일들은 삭제!!
        else:
            os.remove(file_path_xml)
