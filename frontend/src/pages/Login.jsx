import React from "react";
import { useForm } from "react-hook-form";
const API_CONTROL_PARKING = process.env.REACT_APP_API_USER;

{/*export = exporta el componente para llarmalo en otro script*/ }
{/*function = const - puedo usar cualquiera de los 2 para el componente*/ }
export default function Login() {

    const { register, formState: { errors }, watch, handleSubmit } = useForm({

    });

    const onSubmit = (data) => {
        console.log(data);
    }

    return <div className="form-text">
        <h2>Ingrese su cuenta</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email</label>
                <input placeholder="email" type="text" {...register('email', {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
                })} />
                {errors.email?.type === 'required' && <p>Ingre un correo electrònico</p>}
                {errors.email?.type === 'pattern' && <p>El formato del email es incorrecto</p>}
            </div>
            <div>
                <label>Password</label>
                <input placeholder="password" type="password" {...register('password', {
                    required: true
                })} />
                {errors.password?.type === 'required' && <p> Ingrese una contraseña</p>}
            </div>
            <p></p>

            <input type="submit" value="Iniciar sesiòn" />
        </form>
    </div>
}