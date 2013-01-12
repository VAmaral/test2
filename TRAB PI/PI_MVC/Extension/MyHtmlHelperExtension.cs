using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace PI_MVC.Extension
{
    public static class MyHtmlHelperExtension
    {
        public static MvcHtmlString GetUrl<T>(this HtmlHelper<T> helper, Uri uriBase, string controlAction, string user)
        {
            StringBuilder str = new StringBuilder();
            string url = uriBase.ToString();
            str.Append(url.Substring(0, url.IndexOf("Home")));
            str.Append(controlAction);
            str.Append("?Id=");
            str.Append(user);
            return MvcHtmlString.Create(str.ToString());
        }

        public static MvcHtmlString GetUrl<T>(this HtmlHelper<T> helper, Uri uriBase, string controlAction)
        {
            StringBuilder str = new StringBuilder();
            string url = uriBase.ToString();
            str.Append(url.Substring(0, url.IndexOf("Home")));
            str.Append(controlAction);
            return MvcHtmlString.Create(str.ToString());
        }
    }
}