/*
  Copyright 2010 Google Inc
  Copyright 2011 Takashi Okamoto

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */

  /** @fileoverview Example of how to use the bookmark bubble. */

  /** Don't show the bubble if click dismiss button at 3 times. */
  google.bookmarkbubble.Bubble.prototype.NUMBER_OF_TIMES_TO_DISMISS = 3;

  /** page to bookmark bubble (generally, this should be top page) */
  if(typeof(page_popup_bubble)=="undefined"){
  	page_popup_bubble = "#index";
  }

  $(document).ready(function(){
  	console.log('init');
  	$(page_popup_bubble).on('pageinit',function() {
  		var bubble = new google.bookmarkbubble.Bubble();
  		var parameter = page_popup_bubble;
  		
  		bubble.hasHashParameter = function() {
  			return false;
  		};

  		bubble.setHashParameter = function() {
  		};

  		bubble.getViewportHeight = function() {
  			window.console.log('Example of how to override getViewportHeight.');
  			return window.innerHeight;
  		};

  		bubble.getViewportScrollY = function() {
  			window.console.log('Example of how to override getViewportScrollY.');
  			return window.pageYOffset;
  		};

  		bubble.registerScrollHandler = function(handler) {
  			window.console.log('Example of how to override registerScrollHandler.');
  			window.addEventListener('scroll', handler, false);
  		};

  		bubble.deregisterScrollHandler = function(handler) {
  			window.console.log('Example of how to override deregisterScrollHandler.');
  			window.removeEventListener('scroll', handler, false);
  		};

  		bubble.showIfAllowed();
  		doDiagnostics($('#diag'), bubble);
  	});
});

function resetCounter() {
	var key = google.bookmarkbubble.Bubble.prototype.LOCAL_STORAGE_PREFIX 
	+ google.bookmarkbubble.Bubble.prototype.DISMISSED_;
	window.localStorage[key] = String(0);
}

function boolToText (bool) {
	return bool?"Yes":"No";
}

/** Diagnostic output */
function doDiagnostics($elm, bubble) {
	var out = [];


	out.push("JQuery version: " + jQuery.fn.jquery);
	out.push("Bubble allowed to show: " + boolToText(bubble.isAllowedToShow_()));
	if (!bubble.isAllowedToShow_()) {
		out.push(">> Why? ");
		out.push(">> Is UserAgent Supported: " + boolToText(bubble.isUserAgentSupported_()));
		out.push(">> Is IPad: " + boolToText(bubble.isIpad_()));
		out.push(">> Is Android: " + boolToText(bubble.isAndroid_()));
		out.push(">> Is Playbook: " + boolToText(bubble.isPlayBook_()));
		out.push(">> Is Blackberry: " + boolToText(bubble.isBlackBerry_()));

		out.push(">> Has dismissed too many times: " + boolToText(bubble.hasBeenDismissedTooManyTimes_()));
		out.push(">> Is Fullscreen: " + boolToText(bubble.isFullscreen_()));
		out.push(">> Has Hash parameter: " + boolToText(bubble.hasHashParameter()));
	}

	var key = bubble.LOCAL_STORAGE_PREFIX + bubble.DISMISSED_;
	var value = Number(window.localStorage[key]) || 0;

	out.push("Dismissed, times: " + value);
	
	$elm.html(out.join("<br/>"));
}