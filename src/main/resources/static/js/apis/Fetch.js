import {showErrors, showError} from '../components/utils/PopupManager';
import {DELETE, POST, PUT} from './ApiConstants';
const CSRF_VERBS = [DELETE, POST, PUT];

class Fetch {
    fetch;

    static error(json) {
        if (json.errors !== null && json.errors !== undefined) {
            showErrors(json.errors);
        } else {
            showError(json)
        }
    }

    static isCORSUrlOk(url) {
        if ('http'.indexOf(url.toLowerCase()) == 0) {
            const host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
            return host.indexOf(url) == 0;
        }
        return true;
    }

    constructor(url, params) {
        params.credentials = 'include';
        if (CSRF_VERBS.indexOf(params.method) > -1 && Fetch.isCORSUrlOk(url)) {
            const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;
            if (params.headers == undefined) {
                params.headers = {};
            }
            params.headers[csrfHeader] = document.querySelector('meta[name="_csrf"]').content;
        }
        this.fetch = fetch(url, params)
            .then((response) => {
                      if (response.redirected) {
                          location.reload();
                      }
                      return response;
                  }
            )
            .catch((fetchError) => {
                       console.log(
                           'Error occured when fetching data: ' + fetchError.message
                       );
                   }
            );
    }

    then(success, error) {
        this.fetch.then(this.defaultErrorCallback(success, error));
        return this;
    }

    defaultErrorCallback(successMethod, error) {
        return (response) => {
            if (response.status === 302) {
                location.reload();
            }
            if (response.status === 200) {
                if (response.headers.has('Content-Type') &&
                    response.headers.get('Content-Type').includes('application/json')) {
                    return response.json().then((data) => successMethod(data));
                } else {
                    return successMethod();
                }
            } else {
                if (error != null && error != undefined) {
                    return error();
                }
                return response.json().then((json) => Fetch.error(json));
            }
        };
    }
}

export default Fetch;