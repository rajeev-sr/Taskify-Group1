Example data entered in ./db/exampleData.
Import this json into MongoDB, use data in same format.

usage : "python -m uvicorn main:app --reload"

testing : curl -X POST http://127.0.0.1:8000/login -H "Content-Type: application/json" -d "{\"email\": \"example@gmail.com\", \"password\": \"pwd123\"}"