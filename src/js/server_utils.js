const SERVER_ADDRESS =  '127.0.0.1:8000';

export function make_full_address(address, protocol='http'){
    return protocol + '://' + SERVER_ADDRESS + '/' + address;
}

export function get_access_token(store){
    let token = store.getters.accessToken;
    if(token === null){
        let stored_token = localStorage.getItem('access_token');
        if(stored_token !== null){
            store.dispatch('SET_ACCESS_TOKEN', stored_token);
            return stored_token;
        }
    }
    return token;
}

export function get_refresh_token(store){
    let token = store.getters.refreshToken;
    if(token === null){
        let stored_token = localStorage.getItem('refresh_token');
        if(stored_token != null){
            store.dispatch('SET_REFRESH_TOKEN', stored_token);
            return stored_token;
        }
    }
    return token;
}

export function set_access_token(store, token){
    localStorage.setItem('access_token', token);
    store.dispatch('SET_ACCESS_TOKEN', token);
}

export function set_refresh_token(store, token){
    localStorage.setItem('refresh_token', token);
    store.dispatch('SET_REFRESH_TOKEN', token);
}

export function delete_access_token(store){
    localStorage.removeItem('access_token');
    store.dispatch('SET_ACCESS_TOKEN', null);
}

export function delete_refresh_token(store){
    localStorage.removeItem('refresh_token');
    store.dispatch('SET_REFRESH_TOKEN', null);
}

export function refresh_tokens(store, http, on_refreshed){
    if(store.getters.refreshToken){
        http.post(make_full_address("api/token/refresh"), {'refresh': store.getters.refreshToken}).then(
            function(response){
                if(response.status == 200 && response.data && response.data.access){
                    set_access_token(store, response.data.access);
                    if(response.data.refresh){
                        set_refresh_token(store, response.data.refresh);
                    }
                    on_refreshed();
                }else{
                    do_logout(store);
                }
            }
        ).catch(
            function(){
                do_logout(store);
            }
        );
    }
}

export function auth_header(store){
    const headers = {'Authorization': 'Bearer ' + get_access_token(store)};
    return headers;
}

export function auth_get(store, http, address, on_success, on_error, params={}){
    const headers = auth_header(store);
    http.get(make_full_address(address), {headers, params}).then(on_success).catch(error => {
        if(error.response && error.response.status == 401){
            refresh_tokens(store, http, function(){
                const headers = auth_header(store);
                http.get(make_full_address(address), {headers, params}).then(on_success).catch(on_error);
            });
        }else{
           on_error(error);
        }
    });
}

export function auth_post(store, http, address, data, on_success, on_error, params={}){
    const headers = auth_header(store);
    http.post(make_full_address(address), data, {headers, params}).then(on_success).catch(error => {
        if(error.response && error.response.status == 401){
            refresh_tokens(store, http, function(){
                const headers = auth_header(store);
                http.post(make_full_address(address), data, {headers, params}).then(on_success).catch(on_error);
            });
        }else{
           on_error(error);
        }
    });
}

export function auth_delete(store, http, address, on_success, on_error, params={}){
    const headers = auth_header(store);
    http.delete(make_full_address(address), {headers, params}).then(on_success).catch(error => {
        if(error.response && error.response.status == 401){
            refresh_tokens(store, http, function(){
                const headers = auth_header(store);
                http.delete(make_full_address(address), {headers, params}).then(on_success).catch(on_error);
            });
        }else{
           on_error(error);
        }
    });
}

export function auth_patch(store, http, address, data, on_success, on_error, params={}){
    const headers = auth_header(store);
    http.patch(make_full_address(address), data, {headers, params}).then(on_success).catch(error => {
        if(error.response && error.response.status == 401){
            refresh_tokens(store, http, function(){
                const headers = auth_header(store);
                http.patch(make_full_address(address), data, {headers, params}).then(on_success).catch(on_error);
            });
        }else{
           on_error(error);
        }
    });
}

export function update_curuser_id(store, http, on_success = null, on_error = null){
    auth_get(store, http, "api/user/", response => {
        if(response.status == 200 && response.data){
          let data = response.data;
          store.dispatch('SET_CUR_USER_ID', data.pk);
          if(on_success){
            on_success();
          }
        }
      }, error => {
        if(on_error){
            on_error(error);
        }
      });       
}

export function update_is_admin(store, http, on_success = null, on_error = null){
    auth_get(store, http, "api/user/", response => {
        if(response.status == 200 && response.data){
          let data = response.data;
          store.dispatch('SET_ADMIN', data.is_staff);
          if(on_success){
            on_success();
          }
        }
      }, error => {
        if(on_error){
            on_error(error);
        }
      });       
}

export function is_logged_in(store){
    return (get_access_token(store) !== null) && (get_refresh_token(store) !== null);
}

export function do_logout(store){
    delete_refresh_token(store);
    delete_access_token(store);
    store.dispatch('SET_CUR_USER_ID', null);
}

export function is_cur_user(store, user_id){
    return store.state.cur_user_id === user_id;
}
