import React from "react";
import {  useForm } from "react-hook-form";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import { container, inputField, inputField2, inputField3, submitBtn } from "./FormRegister.module.css"
import { passwordRegex } from "../../utils/passwordRegex.js";
import { emailRegex } from "../../utils/emailRegex.js";
import axios from "axios";
import { alertcustom } from "../../utils/alertCustom.js";
import { messages } from "../../utils/message.js";

const BASE_URL= import.meta.env.VITE_BASE_URL;

export const FormRegister = () => {
    const form = useForm();
    const { register, control, handleSubmit, formState, watch } = form;
    const { errors } = formState;


    // const getAllUsers = async () =>{
    //     try {
    //         const response = await axios.get(`${URL_BASE}/users`)
    //         console.log(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    const onSubmit = async (data) =>{

        try {
            if (!passwordRegex.test(data.password)) {
                return alertcustom('La contraseña debe tener: una mayuscula, una minuscula, un numero, un caracter, min 8 caracteres', 'Error', 'warning')
            }
            alertcustom(messages.userSuccessful, messages.congratulations, 'success',console.log(data))
            
            console.log(BASE_URL);
        } catch (error) {
            console.log(error);
        }
        

        

        // formData.target.reset();
    };

    

  return (
    <Col id={container} className="container vh-50  w-100 d-flex justify-content-center" >
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center d-flex aling-items-center my- pb-3 border border-light border-0 border-bottom">
                <div className="ms-4 text-start">
                    <h1 className="display-5 fw-semibold text-black"> EncuestApp</h1>
                </div>
            </div>
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold text-black">Email</Form.Label>
                <Form.Control
                id={inputField}
                type="email" 
                placeholder="Email"
                className={errors.email?.message ? "is-invalid" : ""}
                {...register("email", {
                    required:{
                        value: true,
                        message: "Ingrese un email"
                    },
                    pattern:{
                        value: emailRegex,
                        message: "Ingrese un email valido"
                    }
                })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
            <Form.Label className="fw-bold text-black">Password</Form.Label>
            {/* <InputGroup className="mb-3"> */}
                <Form.Control
                id={inputField2}
                name="password"
                type="password"
                aria-describedby="passwordHelpBlock"
                placeholder="Password"
                className={errors.password?.message ? "is-invalid" : ""}
                {...register("password", {
                    required:{
                        value: true,
                        message: "La contraseña es requerida"
                    },
                    pattern: {
                        value: passwordRegex,
                        message: "Su contraseña debe contener como minimo 8 caracteres, una letra mayúscula, una minúscula, un numero, un caracter especial"
                    }
                })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                </Form.Control.Feedback>
            {/* </InputGroup> */}
            </Form.Group>

            <Form.Label className="fw-bold mt-3 text-black">Confirm Password</Form.Label>
            <InputGroup>
                <Form.Control
                id={inputField3}
                name="password"
                onPaste={(e) => e.preventDefault()}
                type="password"
                placeholder="Confirm Password"
                className={errors.confirmPassword?.message ? "is-invalid" : ""}
                {...register("confirmPassword", {
                    required: {
                        value: true,
                        message: "Campo requerido"
                    },
                    validate: (value) =>{
                        if (value == watch("password")) {
                            return true
                        }
                        return "Las contraseñas no coinciden"
                    },
                })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword?.message}
                </Form.Control.Feedback>
            </InputGroup>

            <Form.Group>
                <Form.Label className="fw-bold text-black">
                    Acepto terminos y condiciones
                </Form.Label>
                <input type="checkbox"/>
            </Form.Group>
            <Button

            id={submitBtn}
            className="mt-3" 
            variant="primary" 
            type="submit"> 
                Registrarme
            </Button>
        </Form>

    </Col>
  );
};
