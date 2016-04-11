window.Cust = window.Cust || {};

window.Cust.accordionItem = {

    customItemHtml: function (ctx) {
        var accordionItemHtml = "<h3>" + ctx.CurrentItem.Nombre + "</h3>";
        accordionItemHtml += "<div>" + ctx.CurrentItem.Descripcion + "</div>";
        return accordionItemHtml;

    }

};

(function () {

    var appWebUrl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
    var scriptFolder = appWebUrl + "/SiteAssets/";
    loadcssfile(scriptFolder + "jquery-ui.css", "css");
    // Initialize the variable that store the objects.
    var overrideCtx = {};
    overrideCtx.Templates = {};
    overrideCtx.Templates.Header = "<div id=\"accordion\">";
    overrideCtx.Templates.Item = window.Cust.accordionItem.customItemHtml;
    overrideCtx.Templates.Footer = "</div>";
    overrideCtx.BaseViewID = 1;
    overrideCtx.ListTemplateType = 100;

    // Register the template overrides.

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);

})();

$(document).ready(function () {

    $("#accordion").find('#scriptBodyWPQ1').remove();
    $("#accordion").accordion({ heightStyle: "content" });

});

function loadcssfile(filename, filetype) {

    if (filetype == "css") { //if filename is an external CSS file

        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)

    }

    if (typeof fileref != "undefined")

        document.getElementsByTagName("head")[0].appendChild(fileref)

}

function getQueryStringParameter(urlParameterKey) {

    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split('=');
        if (singleParam[0] == urlParameterKey)
            return decodeURIComponent(singleParam[1]);

    }

}