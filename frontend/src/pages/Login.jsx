import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {

    const { register, formState: { errors }, watch, handleSubmit } = useForm({

    });

    const onSubmit = (data) => {
        console.log(data);
    }

    return <div>
        <h2>Ingrese su cuenta</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email</label>
                <input type="text" {...register('email', {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
                })} />
                {errors.email?.type === 'required' && <p>Ingre un correo electrònico</p>}
                {errors.email?.type === 'pattern' && <p>El formato del email es incorrecto</p>}
            </div>
            <div>
                <label>Password</label>
                <input type="password" {...register('password', {
                    required: true
                })} />
                {errors.password?.type === 'required' && <p> Ingrese una contraseña</p>}
            </div>
            <p></p>
            <input type="submit" value="Iniciar sesiòn" />
        </form>
    </div>
}