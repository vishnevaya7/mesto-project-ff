const token = 'da212393-1eb9-449c-8d8b-222ff76518eb';
const groupId = 'wff-cohort-35';
const url = `https://mesto.nomoreparties.co/v1/${groupId}`;

//{
//   name: 'Jacques Cousteau',
//   about: 'Sailor, researcher',
//   avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg',
//   _id: 'a29fe00f41e588cd2350ff01',
//   cohort: 'wff-cohort-35'
// }

export function getUserData(callback) {
    fetch(`${url}/users/me`, {
        headers: {
            authorization: token
        }
    })
        .then(res => res.json())
        .then(data => {
            callback(data);
        })
        .catch(err => {
            console.err(err);
        });
}

export function getCardsAndDoSomething(callback) {
    fetch(`${url}/cards`, {
        headers: {
            authorization: token
        }
    })
        .then(res => res.json())
        .then(data => {
            callback(data);
        })
        .catch(err => {
            console.log(err);
        });
}

export function sendUserData(name, about,callback) {
    fetch(`${url}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, about})
    })
        .then(res=> res.json())
        .then(data=>callback(data))
        .catch(err=>console.log(err));
}





