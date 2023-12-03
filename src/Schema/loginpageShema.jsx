import * as yup from "yup";

const passwordRule = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

const SignUpShema = yup.object().shape({
  email: yup.string().email("please enter valid Email").required("Required"),
  fname: yup.string().required("Required"),
  lname: yup.string().required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRule, { message: "suggest the strong password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "not macted the password")
    .required("Requird"),
});
export default SignUpShema;

export const loginShema = yup.object().shape({
  email: yup.string().email("please enter valid Email").required("Required"),
  password: yup
    .string()
    .min(8, "Password invalid")
    .matches(passwordRule, { message: "Password invalid" })
    .required("Required"),
});
