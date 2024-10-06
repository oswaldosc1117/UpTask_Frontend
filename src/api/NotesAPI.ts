import { isAxiosError } from "axios";
import { NoteFormData, Notes, Project, Task } from "../types";
import api from "@/lib/axios";

type Note = {
    formData: NoteFormData,
    projectId: Project['_id'],
    taskId: Task['_id']
    noteId: Notes['_id']
}

export async function createNote({projectId, taskId, formData}: Pick<Note, 'projectId' | 'taskId' | 'formData'>) {
    try {
        const { data } = await api.post<string>(`/projects/${projectId}/task/${taskId}/notes`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteNote({projectId, taskId, noteId}: Pick<Note, 'projectId' | 'taskId' | 'noteId'>) {
    try {
        const { data } = await api.delete<string>(`/projects/${projectId}/task/${taskId}/notes/${noteId}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}