import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ViewTaskComponent } from './pages/view-task/view-task.component';
import { EmployeesTaskListComponent } from './pages/employees-task-list/employees-task-list.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks/new', component: NewTaskComponent },
  { path: 'tasks/:id', component: ViewTaskComponent },
  { path: 'employees', component: EmployeesTaskListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LogoutButtonComponent,
    TaskListComponent,
    NewTaskComponent,
    NavbarComponent,
    ViewTaskComponent,
    EmployeesTaskListComponent,
    SignupComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
