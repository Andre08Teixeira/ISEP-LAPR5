using System;
using DDDSample1.Domain.Warehouse;
namespace DDDSample1.Domain.Warehouse
{
    public class WarehouseDTO
    {
        
        public String Id{get;  set;}
        public String designation{get;  set;}
        public String street{get;  set;}
        public String codigoPostal{get;  set;}
        public String country{get;  set;}
        public float longitude{get;  set;}
        public float latitude{get;  set;}
        public float altitude{get;  set;}


        public WarehouseDTO(string Id,string designation,string street,string codigoPostal,
         string country,float longitude,float latitude,float altitude){
            
            this.Id = Id;
            this.designation = designation;
            this.street = street;
            this.codigoPostal = codigoPostal;
            this.country = country;
            this.longitude = longitude;
            this.latitude = latitude;
            this.altitude=altitude;
        }

        public WarehouseDTO(){
            
        }
    }
}