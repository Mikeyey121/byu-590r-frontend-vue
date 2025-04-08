let API_URL = '{{BACKEND-AWS-URL-HERE}}/api/';
// elastic-ip-address:8888/api/
if (import.meta.env.MODE === 'development') {
    API_URL = 'http://127.0.0.1:8000/api/';
}
export default API_URL;