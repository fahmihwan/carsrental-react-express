const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const csrfProtection = csrf({ cookie: true });


// Pengecualian CSRF untuk endpoint tertentu
// const csrfExemptRoutes = ['/api/api-midtrans/handle-notification']; // Daftar route yang dikecualikan dari CSRF

// const csrfMiddleware = () => {
//     return (req, res, next) => {
//         if (csrfExemptRoutes.includes(req.path)) {
//             // Skip CSRF protection for excluded routes
//             return next();
//         }
//         csrfProtection(req, res, next);
//     };
// };



module.exports = {
    csrfProtection,
    cookieParser,
};