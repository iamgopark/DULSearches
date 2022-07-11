chrome.contextMenus.removeAll(function() {
	chrome.contextMenus.create({
		id: 'DULCatalog',
		title: 'Find Books at Duke, %s',
		contexts: ['selection']
	});
	chrome.contextMenus.create({
		id: 'AllSearch',
		title: 'Find Articles at Duke, %s',
		contexts: ['selection']
	});
	chrome.contextMenus.create({
		id: 'WCSearches',
		title: 'Find Books at WorldCat, %s',
		contexts: ['selection']
	});
	chrome.contextMenus.create({
		id: 'WakeCounty',
		title: 'Find Books at Wake County Public Libraries, %s',
		contexts: ['selection']
	});
	chrome.contextMenus.create({
		id: 'DurhamCounty',
		title: 'Find Books at Durham County Public Libraries, %s',
		contexts: ['selection']
	});
	chrome.contextMenus.create({
		id: 'Chpl',
		title: 'Find Books at Chaple Hill Public Library, %s',
		contexts: ['selection']
	});
	chrome.contextMenus.create({
		id: 'Amazon',
		title: 'Search Amazon, %s',
		contexts: ['selection']
	});
  });

chrome.contextMenus.onClicked.addListener(contextClick)
  
function contextClick(info, tab) {
   	const { menuItemId } = info
	var input = encodeURIComponent(info.selectionText);

	if (menuItemId === 'DULCatalog') {
		chrome.tabs.create({ 
			url: "https://find.library.duke.edu/?utf8=%E2%9C%93&search_field=all_fields&q=" + input,
		})
	}
	else if(menuItemId === 'AllSearch'){
		var DOIpattern = new RegExp(/\b(10[.][0-9]{4,}(?:[.][0-9]+)*)\b/g);
		var found = DOIpattern.test(input);
		
		if(found){
			var matches = input.match(/\b(10[.][0-9]{4,}(?:[.][0-9]+)*\/(?:(?!["&\'<>])\S)+)\b/g)[0]; 
			console.log(matches);
			chrome.tabs.create({
				url: "https://duke.summon.serialssolutions.com/advanced#!/search?ho=t&l=en&q=(DOI:(" + matches +"))", 
			}); 
		}
		else{
			chrome.tabs.create({ 
				url: "https://duke.summon.serialssolutions.com/advanced#!/search?ho=t&l=en&q=" + input,
			});
		}
	}
	else if(menuItemId === 'WCSearches'){
		chrome.tabs.create({ 
			url: "https://www.worldcat.org/search?qt=worldcat_org_all&q=" + input,
		})
	}
	else if(menuItemId === 'WakeCounty'){
		chrome.tabs.create({ 
			url: "https://catalog.wakegov.com/Union/Search?basicType=&genealogyType=&view=list&lookfor=" + input,
		})
	}
	else if(menuItemId === 'DurhamCounty'){
		chrome.tabs.create({ 
			url: "https://durhamcounty.bibliocommons.com/v2/search?searchType=smart&query=" + input,
		})
	}
	else if(menuItemId === 'Chpl'){
		chrome.tabs.create({ 
			url: "https://chpl.bibliocommons.com/v2/search?searchType=smart&query=" + input,
		})
	}
	else if(menuItemId === 'Amazon'){
		chrome.tabs.create({ 
			url: "https://www.amazon.com/s?k=" + input,
		})
	}
}