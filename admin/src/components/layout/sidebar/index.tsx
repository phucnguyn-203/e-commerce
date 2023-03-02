import { logout } from "../../../api/userAPI";
import { redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { logoutUser } from "../../../features/user/userSlice";
import NavItem from "../../NavItem";

import {
    LightModeLogo,
    DarkModeLogo,
    IconDashboard,
    IconProduct,
    IconCategory,
    IconCustomer,
    IconOrder,
    IconSetting,
    IconLogout,
} from "../../icon";
import styles from "./styles.module.css";

export default function Sidebar({
    tabActive,
    onClickTab,
}: {
    tabActive: string;
    onClickTab: (tab: string) => void;
}): JSX.Element {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const handleLogout = async (): Promise<void> => {
        try {
            await logout();
            dispatch(logoutUser());
            redirect("/login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <aside className={`${styles.sidebar} bg-bgSecondary`}>
            <div className="cursor-pointer" onClick={() => onClickTab("")}>
                {user.theme === "light" ? <LightModeLogo /> : <DarkModeLogo />}
            </div>
            <div className="grow mt-8">
                <NavItem
                    title="Tổng Quan"
                    icon={<IconDashboard />}
                    isActive={tabActive === ""}
                    onClick={() => {
                        onClickTab("");
                    }}
                />
                <NavItem
                    title="Sản Phẩm"
                    icon={<IconProduct />}
                    isActive={tabActive === "products"}
                    onClick={() => {
                        onClickTab("products");
                    }}
                />
                <NavItem
                    title="Danh Mục"
                    icon={<IconCategory />}
                    isActive={false}
                    onClick={() => {}}
                />
                <NavItem
                    title="Khách Hàng"
                    icon={<IconCustomer />}
                    isActive={false}
                    onClick={() => {}}
                />
                <NavItem
                    title="Đơn Hàng"
                    icon={<IconOrder />}
                    isActive={false}
                    onClick={() => {}}
                />
                <NavItem
                    title="Cài Đặt"
                    icon={<IconSetting />}
                    isActive={false}
                    onClick={() => {}}
                />
            </div>
            <button
                onClick={handleLogout}
                className="px-5 py-3 bg-primary font-semibold rounded-lg text-white text-sm flex items-center justify-center"
            >
                <div className="text-xl">
                    {" "}
                    <IconLogout />
                </div>
                <span className="ml-4">Đăng Xuất</span>
            </button>
        </aside>
    );
}
