import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { DeliveryDetailComponent } from './delivery-detail/delivery-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { DeliveryCreateComponent } from './delivery-create/delivery-create.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { WarehouseItemComponent } from './components/warehouse-item/warehouse-item.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { AddWarehouseComponent } from './components/add-warehouse/add-warehouse.component';
import { GoWarehouseComponent } from './components/go-warehouse/go-warehouse.component';
import { DashboardDeliveryComponent } from './dashboard-delivery/dashboard-delivery.component';
import { TrucksComponent } from './trucks/trucks.component';
import { TruckDetailComponent } from './truck-details/truck-details.component';
import { TruckCreateComponent } from './truck-create/truck-create.component';
import { DashboardTruckComponent } from './dashboard-truck/dashboard-truck.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-details1/course-details1.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { DashboardCourseComponent } from './dashboard-courses/dashboard-course.component';
import { PackagesComponent } from './packages/packages.component';
import { DashboardPackageComponent } from './dashboard-package/dashboard-package.component';
import { PackageCreateComponent } from './package-create/package-create.component';
import { PackageDetailComponent } from './package-details2/package-details2.component';
import {NgtCanvasModule} from '@angular-three/core';
import { WarethreedComponent } from './components/warethreed/warethreed.component';
import { RedeViariaComponent } from './rede-viaria/rede-viaria.component';
import { RedeViariaAutomaticaComponent } from './rede-viaria-automatica/rede-viaria-automatica.component';
import { WarehouseManagementDashBoardComponent } from './warehouse-management-dash-board/warehouse-management-dash-board.component';
import { LogisticsDashboardComponent } from './logistics-dashboard/logistics-dashboard.component';
import { PlanningsComponent } from './plannings/plannings.component';
import { DashboardPlanningComponent } from './dashboard-planning/dashboard-planning.component';
import { PlanningDetailComponent } from './planning-details/planning-detail.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TruckInhibitComponent } from './truck-inhibit/truck-inhibit.component';
import { SocialLoginModule,SocialAuthServiceConfig} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { UserCancellationComponent } from './user-cancellation/user-cancellation.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TripPaginationComponent } from './trip-pagination/trip-pagination.component';
import { PackagePaginationComponent } from './package-pagination/package-pagination.component';
import { CoursePaginationComponent } from './course-pagination/course-pagination.component';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from './material-module';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    CoursePaginationComponent,
    AppComponent,
    DeliveriesComponent,
    DeliveryDetailComponent,
    TrucksComponent,
    TruckDetailComponent,
    MessagesComponent,
    DashboardComponent,
    DeliveryCreateComponent,
    TruckCreateComponent,
    DashboardDeliveryComponent,
    DashboardTruckComponent,
    HeaderComponent,
    ButtonComponent,
    WarehouseItemComponent,
    WarehousesComponent,
    AddWarehouseComponent,
    GoWarehouseComponent,
    CoursesComponent,
    CourseDetailComponent,
    CourseCreateComponent,
    DashboardCourseComponent,
    PackagesComponent,
    PackageDetailComponent,
    PackageCreateComponent,
    DashboardPackageComponent,
    WarethreedComponent,
    RedeViariaComponent,
    WarehouseManagementDashBoardComponent,
    LogisticsDashboardComponent,
    PlanningsComponent,
    PlanningDetailComponent,
    DashboardPlanningComponent,
    UserCreationComponent,
    AdminDashboardComponent,
    TruckInhibitComponent,
    UserCancellationComponent,
    RedeViariaAutomaticaComponent,
    CreateTripComponent,
    TripPaginationComponent,
    PackagePaginationComponent,
    LoginComponent,
    NavBarComponent,
    CoursePaginationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgtCanvasModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MaterialModule,
    
  ],
  providers: [ {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('744382900368194')
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  },DeliveriesComponent,TrucksComponent,CoursesComponent,PackagesComponent,PlanningsComponent,UserCreationComponent,TruckInhibitComponent,CreateTripComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
