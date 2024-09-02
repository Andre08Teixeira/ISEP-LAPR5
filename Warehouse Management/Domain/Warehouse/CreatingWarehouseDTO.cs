using System;

namespace DDDSample1.Domain.Warehouse
{
    public class CreatingWarehouseDTO
    {
        public String designation{get;  set;}
        public String street{get;  set;}
        public String codigoPostal{get;  set;}
        public String country{get;  set;}
        public float longitude{get;  set;}
        public float latitude{get;  set;}
   
        public CreatingWarehouseDTO(string designation,string street,string codigoPostal,
         string country,float longitude,float latitude){
            this.designation = designation;
            this.street = street;
            this.codigoPostal = codigoPostal;
            this.country = country;
            this.longitude = longitude;
            this.latitude = latitude;
         }
   
   
    }
}