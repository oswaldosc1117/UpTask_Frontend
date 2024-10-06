import { getTaskById } from "@/api/TaskAPI"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal"

export default function EditTaskData() {

    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('editTask')!

    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId // NG - 1.
    })

    if(isError) return <Navigate to={'/404'}/>

    if(data) return <EditTaskModal data={data} taskId={taskId}/>
}

/** NOTAS GENERALES
 * 
 * 1.- enabled permite ejecutar una accion solo si se cumple una determinada condicion. Para ello, permite convertir un determinado valor en un buleano. Ejemplo:
 * 
 * const hola = "hola" ---> true
 * const hola2 = "" ---> false
 * 
 * Esta conversion ocurre dependiendo de si existe un contenido o no en algunas de las variables. Como la variable "hola" si tiene algo, pasa a ser true; mientas
 * que "hola2" al no tener nada, inmediatamente pasa a ser false.
 * 
 * De esta forma, podemos ejecutar determinadas acciones dependiendo de si existe un contenido o no. En este caso, leyendo directamente desde la URL si existe el
 * contenido.
*/
