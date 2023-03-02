import * as Yup from "yup";

const schema = Yup.object().shape({
    email: Yup.string().required("Vui lòng điền email của bạn").email("Vui lòng điền đúng định dạng Email"),
    password: Yup.string().required("Vui lòng điền mật khẩu"),
});

export default schema;