from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      
    allow_credentials=True,
    allow_methods=["*"],       
    allow_headers=["*"],
)


names_db = []

class NameRequest(BaseModel):
    name: str

@app.post("/api/names")
def add_name(request: NameRequest):
    name = request.name.strip()
    if not name:
        return {"success": False, "message": "Name must be a non-empty string"}
    names_db.append(name)
    return {"success": True, "message": "Name stored successfully"}

@app.get("/api/names")
def get_names():
    return {"success": True, "names": names_db}

@app.delete("/api/names")
def clear_all_names():
    global names_db
    names_db = []
    return {"success": True, "message": "All names cleared"}

