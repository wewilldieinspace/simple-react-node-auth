export interface AuthContextI {
    username: UserDataT,
    token: UserDataT,
    login: (username: UserDataT, token: UserDataT) => void,
    logout: () => void
}

type UserDataT = string | null