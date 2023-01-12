/**
 * Letter app
 */

const api_users = 'https://jsonplaceholder.typicode.com/users'
const api_posts = 'https://jsonplaceholder.typicode.com/posts'

const app = document.querySelector('#app')

let users = []

async function Letter() {
    users = await getUsers()
}

async function getUsers() {
    fetch(api_users)
        .then(res => res.json())
        .then(arrUsers => {
            arrUsers.forEach(user => {

                fetch(api_users + '/' + user.id + '/posts')
                    .then(res2 => res2.json())
                    .then(arrPosts => {
                        user.posts = arrPosts

                        app.innerHTML = app.innerHTML + `<pre>${JSON.stringify(user, null, 2)}</pre><br>`
                    })
                    .catch(err => console.log(err))

            })

            return arrUsers
        })
        .catch(err => console.log(err))
}

Letter()