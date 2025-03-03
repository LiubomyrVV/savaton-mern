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
import apiClient from "../../apiClient";
import { CustomNotify } from "../../components/common/CustomNotify";
import { Store } from "../../store";


interface FormData {
  name: string;
  email: string;
  password: string;
}

const RegisterModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { state } = useContext(Store)
  const onSubmit = async (data: FormData) => {
    if (Object.keys(errors).length > 0) {
        console.log("There are errors in the form:", errors);
        return; 
      }
    try {
      // Send the user data to the backend using axios
      const response = await apiClient.post("api/users/signup", data);

      if (response.status === 200) {
        CustomNotify('User registered successfully!', 'success')
        setTimeout(() => {
          CustomNotify('Verification message was sent to your email', 'warning', 3000)
        }, 2000)

        // Save user info to localstorage
        state.userInfo = response.data
        localStorage.setItem('userInfo', JSON.stringify(response.data))
        onClose(); // Close modal after successful submission
      } else {
        CustomNotify('Error registering user', 'warning')
      }
    } catch (error) {
      CustomNotify("Failed to register:", 'error');
    }
  };

  return (
    <Overlay>
      <Modal>
        <Title>Sign Up</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Please enter your name",  minLength: { value: 4, message: "Password must be at least 4 characters long" } })}
          />
          {errors.name && <Error>{errors.name.message}</Error>}

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

          <Button type="submit">Sign Up</Button>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Form>
      </Modal>
    </Overlay>
  );
};

export default RegisterModal;
