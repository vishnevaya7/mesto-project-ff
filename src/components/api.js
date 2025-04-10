const token = 'da212393-1eb9-449c-8d8b-222ff76518eb';
const groupId = 'wff-cohort-35';
const url = `https://mesto.nomoreparties.co/v1/${groupId}`;

function jsonOrReject(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function loadInitialData() {
    return Promise.all([
        fetch(`${url}/users/me`, {
            headers: {authorization: token}
        }).then(res => {
            return jsonOrReject(res)
        }),

        fetch(`${url}/cards`, {
            headers: {authorization: token}
        }).then(res => {
            return jsonOrReject(res)
        })
    ]);
}

export function sendUserData(name, about) {
    return fetch(`${url}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, about})
    }).then(res => {
        return jsonOrReject(res)
    })
}

export function sendNewCard(name, link) {
    return fetch(`${url}/cards`, {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(res => {
        return jsonOrReject(res)
    })
}

export function likeCardApi(card) {
    return fetch(`${url}/cards/likes/${card.id}`, {
            method: 'PUT',
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            },
        }
    ).then(res => {
        return jsonOrReject(res)
    })

}

export function deleteLikeCardApi(card) {
    return fetch(`${url}/cards/likes/${card.id}`, {
            method: 'DELETE',
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            },
        }
    ).then(res => {
        return jsonOrReject(res)
    })

}

export function deleteCardApi(card) {
    return fetch(`${url}/cards/${card.id}`, {
            method: 'DELETE',
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            },
        }
    )
}

export function changeAvatar(link) {
    return fetch(`${url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: link
        })
    }).then(res => {
            return jsonOrReject(res)
        })

}






