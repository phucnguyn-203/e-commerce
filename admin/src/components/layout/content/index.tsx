import Header from "../header";
import styles from "./styles.module.css";

export default function Content({
    children,
}: {
    children: JSX.Element;
}): JSX.Element {
    return (
        <div className={styles.content}>
            <Header />
            <main className={`${styles.main} bg-bgPrimary`}>{children}</main>
        </div>
    );
}
