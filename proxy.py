from http.server import HTTPServer, BaseHTTPRequestHandler
from io import BytesIO

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        response = BytesIO()
        response.write(b'This is a reverse proxy server.')
        self.wfile.write(response.getvalue())

    def log_message(self, format, *args):
        with open("requests.log", "a") as f:
            f.write("%s - - [%s] %s\n" % (self.address_string(), self.log_date_time_string(), format%args))

httpd = HTTPServer(('localhost', 8080), SimpleHTTPRequestHandler)
httpd.serve_forever()