# location
Location Service Demo

## Project Structure
- app: application frontend
- server: backend service
- init_db: db scripts
- device: device simulator, generates location data

## How to run demo
### 1 Start DB
```
>> docker-compose up -d
```
### 2 Instert location data
```
>> cd device
>> npm install
>> npm start
```
### 3 Start server
```
>> cd server
>> npm install 
>> npm start
```
check http://localhost:3000/loc/health for service status

run server test
```
npm test
```

### 4 Start appliation
Install dependencies
```
>> cd app
>> npm install
```
Config google map AKI key: open file ```/app/env/config-dev.js```, replace ```{YOUR-KEY}```with a valid API key

Start application
```
npm start
```

run app test
```
npm test
```
