using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Warehouse{

    public class WarehouseID :EntityId 
    {
[JsonConstructor]

        public WarehouseID(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return new String(text);
        }
        
        override
        public String AsString(){
            String obj = (String) base.ObjValue;
            return obj;
        }
        
    }
}