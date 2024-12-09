import CommonForm, { AuthFormData } from "@/components/common/form";
import { loginFormControls } from "@/components/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { AppDispatch } from "@/store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState: AuthFormData = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState<AuthFormData>(initialState);
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();

  function formValidHandler() {
    return formData.email.trim() !== "" && formData.password.trim() !== "";
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign In to your account
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
        isButtonDisabled={!formValidHandler()}
      />
    </div>
  );
}

export default AuthLogin;
