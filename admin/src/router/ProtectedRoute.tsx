import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hook";

export default function ProtectedRoute({
    children,
}: {
    children: JSX.Element;
}): JSX.Element {
    const user = useAppSelector((state) => state.user);
    return !user.isLogin || user.userInfo?.role !== "admin" ? (
        <Navigate to="/login" />
    ) : (
        children
    );
}
