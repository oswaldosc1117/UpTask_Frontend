import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/EditProjectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import RecoveryPasswordView from "./views/auth/RecoveryPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import ProfileView from "./views/profile/ProfileView";
import ChangePassword from "./views/profile/ChangePassword";
import ProfileLayout from "./layouts/ProfileLayout";
import NotFound from "./views/404/NotFound";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route element={<AppLayout/>}>
                        <Route path="/" element={<DashboardView/>} index/>
                        <Route path="/projects/create" element={<CreateProjectView/>}/>
                        <Route path="/projects/:projectId" element={<ProjectDetailsView/>}/>
                        <Route path="/projects/:projectId/edit" element={<EditProjectView/>}/>
                        <Route path="/projects/:projectId/team" element={<ProjectTeamView/>}/>
                        
                        <Route element={<ProfileLayout/>}>
                            <Route path="/profile" element={<ProfileView/>}/>
                            <Route path="/profile/update-password" element={<ChangePassword/>}/>
                        </Route>
                        
                    </Route>
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<LoginView/>}/>
                    <Route path="/auth/register" element={<RegisterView/>}/>
                    <Route path="/auth/confirm-account" element={<ConfirmAccountView/>}/>
                    <Route path="/auth/request-code" element={<RequestNewCodeView/>}/>
                    <Route path="/auth/recovery-password" element={<RecoveryPasswordView/>}/>
                    <Route path="/auth/new-password" element={<NewPasswordView/>}/>
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path="*" element={<NotFound/>}/> {/* NG - 1. */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

/** NOTAS GENERALES
 * 
 * 1.- El * en el path indica que cualquier ruta que no sea una de las que ya se encuentran establecidas, redirigira automaticamente al usuario a una pagina
 * que nosotros deseemos. En este caso, para renderizar una pagina de error 404.
*/