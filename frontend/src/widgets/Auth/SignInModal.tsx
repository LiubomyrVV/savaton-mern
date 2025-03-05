import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {
  Overlay,
  Modal,
  Title,
  Form,
  Input,
  Error,
  Button,
  CloseButton,
} from "./index.styled";

import { CustomNotify } from "../../components/common/CustomNotify";
import { Store } from "../../store";
import { signin } from "../../services/signin"; 

interface FormData {
  email: string;
  password: string;
}

const SignInModal: React.FC<{ registerModal: (arg: boolean) => void, loginModal: (arg: boolean) => void  }> = ({ registerModal, loginModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { state } = useContext(Store);

  const onSubmit = async (data: FormData) => {
    if (Object.keys(errors).length > 0) {
      console.log("There are errors in the form:", errors);
      return;
    }
    try {
      const response = await signin(data);

      if (response.status === 200) {
        CustomNotify('User  signed in successfully!', 'success');
        // Save user info to localstorage
        state.userInfo = response.data;
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        loginModal(false); 
      } else {
        CustomNotify('Error signing in user', 'warning');
      }
    } catch (error) {
      CustomNotify("Failed to sign in:", 'error');
    }
  };

  return (
    <Overlay>
      <Modal>
        <Title>Sign In</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            placeholder="Email"
            {...register("email", { 
              required: "Please enter your email", 
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 
                message: "Please enter a valid email address" 
              }
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}

          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Please enter your password", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
          />
          {errors.password && <Error>{errors.password.message}</Error>}

          <Button type="submit">Sign In</Button>
          <div onClick={() => {
            loginModal(false)
            registerModal(true)
            }} style={{color: '#fff', textAlign:'right', cursor: 'pointer'}}>Sign up</div>
          <CloseButton onClick={() => loginModal(false) }>×</CloseButton>
        </Form>
      </Modal>
    </Overlay>
  );
};

export default SignInModal;