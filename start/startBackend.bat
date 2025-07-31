cd /d "%~dp0"
cd ..
cd backend
python -m uvicorn main:app --reload