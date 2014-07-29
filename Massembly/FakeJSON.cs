using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Massembly
{
    public class FakeJSON
    {
        public string Name
        {
            get
            {
                Random rnd = new Random(Guid.NewGuid().GetHashCode());
                var i = rnd.Next(0, Names.Length);
                return Names[i];
            }
        }

        public int Number
        {
            get
            {
                Random rnd = new Random(Guid.NewGuid().GetHashCode());
                return rnd.Next(1000, 50000);
            }
        }

        public int Like
        {
            get
            {
                Random rnd = new Random(Guid.NewGuid().GetHashCode());
                return rnd.Next(0, 500);
            }
        }

        public string Picture {
            get
            {
                Random rnd = new Random(Guid.NewGuid().GetHashCode());
                return string.Format("{0}.png",rnd.Next(1, 20));
            }
        }
        public bool IsFollow {
            get
            {
                Random rnd = new Random(Guid.NewGuid().GetHashCode());
                return (1 == rnd.Next(0, 1));
            }
        }

        private string[] Names = { "Away", "Brooks", "Elvis", "Fish", "Hawaii", "Isu", "Jerry", "Ken", "Mark", "Pan", "Patty", "Stan", "Tabea", "Tifa","Wayne"};
        
    }
}
