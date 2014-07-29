<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Collections.Generic;
using System.Web;
using Massembly;
using Newtonsoft.Json;

public class Handler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {

        context.Response.Write(RandomName());
        context.Response.End();
    }

    private string RandomName()
    {
        List<FakeJSON> data = new List<FakeJSON>();
        for (int i = 0; i < 10; i++)
        {
            FakeJSON json = new FakeJSON();
            data.Add(json);
        }

        return JsonConvert.SerializeObject(data);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}