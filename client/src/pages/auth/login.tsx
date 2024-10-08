import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/components/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};
type FormValues = typeof initialState;

function AuthLogin() {
  const [formData, setFormData] = useState<FormValues>(initialState);

  function submitHandler() {}
  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sihn In to your account
        </h1>
        <p className="mt-2 ">
          Don't Have an account
          <Link
            className="font-medium text-primary hover:underline ml-2"
            to="/auth/register"
          >
            Sign Up
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={submitHandler}
      />
    </div>
  );
}

export default AuthLogin;
