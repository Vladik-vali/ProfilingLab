import http from 'k6/http';
import { check } from 'k6';

const baseUrl = __ENV.BASE_URL || 'http://localhost:5284';
const vus = Number(__ENV.VUS || 5);

export const options = {
    vus: vus,
    duration: '45s',
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<300'],
        checks: ['rate>0.99'],
    },
};

export default function () {
    const response = http.get(`${baseUrl}/weatherforecast`);

    check(response, {
        'status is 200': r => r.status === 200,
        'response is not empty': r => r.body !== null && r.body.length > 0,
    });
}