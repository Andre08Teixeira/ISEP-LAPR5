

namespace DDDSample1.Domain.Deliveries
{
    public class Weight{

    public double weight{get;set;}

    public string kg{get;set;}

    public Weight(double weight){
       this.weight = weight;
       this.kg = "kg";
    }

    public Weight(){
    }
    }
}