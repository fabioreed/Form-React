import React, { useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import './App.css';

import Input from './components/Form/Input';

const initialData = {
  email: 'fabioeeereed@gmail.com',
  addres: {
    city: 'Campinas',
  }
}

function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatório'),
      email: Yup.string()
          .email('Digite um e-mail valido')
          .required('O e-mail é obrigatório'),
      address: Yup.object().shape({
        city: Yup.string()
            .min(3, 'No minimo 3 caracteres')
            .required('A cidade é obrigatória')
      })
    });

  await schema.validate(data, {
  abortEarly: false,
  })
    
    console.log(data);

    formRef.current.setErrors({});


    reset();
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const errorMessages = {};

      err.inner.forEach(error => {
        errorMessages[error.path] = error.message;
      })

      formRef.current.setErrors(errorMessages);
    }
  }
  }

useEffect(() => {
  setTimeout(() => {
    formRef.current.setData({
      name: 'Fabio Luiz',
      email: 'fabioeeereed@gmail.com',
      address: {
        city: 'CG'
      }
    })
  }, 2000);
}, []);

  return   (
  <div className="App">
    <h1>Fala Brother</h1>;

    <Form ref={formRef} onSubmit={handleSubmit}>
      <Input name="name" />
      <Input type="email" name="email" />
      
      <Scope path="address">               
        <Input name="street" />
        <Input name="neighborhood" />
        <Input name="city" />
        <Input name="state" />
        <Input name="number" />
      </Scope>

      <button type="submit">Enviar</button>
    </Form>
  </div>
  );
}

export default App; 

// Scope, eh como se eu eu estivesse pondo adress.street, address.neighbor // adress na frente. Separa numa categoria so.