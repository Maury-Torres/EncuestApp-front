import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import {
  container,
  inputFieldName,
  inputField,
  inputField2,
  inputField3,
  submitBtn,
  hiddenButton,
  hiddenButtonConfirm,
} from "./FormRegister.module.css";
import { passwordRegex } from "../../utils/passwordRegex.js";
import { emailRegex } from "../../utils/emailRegex.js";
import { alertcustom } from "../../utils/alertCustom.js";
import { messages } from "../../utils/message.js";
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const FormRegister = () => {
  const form = useForm();
  const { register, control, handleSubmit, formState, watch } = form;
  const { errors } = formState;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisibleConfirm, setPasswordVisibleConfirm] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibilityConfirm = () => {
    setPasswordVisibleConfirm(!passwordVisibleConfirm);
  };

  const onSubmit = async (data) => {
    try {
        if (!passwordRegex.test(data.password)) {
          return alertcustom(
            "La contraseña debe tener: una mayuscula, una minuscula, un numero, un caracter, min 8 caracteres",
            "Error",
            "warning"
          );
        }

        const response = await fetch(`${BASE_URL}/api/signup`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              username: data.userName,
              email: data.email,
              password: data.password,
              confirmPassword: data.confirmPassword
              }),
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
            });

        if (response.status === 400) {
          return alertcustom('', messages.emailRegister, "error");
        } else {
          alertcustom(messages.userSuccessful, messages.congratulations, "success", ()=> {window.location.href = "/home"});
        }
      } 
      catch (error) {
        console.log(error);
        if (error.code == "ERR_NETWORK") {
          alertcustom('Error de red','Error','warning')
        }
      }
  };

  return (
    <Col
      id={container}
      className=" d-flex justify-content-center animate__animated animate__backInDown"
    >
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center aling-items-center  pb-3 border border-light border-0 border-bottom">
          <div className="ms-4 text-start">
            <h1 className="display-5 fw-semibold text-black"> EncuestApp </h1>
          </div>
        </div>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold text-black">Nombre</Form.Label>
          <Form.Control
            id={inputFieldName}
            type="text"
            placeholder="Ingrese su nombre"
            className={errors.userName?.message ? "is-invalid" : ""}
            {...register("userName", {
              required: {
                value: true,
                message: "Ingrese un nombre",
              },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold text-black">Email</Form.Label>
          <Form.Control
            id={inputField}
            type="email"
            placeholder="Email"
            className={errors.email?.message ? "is-invalid" : ""}
            {...register("email", {
              required: {
                value: true,
                message: "Ingrese un email",
              },
              pattern: {
                value: emailRegex,
                message: "Ingrese un email valido",
              },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label className="fw-bold text-black">Password</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              id={inputField2}
              name="password"
              type={passwordVisible ? "text" : "password"}
              aria-describedby="passwordHelpBlock"
              placeholder="Password"
              className={errors.password?.message ? "is-invalid" : ""}
              {...register("password", {
                required: {
                  value: true,
                  message: "La contraseña es requerida",
                },
                pattern: {
                  value: passwordRegex,
                  message:
                    "Su contraseña debe contener como minimo 8 caracteres, una letra mayúscula, una minúscula, un numero, un caracter especial",
                },
              })}
              />
              <div className="input-group-append">
                <button
                  id={hiddenButton}
                  type="button"
                  className="toggle-password-visibility"
                  onClick={togglePasswordVisibility}
                  >
                  <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                </button>
              </div>
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Label className="fw-bold mt-3 text-black">
          Confirm Password
        </Form.Label>
        <InputGroup>
          <Form.Control
            id={inputField3}
            name="password"
            onPaste={(e) => e.preventDefault()}
            type={passwordVisibleConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            className={errors.confirmPassword?.message ? "is-invalid" : ""}
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              validate: (value) => {
                if (value == watch("password")) {
                  return true;
                }
                return "Las contraseñas no coinciden";
              },
            })}
            />
            <div>
              <button
                id={hiddenButtonConfirm}
                type="button"
                className="toggle-password-visibility"
                onClick={togglePasswordVisibilityConfirm}
                >
                <FontAwesomeIcon
                  icon={passwordVisibleConfirm ? faEye : faEyeSlash}
                />
              </button>
            </div>
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword?.message}
          </Form.Control.Feedback>
        </InputGroup>

        <Button id={submitBtn} className="mt-3" variant="primary" type="submit">
          Registrarse
        </Button>
      </Form>
    </Col>
  );
};
