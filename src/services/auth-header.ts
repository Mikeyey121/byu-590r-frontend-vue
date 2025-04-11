export default function authHeader(type: string | null | undefined = null) {
    let user
    if (localStorage.getItem("user")) {
        user = localStorage.getItem("user")
    }

    if (user && user !== null && user !== undefined) {
        user = JSON.parse(user)
    }

    if (user && user.token) {
        if (type === "multipart") {
            return {
                Authorization: "Bearer " + user.token,
                "Content-Type": "multipart/form-data"
            }
        }
        return { Authorization: "Bearer " + user.token }
    } else {
        return {}
    }
}