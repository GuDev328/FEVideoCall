import * as jwtDecode from "jwt-decode";

interface CustomJWT {
    payload: {
        userId: string;
    };
}

export const getMyUserId = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        return "acdsbfjasdkjklasjdahs";
    }
    const decodedToken = jwtDecode.jwtDecode<CustomJWT>(accessToken);
    return decodedToken.payload.userId;
};
