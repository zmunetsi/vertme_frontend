

export async function getCurrentUser(token) {

    const user = await fetch(
        'https://pure-river-91014.herokuapp.com/api/user',
        //'http://127.0.0.1:8000/api/user',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).then(res => res.json()).catch(error => {
        if (error.response) {
            console.log("error1", error.response.data);
          } else if (error.request) {
            console.log('Erro1', error.request);
          } else {
            console.log('Error', error.message);
          }
    });

    return user;
}

