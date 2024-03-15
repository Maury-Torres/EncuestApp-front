import React, { useState } from 'react';
import { Container, Col, Form, Button, InputGroup, } from "react-bootstrap";
import { container, submitBtn, hiddenButton, inputField, inputField2 } from "../login/LoginUser1.module.css";
import { passwordRegex } from "../../utils/passwordRegex.js";
import { emailRegex } from "../../utils/emailRegex.js";
import { alertcustom } from '../../utils/alertCustom';
import { messages } from "../../utils/message.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from 'react-hook-form';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const LoginUser = () => {
  const form = useForm();
  const [errors] = useState({})
  const { register} = form;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!emailRegex.test(e.email)) {
        return alertcustom(
          "ingrese un email valido"
        )
      }

      if (!passwordRegex.test(e.password)) {
        return alertcustom(
          "La contraseña debe tener: una mayuscula, una minuscula, un numero, un caracter, min 8 caracteres",
          "Error",
          "warning"
        );
      }

      const response = await fetch(`${BASE_URL}/api/signin`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          "acces-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          email: e.email,
          password: e.password
        }),
      });

      if (response.status === 400) {
        return alertcustom('Logueado', messages.congratulations, "success");
      } else {
          // alertcustom(messages.userSuccessful, messages.congratulations, "success", ()=> {});
          Toast.fire({
            icon: "success",
            title: messages.userSuccessful
          })
      }
      // Procesar la respuesta del backend según corresponda
    } catch (error) {
      console.log(error);
      if (error.code == "ERR_NETWORK") {
        alertcustom('Error de red', 'Error', 'warning')
      }
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Col id={container} className="d-flex justify-content-center animate__animated animate__backInLeft"  >
      <Container>
        <div className="d-flex justify-content-center aling-items-center my-3 pb-3 border border-light border-0 border-bottom">
          <div className="ms-4 text-center">
            <h1 className="display-5 fw-semibold text-black"> Login</h1>
          </div>
        </div>

        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className='fw-bold text-black'>Email address</Form.Label>
            <Form.Control
              id={inputField}
              type="email"
              placeholder="Enter email"
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
            <Form.Control.Feedback type='invalid'>
              {errors.email?.message}
            </Form.Control.Feedback>
            <Form.Control.Feedback type='valid'>
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label className="fw-bold text-black">password</Form.Label>
            <InputGroup>
              <Form.Control
                id={inputField2}
                type={passwordVisible ? "text" : "password"}
                aria-describedby="passwordHelpBlock"
                placeholder="Password"
                name='password'
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

          <div className="fw-bold text-black">¿Todavía no te registraste?
            <a className="m-1" href="/register">Suscríbete ahora</a>
          </div>

          <Button
            id={submitBtn}
            className='my-3'
            variant="primary"
            type="submit">
            Iniciar sesión
          </Button>
        </Form>
      </Container>
    </Col>
  );
};

export default LoginUser;