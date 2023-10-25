import React from "react";
import { useForm } from "react-hook-form";
import "../styles/formulario.css";

function Formulario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    alert("enviando datos");
    reset();

    {/*logica back end*/}
  });

  return (
    <form onSubmit={onSubmit} className="formulario">
      <label htmlFor="">nombre</label>
      <input
        type="text"
        {...register("nombre", {
          required: {
            value: true,
            message: "nombre requerido",
          },
          minLength: {
            value: 5,
            message: "debe tener al menos 5 caracteres",
          },
          maxLength: {
            value: 20,
            message: "puede tener maximo 20 caracteres",
          },
        })}
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}

      <label htmlFor="">email</label>
      <input type="email" {...register("email", { required: true })} />
      {errors.email && <span>completa el campo</span>}

      <label htmlFor="">contraseña</label>
      <input
        type="password"
        {...register("contraseña", {
          required: {
            value: true,
            message: "contraseña requerida",
          },
          minLength: {
            value: 6,
            message: "debe tener minimo 6 caracteres",
          },
          maxLength: {
            value: 12,
            message: "puede tener maximo 12 caracteres",
          },
        })}
      />
      {errors.contraseña && <span>{errors.contraseña.message}</span>}

      <label htmlFor="">comfirmar contraseña</label>
      <input
        type="password"
        {...register("comfirmar", {
          required: {
            value: true,
            message: "campo requerido",
          },
          validate: value =>
            value == watch("contraseña") || "la contraseña no coinside",
        })}
      />
      {errors.comfirmar && <span>{errors.comfirmar.message}</span>}

      <label htmlFor="">fecha de nacimiento</label>
      <input
        type="date"
        {...register("fecha", {
          required: {
            value: true,
            message: "fecha de nacimiento requerida",
          },
          validate: (value) => {
            const fechaNacimiento = new Date(value);
            const fechaActual = new Date();
            const edad =
              fechaActual.getFullYear() - fechaNacimiento.getFullYear();
            return edad >= 18 || "debes ser mayor de edad";
          },
        })}
      />
      {errors.fecha && <span>{errors.fecha.message}</span>}

      <label htmlFor="">recidencia</label>
      <select {...register("recidencia", { required: true })}>
        <option value="ar">argentina</option>
        <option value="uy">uruguay</option>
        <option value="br">brasil</option>
      </select>
      {errors.recidencia && <span>completa el campo</span>}

      <label htmlFor="">foto de perfil</label>
      <input type="file" {...register("foto")} />

      <input type="submit" name="" id="" className="submit" />

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  );
}

export default Formulario;
