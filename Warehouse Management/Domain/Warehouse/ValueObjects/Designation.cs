
namespace DDDSample1.Domain.Warehouse
{
    public class Designation
    {

        public string designation { get; private set;}
        public Designation(){}
        public Designation(string designation){
            this.designation = designation;
        }
    }
}