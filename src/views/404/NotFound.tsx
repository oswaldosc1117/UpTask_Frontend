import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
        <h1 className=" font-black text-center text-4xl text-white">Página No Encontrada</h1>
        <p className=" mt-10 text-center text-white">
            Tal vez desees regresar a {' '}
            <Link to={'/'} className=" text-fuchsia-500 font-bold">Proyectos</Link>
        </p>
    </>
  )
}
