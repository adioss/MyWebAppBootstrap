export default function sanitize(body) {
    if (body.intl != null) {
        delete body.intl;
    }
    return JSON.stringify(body);
}
