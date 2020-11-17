# EC2_nodejs
1. send_file 폴더
- send_control_xml.py - nodejs로부터 control xml파일을 받아서 전송하는 역할 및 데이터베이스 로깅
- 사용방법 - python3 send_control_xml.py 명령
- function.py - send_control_xml에서 사용하는 각종 함수가 들어가 있는 python 파일
- secrets.json 파일 - 각종 명령어, 파일의 경로가 담겨진 Json 파일 - 보안을 위해 git에서는 올리지 않음

2. project4 폴더
- nodejs로 만든 웹서버
- 실행 방법 - node index.js 명령
- 접속 방법 - 브라우저에서 http://13.209.12.175:8080/ 로 접속
- data 폴더 - control xml 파일이 생성되는 폴더
- realtime 폴더 - 실시간 데이터를 받는 폴더 - 받게 되면 덮어 씀 - 덮어쓴 파일을 nodejs웹서버가 반복적으로 호출
