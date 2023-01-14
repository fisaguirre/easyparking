import React from "react";
import { useForm } from "react-hook-form";

export default function SignUp() {

    const { register, formState: { errors }, watch, handleSubmit } = useForm({
        defaultValues: {
            email: 'Ejemplo@gmail.com'
        }
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    const incluirTelefono = watch('incluirTelefono');

    return <div>
        <h2>Ingrese los datos</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Nombre</label>
                <input type="text" {...register('nombre', {
                    required: true,
                    maxLength: 10
                })} />
                {errors.nombre?.type === 'required' && <p>El campo nombre es requerido</p>}
                {errors.nombre?.type === 'maxLength' && <p>El campo nombre debe tener menos de 10 caracteres</p>}
            </div>
            <div>
                <label>Apellido</label>
                <input type="text" {...register('nombre', {
                    maxLength: 15
                })} />
            </div>
            <div>
                <label>Username   </label>
                <input type="text" {...register('username', {
                })} />
            </div>
            <div>
                <label>Email   </label>
                <input type="text" {...register('email', {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
                })} />
                {errors.email?.type === 'required' && <p>Ingre un correo electrònico</p>}
                {errors.email?.type === 'pattern' && <p>El formato del email es incorrecto</p>}
            </div>
            <div>
                <label>Rol   </label>
                <select {...register('rol')}>
                    <option value="null">sin asignar</option>
                    <option value="tarj">tarjetero</option>
                    <option value="adm">administrador</option>
                </select>
            </div>
            <div>
                <label>Password</label>
                <input type="password" {...register('password', {
                    required: true
                })} />
                {errors.password?.type === 'required' && <p> Ingrese una contraseña</p>}
            </div>
            <p></p>
            <input type="submit" value="Registrar usuario" />
        </form>

    </div>
    console.log("asd")
}

