const token = 'da212393-1eb9-449c-8d8b-222ff76518eb';
const groupId = 'wff-cohort-35';
const url = `https://mesto.nomoreparties.co/v1/${groupId}`;

export function loadInitialData() {
    return Promise.all([
        fetch(`${url}/users/me`, {
            headers: { authorization: token }
        }).then(res => res.json()),

        fetch(`${url}/cards`, {
            headers: { authorization: token }
        }).then(res => res.json())
    ]);
}

export function sendUserData(name, about, callback, unblockButton) {
    fetch(`${url}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, about})
    })
        .then(res => res.json())
        .then(data => callback(data))
        .catch(err => console.log(err))
        .finally(() => {
            unblockButton()
        })

}

export function sendNewCard(name, link, callback, unblockButton) {
    fetch(`${url}/cards`, {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(res => res.json())
        .then(data => {
            callback(data);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            unblockButton()
        })
}


export function likeCardApi(card, callback) {
    fetch(`${url}/cards/likes/${card.id}`, {
            method: 'PUT',
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            },
        }
    )
        .then(res => res.json())
        .then(data => {
            callback(data);
        })
        .catch(err => {
            console.log(err);
        });
}

export function deleteLikeCardApi(card, callback) {
    fetch(`${url}/cards/likes/${card.id}`, {
            method: 'DELETE',
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            },
        }
    )
        .then(res => res.json())
        .then(data => {
            callback(data);
        })
        .catch(err => {
            console.log(err);
        });
}

export function deleteCardApi(card, callback) {
    fetch(`${url}/cards/${card.id}`, {
            method: 'DELETE',
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            },
        }
    )
        .then(res => {
                if (res.ok) {
                    callback(card);
                }
            }
        )

        .catch(err => {
            console.log(err);
        });
}

export function changeAvatar(link, callback, unblockButton) {
    fetch(`${url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: link
        })
    })
        .then(res => res.json())
        .then(data => {
            callback(data);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            unblockButton()
        })
}






