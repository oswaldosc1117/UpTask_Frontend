import { deleteNote } from "@/api/NotesAPI"
import { useAuth } from "@/hooks/useAuth"
import { Notes } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NotesDetailsProps = {
    note: Notes
}
export default function NotesDetails({ note }: NotesDetailsProps) {

    const params = useParams()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)

    const projectId = params.projectId!
    const taskId = queryParams.get('viewTask')!

    const { data, isLoading } = useAuth()
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])

    const queryClient = useQueryClient()
    
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['task', taskId]})

        }
    })

    const handleDeleteNote = () => {
        mutate({projectId, taskId, noteId: note._id})
    }

    if(isLoading) return 'Cargando'

    return (
        <div className=" p-3 flex justify-between items-center">
            <div>
                <p>{note.content} por: <span className=" font-bold">{note.createdBy.name}</span></p>
                <p className=" text-xs text-slate-500">{formatDate(note.createdAt)}</p>
            </div>

            {canDelete && (
                <button
                    type="button"
                    className=" bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold  rounded-md cursor-pointer transition-colors"
                    onClick={handleDeleteNote}>
                    Eliminar
                </button>
            )}
        </div>
    )
}
