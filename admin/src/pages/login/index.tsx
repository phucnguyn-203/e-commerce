import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../app/hook";
import { setUserSuccess } from "../../features/user/userSlice";
import { UserResponse } from "../../common/model";
import { loginUser } from "../../api/userAPI";
import schema from "../../utils/schemaValidationLoginForm";
import styles from "./styles.module.css";
import login from "../../assets/img/login-office.c7786a89.jpeg";

export interface FormData {
    email: string;
    password: string;
}

export default function Login(): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const [error, setError] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData): Promise<void> => {
        try {
            const response: UserResponse = await loginUser(data);
            navigate("/");
            dispatch(setUserSuccess(response.data.user));
        } catch (err) {
            setError(true);
        }
    };
    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                <div className="w-1/2">
                    <img
                        src={login}
                        alt="login.jpeg"
                        className="w-full h-full object-cover inline-block"
                    />
                </div>
                <div className="w-1/2 p-12">
                    <div className="h-full">
                        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                            Đăng Nhập
                        </h1>
                        {error && (
                            <div className="my-4 py-3 px-4 bg-red-100 border-[1px] border-[#ff424f33]">
                                <p className="text-[#222222]">
                                    Đăng nhập không thành công Email hoặc mật
                                    khẩu không đúng
                                </p>
                            </div>
                        )}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-6">
                                <label
                                    htmlFor="email"
                                    className="block text-sm text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    {...register("email")}
                                    id="email"
                                    type="email"
                                    placeholder="admin@gmail.com"
                                    className="block w-full h-12 px-3 py-1 text-sm rounded-md border-[1px] border-gray-200 bg-gray-100 focus:outline-none focus:bg-transparent"
                                />
                                {errors?.email && (
                                    <p className="text-red-500 text-sm">
                                        {errors?.email?.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="password"
                                    className="block text-sm text-gray-700"
                                >
                                    Mật Khẩu
                                </label>
                                <input
                                    {...register("password")}
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    className="block w-full h-12 px-3 py-1 text-sm rounded-md border-[1px] border-gray-200 bg-gray-100 focus:outline-none focus:bg-transparent"
                                />
                                {errors?.password && (
                                    <p className="text-red-500 text-sm">
                                        {errors?.password?.message}
                                    </p>
                                )}
                            </div>
                            <button className="w-full bg-primary text-white text-sm py-4 rounded-md">
                                Đăng Nhập
                            </button>
                            <hr className="my-10" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
