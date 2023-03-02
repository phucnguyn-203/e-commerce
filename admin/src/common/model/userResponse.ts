import User from "./user";

interface UserResponse {
    status: string,
    data: {
        user: User
    }
}

export default UserResponse;