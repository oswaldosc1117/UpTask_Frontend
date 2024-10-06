import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TeamMember } from "@/types/index"
import { addUserToProject } from "@/api/TeamAPI"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"


type SearchResultProps = {
    userTeam: TeamMember,
    resetData: () => void
}

export default function SearchResult({ userTeam, resetData }: SearchResultProps) {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            resetData()
            navigate(location.pathname, {replace: true})
            queryClient.invalidateQueries({queryKey: ['ProjectTeam', projectId]})
        }
    })

    const handleAddUserToProject = () => {
        const data = {
            projectId,
            id: userTeam._id
        }

        mutate(data)
    }


    return (
        <>
            <p className=" mt-10 text-center font-bold">Resultado:</p>
            <div className=" flex justify-between items-center">
                <p>{userTeam.name}</p>
                <button
                    className=" text-purple-600 rounded-lg hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
                    onClick={handleAddUserToProject}>
                    Agregar al Proyecto
                </button>
            </div>
        </>
    )
}
