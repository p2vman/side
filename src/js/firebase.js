const firebaseConfig = {
    apikey: "AIzaSyDAm335ajxnMu97kiO0AcVspduHFfrlAUE",
    id: "dexdb-86a53"
}

const urls = {
    signUp :  `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apikey}`,
    signInWithPassword : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apikey}`,
    dbUrl : `https://dexdb-86a53-default-rtdb.firebaseio.com`
}

async function register(email, password, callback) {
    const authResponse = await fetch(urls.signUp, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true })
    });

    const authData = await authResponse.json();
    if (!authResponse.ok) {
        callback(data.error.message)
        return;
    }

    callback({
        userId : authData.localId,
        token : authData.idToken
    })
}

async function login(email, password, callback) {
    const response = await fetch(urls.signInWithPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true })
    });

    const data = await response.json();
    if (response.ok) {
        callback({
            userId : data.localId,
            token : data.idToken
        })
    } else {
        callback(data.error.message)
    }
}