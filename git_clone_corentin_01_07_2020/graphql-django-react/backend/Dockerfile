FROM python
RUN mkdir ./backend
WORKDIR ./backend
COPY requirements.txt .
COPY channels .
RUN python3 -m pip install pip --upgrade && python3 -m pip install -r requirements.txt
