const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const csrfProtection = csrf({ cookie: true });


// Pengecualian CSRF untuk endpoint tertentu
const csrfExemptRoutes = ['/api/api-midtrans/handle-notification']; // Daftar route yang dikecualikan dari CSRF


module.exports = {
    csrfProtection,
    cookieParser,
};