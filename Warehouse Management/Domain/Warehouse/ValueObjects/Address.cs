

namespace DDDSample1.Domain.Warehouse
{
    public class Address{

    public string street{get;set;}

    public string country{get;set;}
    public string codigoPostal{get;set;}
    public Address(string street,string codigoPostal,string country){
       this.street = street;
       this.codigoPostal = codigoPostal;
       this.country = country;
    }

    public Address(){
    }
    }
}
