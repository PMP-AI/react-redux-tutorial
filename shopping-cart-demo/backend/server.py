# backend/server.py
import json
import os
import time
import threading
import logging
from pathlib import Path
from flask import Flask, request, jsonify, g
from flask_cors import CORS

PORT = int(os.environ.get("PORT", "3001"))
DELAY_MS = int(os.environ.get("DELAY_MS", "1200"))
DB_PATH = (Path(__file__).resolve().parents[1] / "db.json")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173", "*"]}})
_lock = threading.Lock()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler(Path(__file__).with_name("server.log"), encoding="utf-8")
    ],
)

def _sleep():
    time.sleep(DELAY_MS / 1000.0)

def _load_db():
    if not DB_PATH.exists():
        return {"products": [], "orders": []}
    with _lock:
        with DB_PATH.open("r", encoding="utf-8") as f:
            return json.load(f)

def _save_db(db):
    with _lock:
        # 保證結構正確
        if not isinstance(db.get("orders", []), list):
            db["orders"] = []
        if not isinstance(db.get("products", []), list):
            db["products"] = []
        with DB_PATH.open("w", encoding="utf-8") as f:
            json.dump(db, f, ensure_ascii=False, indent=2)

def _next_id(records):
    """從現有 records 取出最大 id（容忍 '1' 這類字串），回傳下一個整數 id。"""
    max_id = 0
    for r in records or []:
        try:
            v = int(r.get("id", 0))
            if v > max_id:
                max_id = v
        except (TypeError, ValueError):
            # 忽略非數字 id
            continue
    return max_id + 1

@app.before_request
def _log_req():
    g._t0 = time.time()
    try:
        body = request.get_json(silent=True)
    except Exception:
        body = None
    logging.info("[REQ] %s %s body=%s", request.method, request.path, body)

@app.after_request
def _log_res(resp):
    dt = (time.time() - getattr(g, "_t0", time.time())) * 1000
    logging.info("[RES] %s %s status=%s time=%.1fms",
                 request.method, request.path, resp.status_code, dt)
    return resp

@app.get("/health")
def health():
    return "ok", 200

@app.get("/products")
def get_products():
    try:
        _sleep()
        db = _load_db()
        return jsonify(db.get("products", [])), 200
    except Exception:
        logging.exception("GET /products failed")
        return jsonify({"message": "Internal server error"}), 500

@app.get("/products/<int:item_id>")
def get_product(item_id: int):
    try:
        _sleep()
        db = _load_db()
        for p in db.get("products", []):
            if int(p.get("id")) == item_id:
                return jsonify(p), 200
        return jsonify({"message": "Product not found"}), 404
    except Exception:
        logging.exception("GET /products/<id> failed")
        return jsonify({"message": "Internal server error"}), 500

@app.get("/orders")
def get_orders():
    try:
        _sleep()
        db = _load_db()
        orders = db.get("orders", [])
        if not isinstance(orders, list):
            orders = []
        return jsonify(orders), 200
    except Exception:
        logging.exception("GET /orders failed")
        return jsonify({"message": "Internal server error"}), 500

@app.post("/orders")
def create_order():
    try:
        _sleep()
        body = request.get_json(silent=True) or {}
        db = _load_db()

        # 保障 orders 結構
        orders = db.get("orders")
        if not isinstance(orders, list):
            orders = []
            db["orders"] = orders

        # 指派新 id（容忍舊資料的字串 id）
        body["id"] = _next_id(orders)

        orders.append(body)
        _save_db(db)
        return jsonify(body), 201
    except Exception:
        logging.exception("POST /orders failed")
        return jsonify({"message": "Internal server error"}), 500

if __name__ == "__main__":
    # Windows 若檔案設為唯讀會寫檔失敗，可先移除唯讀屬性或以管理員身份執行
    app.run(host="0.0.0.0", port=PORT, debug=True)
