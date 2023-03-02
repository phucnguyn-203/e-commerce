import React from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hook";
import { changeTheme } from "../../../features/user/userSlice";
import ProfileAvatar from "../../profileAvatar";
import { IconNight, IconLight, IconNotification } from "../../icon";
import styles from "./styles.module.css";

export default function Header(): JSX.Element {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        const root = document.documentElement;
        if (user.theme === "dark") {
            root.classList.remove("light");
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            root.classList.add("light");
            localStorage.setItem("theme", "light");
        }
    }, [user.theme]);

    return (
        <header className={`${styles.header} text-primary bg-bgSecondary`}>
            <ul className="flex items-center cursor-pointer">
                <li
                    className="ml-6"
                    onClick={() =>
                        dispatch(
                            changeTheme(
                                user.theme === "light" ? "dark" : "light"
                            )
                        )
                    }
                >
                    {user.theme === "light" ? <IconNight /> : <IconLight />}
                </li>
                <li className="ml-6">
                    <IconNotification />
                </li>
                <li className="ml-6">
                    <ProfileAvatar
                        url={user.userInfo?.photo as string}
                        size={32}
                        isActive={false}
                    />
                </li>
            </ul>
        </header>
    );
}
