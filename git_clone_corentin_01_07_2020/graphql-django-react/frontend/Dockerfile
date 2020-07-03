FROM node
RUN mkdir ./frontend
WORKDIR ./frontend
COPY requirements.txt .
RUN npm init -y && cat requirements.txt | xargs npm install --save
