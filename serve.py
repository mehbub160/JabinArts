#!/usr/bin/env python3
"""Tiny static server for local development — disables caching."""
import http.server

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Expires", "0")
        super().end_headers()

if __name__ == "__main__":
    import os, sys
    port = int(sys.argv[1] if len(sys.argv) > 1 else os.environ.get("PORT", 4173))
    http.server.test(HandlerClass=NoCacheHandler, port=port, bind="127.0.0.1")
