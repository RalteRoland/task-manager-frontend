import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { ViewTaskComponent } from './pages/view-task/view-task.component';
import { EmployeesTaskListComponent } from './pages/employees-task-list/employees-task-list.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'tasks/new', component: NewTaskComponent },
  { path: 'tasks/:id', component: ViewTaskComponent },
  { path: 'employees', component: EmployeesTaskListComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
