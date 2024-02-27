import React from "react";
import {  useForm } from "react-hook-form";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import { container, inputField, submitBtn } from "./FormRegister.module.css"
import { passwordRegex } from "../../utils/passwordRegex.js";
import { emailRegex } from "../../utils/emailRegex.js";
import axios from "axios";


const BASE_URL= import.meta.VITE_BASE_URL;

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


    const onSubmit = async (formData) =>{


        if (!passwordRegex.test(formData.password)) {
            return alert('La contraseña debe tener: una mayuscula, una minuscula, un numero, un caracter, min 8 caracteres');
        }

        console.log(formData)
        console.log(BASE_URL);
    };

    

  return (
    <Col id={container} className="container vh-100 mt-5 w-100 d-flex justify-content-center" >
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center d-flex aling-items-center my- pb-3 border border-light border-0 border-bottom">
                <div className="ms-4 text-start">
                    <h1 className="display-5 fw-semibold"> Encuestaap</h1>
                </div>
            </div>
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Email</Form.Label>
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
            <Form.Label className="fw-bold">Password</Form.Label>
            {/* <InputGroup className="mb-3"> */}
                <Form.Control
                id={inputField}
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

            <Form.Label className="fw-bold mt-3">Confirm Password</Form.Label>
            <InputGroup>
                <Form.Control
                id={inputField}
                name="password"
                onPaste={(e) => e.preventDefault()}
                type="password"
                placeholder="Confirm Password"
                className={errors.confirmPassword?.message ? "is-invalid" : ""}
                {...register("confirmPassword", {
                    required: {
                        value: true,
                        message: "La contraseña no coinciden"
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
                <Form.Label>
                    Acepto terminos y condiciones
                </Form.Label>
                <input type="checkbox" />
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
