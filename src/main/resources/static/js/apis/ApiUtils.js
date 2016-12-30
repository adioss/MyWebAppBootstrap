export function createListParams(page, sort) {
    let urlParams = '';
    if (page != null) {
        urlParams += 'page=' + page;
    }
    if (sort != null) {
        urlParams += 'sort=' + sort;
    }
    if (urlParams != '') {
        urlParams = '/?' + urlParams;
    }
    return urlParams;
}
