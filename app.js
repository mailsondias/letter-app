/**
 * Letter app v2
 */

const api_users = 'https://jsonplaceholder.typicode.com/users'
const api_posts = 'https://jsonplaceholder.typicode.com/posts'

const app = document.querySelector('#app')

const Letter = {
    get: async () => {
        try {
            const users = await getUsers()

            for (let i = 0; i < users.length; i++) {
                const arrPosts = await getUserPosts(users[i].id)
                users[i].posts = [...arrPosts]
            }

            return users
        } catch (err) {
            console.error(err)
        }
    }
}

async function onMounted() {
    const letterUsers = await Letter.get()
    app.innerHTML = `<pre>${JSON.stringify(letterUsers, null, 2)}</pre><br />`
}

async function getUsers() {
    const res = await fetch(api_users)
    return await res.json()
}

async function getUserPosts(userId) {
    const res = await fetch(`${api_users}/${userId}/posts`)
    return await res.json()
}