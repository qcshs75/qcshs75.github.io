<!-- attr svcpage=NC_misc_javascript -->
// Copyright (c) 2000 Hewlett-Packard Company.
// Use of the HP Print it! button restricted to
// Web sites operated by HP authorized partners.
// Unauthorized	use prohibited.
//
// FILENAME	:	hpprint.js
//

// HP Print it!	print button user interface.

function hpPrintIt(job, affiliate, logo, view)
{
	// Make sure we support the user's browser
	agent = navigator.userAgent.toLowerCase();
	aolOffset = agent.indexOf("aol ");
	isAOL = (aolOffset != -1);
	ieOffset = agent.indexOf("msie ");
	isIE = (ieOffset != -1);
	bVersion = 0.0;
	vNum = "";

	if (isAOL)
	{
		bVersion = parseFloat(agent.substring(aolOffset + 4));
		if (bVersion < 4.0)
			vNum = "AOL 4.0";
	}
	else if (isIE)
	{
		bVersion = parseFloat(agent.substring(ieOffset + 5));
		if (bVersion < 4.0)
			vNum = "Internet Explorer 4.0";
	}
	else
	{
		// Assume Netscape
		bVersion = parseFloat(navigator.appVersion);
		if (bVersion < 4.08)
			vNum = "Netscape 4.08";
	}

	if (vNum != "")
	{
		// Unsupported version; ask user to upgrade
		msg = "Your current browser does not support this easy print experience.\n";
		msg += "For future easy printing:\n";
		msg += "     Upgrade your browser to " + vNum + " or higher.\n";
		alert (msg);
		return;
	}

	if (arguments.length < 4)
	{
		view = "preview";
	}
	else if	(view == "")
	{
		view = "noview";
	}
	else if	((view != "preview") && (view != "tips") && (view != "noview"))
	{
		view = "preview";
	}

	if (arguments.length < 3)
	{
		logo = "";
	}

	if (arguments.length < 2)
	{
		affiliate = "unknown";
	}

	job = job;

	width = 625;
	small = 225;
	large = small + 223;

	if (isIE)
	{
		small += 30;
		large += 30;
		width += 10;
	}

	var features = "dependent=no,scrollbars=no,menubar=no,resizable=yes";
	if (view == "noview")
        {
	        features += ",width=" +	width + ",height=" + small;
        }
        else
	{
	        features += ",width=" +	width + ",height=" + large;
	}

	// Build up the URL, including the state parameters
	fullUrl = "http://hpprintit.com/jsp/option1/hpprintui.html";
	fullUrl += "?job=" + escape(job);
	fullUrl += "&id=" + escape(affiliate);
	fullUrl += "&view=" + escape(view);
	fullUrl += "&width=" + escape(width);
	fullUrl += "&large=" + escape(large);
	if (logo != "")
		fullUrl += "&logo=" + escape(logo);
	window.open(fullUrl, "hpprint", features);
}

hpprintit = hpPrintIt;  // allow for less case sensitivity
