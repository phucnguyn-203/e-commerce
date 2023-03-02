import React from "react";
import { RouterProvider } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./app/hook";
import { setUserSuccess, setUserFail } from "./features/user/userSlice";
import { UserResponse } from "./common/model";
import { checkIsLogin } from "./api/userAPI";
import Loading from "./components/loading";
import router from "./router";

export default function App(): JSX.Element {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        const getUser = async () => {
            try {
                const response: UserResponse = await checkIsLogin();
                dispatch(setUserSuccess(response.data.user));
            } catch (err) {
                dispatch(setUserFail());
            }
        };
        getUser();
    }, []);

    return (
        <React.Fragment>
            {user.isLoading ? <Loading /> : <RouterProvider router={router} />}
        </React.Fragment>
    );
}
