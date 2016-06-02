/* global chrome */

function getSetting(name, callback) {
	chrome.storage.sync.get(name, function(data) {
		callback(data);
	});
}

function setSetting(setting, callback) {
	chrome.storage.sync.set(setting, callback);
}

function nukePage() {
	$("#nuker-notice-outer").css("display","block");
	$(".exodus-nuke").attr("value","Nuking...");
	$(".check-uncheck").first().click();
	window.setTimeout(function(){
		$(".remove-checked").first().click();
	},500);
}

$(document).ready(function(){
	
	var subs = $("b[id^='sid_']");
	
	$(".remove-nuke").after('<input class="button exodus-nuke" value="Exodus Nuke">');
	
	$("body").append('<div id="nuker-notice-outer"><div id="nuker-notice">Nuking Submissions...<br /><a href="#" id="nuker-cancel">Cancel</a></div></div>');
	
	$("#nuker-cancel").click(function(){
		setSetting({
			"nuke-active": false
		}, function(){
			location.reload();
		});
		return false;
	})
	
	$(".exodus-nuke").click(function(){
		setSetting({
			"nuke-active": true
		}, function(){
			nukePage();
		});
	});
	
	getSetting("nuke-active", function(data){
		if (data["nuke-active"]) {
			nukePage();
		}
		else if (subs.length == 0) {
			setSetting({
				"nuke-active": false
			}, function(){
				location.reload();
			});
		}
		
	})
})
