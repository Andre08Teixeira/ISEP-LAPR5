import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { TrucksComponent } from './trucks/trucks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeliveryDetailComponent } from './delivery-detail/delivery-detail.component';
import { TruckDetailComponent } from './truck-details/truck-details.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { DashboardDeliveryComponent } from './dashboard-delivery/dashboard-delivery.component';
import { DashboardTruckComponent } from './dashboard-truck/dashboard-truck.component';
import { DeliveryCreateComponent } from './delivery-create/delivery-create.component';
import { TruckCreateComponent } from './truck-create/truck-create.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-details1/course-details1.component';
import { DashboardCourseComponent } from './dashboard-courses/dashboard-course.component';
import { DashboardPackageComponent } from './dashboard-package/dashboard-package.component';
import { PackageCreateComponent } from './package-create/package-create.component';
import { PackagesComponent } from './packages/packages.component';
import { PackageDetailComponent } from './package-details2/package-details2.component';
import { WarehouseManagementDashBoardComponent } from './warehouse-management-dash-board/warehouse-management-dash-board.component';
import { LogisticsDashboardComponent } from './logistics-dashboard/logistics-dashboard.component';
import { RedeViariaComponent } from './rede-viaria/rede-viaria.component';
import { RedeViariaAutomaticaComponent } from './rede-viaria-automatica/rede-viaria-automatica.component';
import { DashboardPlanningComponent } from './dashboard-planning/dashboard-planning.component';
import { PlanningsComponent } from './plannings/plannings.component';
import { PlanningDetailComponent } from './planning-details/planning-detail.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TruckInhibitComponent } from './truck-inhibit/truck-inhibit.component';
import { UserCancellationComponent } from './user-cancellation/user-cancellation.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { TripPaginationComponent } from './trip-pagination/trip-pagination.component';
import { PackagePaginationComponent } from './package-pagination/package-pagination.component';
import { CoursePaginationComponent } from './course-pagination/course-pagination.component';
import { LoginComponent } from './login/login.component';
import { AdministradorService } from './guards/administrador.service';
import { LogisticsManagerService } from './guards/logistics-manager.service';
import { FleetManagerService } from './guards/fleet-manager.service';
import { WarehouseManagerService } from './guards/warehouse-manager.service';
const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path:'login',component:LoginComponent,title:'Login'},
  {path: 'deliveries', component: DeliveriesComponent,title:'List Deliveries',canActivate:[WarehouseManagerService]},
  {path: 'trucks', component: TrucksComponent,title:'List Trucks',canActivate:[LogisticsManagerService]},
  {path: 'dashboard', component: DashboardComponent,title:'Dashboard'},
  {path: 'details/:registration', component: TruckDetailComponent,canActivate:[LogisticsManagerService]},
  {path: 'detail/:id', component: DeliveryDetailComponent,canActivate:[WarehouseManagerService]},
  {path: 'warehouse', component: WarehousesComponent,title:'Create&List Warehouses',canActivate:[WarehouseManagerService]},
  {path: 'delivery-dashboard', component: DashboardDeliveryComponent,canActivate:[WarehouseManagerService]},
  {path: 'truck-dashboard', component: DashboardTruckComponent,title:'Dashboard-Truck',canActivate:[LogisticsManagerService]},
  {path: 'delivery-create', component: DeliveryCreateComponent,title:'Create Delivery',canActivate:[WarehouseManagerService]},
  {path: 'truck-create', component: TruckCreateComponent,title:'Create truck',canActivate:[LogisticsManagerService]},
  {path: 'course-create', component: CourseCreateComponent,title:'Create Course',canActivate:[LogisticsManagerService]},
  {path: 'courses', component: CoursesComponent,title:'List Courses',canActivate:[LogisticsManagerService]},
  {path: 'course-dashboard', component: DashboardCourseComponent,title:'Dashboard-Course',canActivate:[LogisticsManagerService]},
  {path: 'detail1/:id', component: CourseDetailComponent,canActivate:[LogisticsManagerService]},
  {path: 'package-create', component: PackageCreateComponent,title:'Create Packages',canActivate:[LogisticsManagerService]},
  {path: 'packages', component: PackagesComponent,title:'List Packages',canActivate:[LogisticsManagerService,AdministradorService]},
  {path: 'package-dashboard', component: DashboardPackageComponent,title:'Dashboard-Package',canActivate:[LogisticsManagerService]},
  {path: 'detail2/:id', component: PackageDetailComponent,canActivate:[LogisticsManagerService]},
  {path: 'WarehouseManagement', component: WarehouseManagementDashBoardComponent,title:'Warehouse Management',canActivate:[WarehouseManagerService]},
  {path: 'logistics', component: LogisticsDashboardComponent,title:'Logistics',canActivate:[LogisticsManagerService]},
  {path: 'redeViaria3D', component: RedeViariaComponent,title:'Rede Viaria',canActivate:[FleetManagerService]},
  {path: 'redeViariaAutomatica3D', component: RedeViariaAutomaticaComponent,title:'Rede Viaria Automatica',canActivate:[FleetManagerService]},
  {path: 'plannings', component: PlanningsComponent,title:'List Plannings',canActivate:[FleetManagerService]},
  {path: 'planning-dashboard', component: DashboardPlanningComponent,title:'Dashboard Planning',canActivate:[FleetManagerService]},
  {path: 'detail3/:id', component: PlanningDetailComponent,canActivate:[FleetManagerService,AdministradorService]},
  {path: 'user-create', component: UserCreationComponent,title:'Create an User',canActivate:[AdministradorService]},
  {path: 'admin-dashboard', component: AdminDashboardComponent,title:'Admin-dashboard',canActivate:[AdministradorService]},
  {path: 'truck-inhibit', component: TruckInhibitComponent,title:'Inhibit truck',canActivate:[LogisticsManagerService]},
  {path: 'user-cancellation', component: UserCancellationComponent, title:'Cancel an Account',canActivate:[AdministradorService]},
  {path: 'create-trip', component: CreateTripComponent, title:'Create a trip',canActivate:[FleetManagerService]},
  {path: 'trip-pagination', component: TripPaginationComponent, title:'Trip List',canActivate:[FleetManagerService]},
  {path: 'package-pagination', component: PackagePaginationComponent, title:'Package List',canActivate:[LogisticsManagerService]},
  {path: 'course-pagination', component: CoursePaginationComponent, title:'Course List',canActivate:[LogisticsManagerService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
