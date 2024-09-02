using System;
using DDDSample1.Domain;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Warehouse
{
    public class WareHouse :Entity<WarehouseID>,IAggregateRoot
        {  
        /*
        // Adress
        // Name
        // Coordinates
        //ID 
            value objects
        */
        public Address adress{get;set;}
        public Coordinates coordinates{get;set;}
        public Designation designation{get; private set ;}
        public bool Active{ get;  private set; }

        public WareHouse(string Id, string designation,string street,string codigoPostal,
         string country,float longitude,float latitude, float altitude){
            // posso criar um regex para o adress


            this.Id = new WarehouseID(Id);
            this.designation = new Designation(designation);
            this.adress = new Address(street,codigoPostal,country);
            this.coordinates= new Coordinates(latitude,longitude,altitude);
            this.Active=true;
        }

  
        public void changeAdress(string street,string codigoPostal,string country)
        {

            this.adress = new Address(street,codigoPostal,country);;
        }

         public void changeDesignation(string designation)
        {
            this.designation = new Designation(designation);
        }

           public void changeCoordinates(float latitude,float longitude,float altitude)
        {
            this.coordinates = new Coordinates(latitude,longitude,altitude);
        }

        public WareHouse(){
        this.Active=true;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }

    }
}