import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/sidebar";
import Content from "../../components/layout/content";

import styles from "./styles.module.css";

export default function Root(): JSX.Element {
    const [tabActive, setTabActive] = React.useState<string>("");
    const navigate = useNavigate();

    React.useEffect(() => {
        navigate(tabActive, { replace: true });
    }, [tabActive, navigate]);

    return (
        <div className={`${styles.app}`}>
            <Sidebar tabActive={tabActive} onClickTab={setTabActive} />
            <Content>
                <Outlet />
            </Content>
        </div>
    );
}
