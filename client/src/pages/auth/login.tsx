import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/components/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { AppDispatch } from "@/store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};
type FormValues = typeof initialState;

function AuthLogin() {
  const [formData, setFormData] = useState<FormValues>(initialState);
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();

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
      console.log(data);
    });
  }
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
