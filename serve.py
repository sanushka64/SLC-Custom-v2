"""Serve the static dashboard showcase to this computer only."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os

PORT = int(os.environ.get("PORT", "8080"))
os.chdir(Path(__file__).resolve().parent)

if __name__ == "__main__":
    with ThreadingHTTPServer(("127.0.0.1", PORT), SimpleHTTPRequestHandler) as server:
        print(f"Sri Lanka Customs showcase: http://127.0.0.1:{PORT}/")
        print("Press Ctrl+C to stop.")
        server.serve_forever()
