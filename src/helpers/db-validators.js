import User from '../user/user.model.js'

export const emailExists = async (email = "") => {
    const existe = await User.findOne({ email })
    if (existe) {
        throw new Error(`Email: ${email}, is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({ username })
    if (existe) {
        throw new Error(`Username: ${username}, is already registered`)
    }
}

export const userExists = async (uid = "") => {
    const existe = await User.findById(uid)
    if (!existe) {
        throw new Error("The user with the entered ID does not exist")
    }
}
