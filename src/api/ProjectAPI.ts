import api from "@/lib/axios";
import { dashboardProjectSchema, editProjectSchema, Project, ProjectFormData, projectSchema } from "../types";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
    try {
        const {data} = await api.post('/projects', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.message)
        }
    }
}

export async function getProjects() {

    try {
        const {data} = await api('/projects')
        const response = dashboardProjectSchema.safeParse(data)

        if(response.success){
            return response.data
        }

    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.message)
        }
    }
}

export async function getProjectById(projectId: Project['_id']) {
    try {
        const {data} = await api(`/projects/${projectId}`)
        const response = editProjectSchema.safeParse(data)

        if(response.success){
            return response.data
        }

    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.message)
        }
    }
}

export async function getFullProjectById(projectId: Project['_id']) {
    try {
        const {data} = await api(`/projects/${projectId}`)
        const response = projectSchema.safeParse(data)

        if(response.success){
            return response.data
        }

    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.message)
        }
    }
}

type updateProjectProps = {
    formData: ProjectFormData,
    projectId: Project['_id']
}

export async function updateProject({formData, projectId}: updateProjectProps) { // NG - 1.
    try {
        const {data} = await api.put<string>(`/projects/${projectId}`, formData)
        return data

    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.message)
        }
    }
}

export async function deleteProject(projectId: Project['_id']) { // NG - 1.
    try {
        const {data} = await api.delete<string>(`/projects/${projectId}`)
        return data

    } catch (error) {
        if(isAxiosError(error) && error.message) {
            throw new Error(error.response?.data.message)
        }
    }
}

/** NOTAS GENERALES
 * 
 * 1.- En el updateProject pasamos las variables de esta forma (por medio de un type externo que englobe ambas) debido a que useMutation (en el archivo
 * EditProjectForm.tsx) solo acepta una variable y nuestro servicio recibe dos (la informacion que se va a actualizar y el ID que le corresponde al producto).
 * Para ello, se crea un objeto (en el EditProjectForm.tsx) con las variables que requerimos y en el servicio lo tipamos como si fuese un objeto igualmente para
 * que no arroje errores.
*/