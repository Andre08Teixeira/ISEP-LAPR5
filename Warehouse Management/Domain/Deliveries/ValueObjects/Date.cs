

namespace DDDSample1.Domain.Deliveries
{
    public class Date{

    public int dia{get;set;}

    public int month{get;set;}
    public int year{get;set;}
    public Date(int dia,int month,int year){
       this.dia = dia;
       this.month = month;
       this.year = year;
    }

    public Date(){
    }
    }
}
