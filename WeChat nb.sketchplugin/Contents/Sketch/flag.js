var kPluginDomain = "com.sketchplugins.wechat.flag";
var textCount = 1;
var scale = 2;

var getConnectionsGroupInPage = function(page) {
	var connectionsLayerPredicate = NSPredicate.predicateWithFormat("userInfo != nil && function(userInfo, 'valueForKeyPath:', %@).isflagContainer == true", kPluginDomain);
	return page.children().filteredArrayUsingPredicate(connectionsLayerPredicate).firstObject();
}


var onRun = function(context) {

	var getLeftFlagNum = function(){
		var children = getConnectionsGroupInPage(doc.currentPage());
		if(children){
			children = children.children();
		}else{
			return 1;
		}
		var num = [];
		for(var i = 0;i < children.length;i++){
			var Reg = new RegExp("^\\d{1,2}$");
			var countL = children[i].name().replace('___p','').replace('___t','').replace('___','');
			if(Reg.test(countL)){
				countL = parseInt(countL)-1;
				num[countL] = true;
			}
		}
		for(var k = 0;k<num.length+1;k++){
			if(!num[k]){
				return (k+1);
			}
		}
	}

	var getRightFlagNum = function(dom){
		var children = getConnectionsGroupInPage(doc.currentPage());
		if(children){
			children = children.children();
		}else{
			return 1;
		}
		for(var i = 0;i < children.length;i++){
			if(children[i].name() == dom.objectID()){
				children = children[i].children();
				for(var k = 0;k < children.length;k++){
					var Reg = new RegExp("^\\d{1,2}$");
					var countL = children[k].name().replace('___p','').replace('___t','').replace('___','');
					if(Reg.test(countL)){
						countL = parseInt(countL);
						return countL;
					}
				}
			}
		}
		return 1;
	}

	var drawLeftArrow = function(doc,dom,isNew){
		var count;
		if(isNew){
			count = getLeftFlagNum();
		}else{
			count = getRightFlagNum(dom);
		}
		 

		var linexl = dom.absoluteRect().x() + dom.rect().size.width;
		var liney = dom.absoluteRect().y() + dom.rect().size.height/2 - (24 * scale/2);

		var path = NSBezierPath.bezierPath();
		path.moveToPoint(NSMakePoint(22 * scale,60 * scale))
		path.curveToPoint_controlPoint1_controlPoint2(NSMakePoint(34 * scale,48 * scale),NSMakePoint(28.625 * scale,60 * scale),NSMakePoint(34 * scale,54.625 * scale));
		path.curveToPoint_controlPoint1_controlPoint2(NSMakePoint(22 * scale,36 * scale),NSMakePoint(34 * scale,41.375 * scale),NSMakePoint(28.625 * scale,36 * scale));
		path.curveToPoint_controlPoint1_controlPoint2(NSMakePoint(0,48 * scale),NSMakePoint(15.375 * scale,36 * scale),NSMakePoint(0,48 * scale));
		path.curveToPoint_controlPoint1_controlPoint2(NSMakePoint(22 * scale,60 * scale),NSMakePoint(0,48 * scale),NSMakePoint(15.375 * scale,60 * scale));
		path.closePath();
		var flag = MSShapeGroup.shapeWithBezierPath(path);
		flag.style().addStylePartOfType(0).setColor(MSImmutableColor.colorWithIntegerRed_green_blue_alpha(26,173,25,76.5).newMutableCounterpart());
		flag.style().addStylePartOfType(1).setColor(MSImmutableColor.colorWithIntegerRed_green_blue_alpha(26,173,25,255).newMutableCounterpart());
		flag.absoluteRect().setX(linexl);
		flag.absoluteRect().setY(liney);
		flag.setName('___'+count+'___p');

		var textLayer = MSTextLayer.alloc().init();

		if(count.toString().length == 1){
			textLayer.absoluteRect().setX(linexl + (12+ 26) * scale/2);
		}else{
			textLayer.absoluteRect().setX(linexl + (12+ 18) * scale/2);
		}
		
		textLayer.absoluteRect().setY(liney + 8 * scale / 2 );
		textLayer.setName('___'+count+'___t');
		var fixedBehaviour = 1;
		textLayer.setTextBehaviour(fixedBehaviour);
		textLayer.setStringValue(count.toString());
		textLayer.setTextColor(MSImmutableColor.colorWithIntegerRed_green_blue_alpha(26,173,25,255).newMutableCounterpart());
		textLayer.setFontSize(13 * scale);
		
		doc.currentPage().addLayers([flag,textLayer]);
		var connectionLayers = MSLayerArray.arrayWithLayers([flag,textLayer]);
		connectionsGroup = MSLayerGroup.groupFromLayers(connectionLayers);
		connectionsGroup.setName(dom.objectID());
		return connectionsGroup;
	}
	var drawRightArrow = function(doc,dom){
		var count = getRightFlagNum(dom);
		var linexr = dom.absoluteRect().x() - 34 * scale;
		var liney = dom.absoluteRect().y() + dom.rect().size.height/2 - (24 * scale/2);

		var path = NSBezierPath.bezierPath();
		path.moveToPoint(NSMakePoint(12 * scale,24 * scale))
		path.curveToPoint_controlPoint1_controlPoint2(NSMakePoint(0 * scale,12 * scale),NSMakePoint(5.375 * scale,24 * scale),NSMakePoint(0 * scale,18.625 * scale));
		path.curveToPoint_controlPoint1_controlPoint2(NSMakePoint(12 * scale,0 * scale),NSMakePoint(0 * scale,5.375 * scale),NSMakePoint(5.375 * scale,0 * scale));
		path.curveToPoint_controlPoint1_controlPoint2(NSMakePoint(34 * scale,12 * scale),NSMakePoint(18.625 * scale,0 * scale),NSMakePoint(34 * scale,12 * scale));
		path.curveToPoint_controlPoint1_controlPoint2(NSMakePoint(12 * scale,24 * scale),NSMakePoint(34 * scale,12 * scale),NSMakePoint(18.625 * scale,24 * scale));
		path.closePath();
		var flag = MSShapeGroup.shapeWithBezierPath(path);
		flag.style().addStylePartOfType(0).setColor(MSImmutableColor.colorWithIntegerRed_green_blue_alpha(26,173,25,76.5).newMutableCounterpart());
		flag.style().addStylePartOfType(1).setColor(MSImmutableColor.colorWithIntegerRed_green_blue_alpha(26,173,25,255).newMutableCounterpart());
		flag.absoluteRect().setX(linexr);
		flag.absoluteRect().setY(liney);
		flag.setName('___'+count+'___p');

		var textLayer = MSTextLayer.alloc().init();

		if(count.toString().length == 1){
			textLayer.absoluteRect().setX(linexr + (14) * scale/2);
		}else{
			textLayer.absoluteRect().setX(linexr + (10) * scale/2);
		}
		
		textLayer.absoluteRect().setY(liney + 8 * scale / 2 );
		textLayer.setName('___'+count+'___t');
		var fixedBehaviour = 1;
		textLayer.setTextBehaviour(fixedBehaviour);
		textLayer.setStringValue(count.toString());
		textLayer.setTextColor(MSImmutableColor.colorWithIntegerRed_green_blue_alpha(26,173,25,255).newMutableCounterpart());
		textLayer.setFontSize(13 * scale);

		doc.currentPage().addLayers([flag,textLayer]);
		var connectionLayers = MSLayerArray.arrayWithLayers([flag,textLayer]);
		connectionsGroup = MSLayerGroup.groupFromLayers(connectionLayers);
		connectionsGroup.setName(dom.objectID());
		return connectionsGroup;
	}

	var draw = function(doc,nowDom){
		var linkLayersPredicate = NSPredicate.predicateWithFormat("userInfo != nil && function(userInfo, 'valueForKeyPath:', %@).FlagID != nil", kPluginDomain);
		var linkLayers = doc.currentPage().children().filteredArrayUsingPredicate(linkLayersPredicate);
		var loop = linkLayers.objectEnumerator();
		var returnLine = [];
		var flagCount = 1;
		var isDrawNow = false;
		while (linkLayer = loop.nextObject()) {
			var lastState = 'e';
			var lastDom = NSPredicate.predicateWithFormat("userInfo != nil && function(userInfo, 'valueForKeyPath:', %@).FlagID == '"+linkLayer.objectID() + "_l'", kPluginDomain);
			lastDom = doc.currentPage().children().filteredArrayUsingPredicate(lastDom).firstObject();
			if(lastDom){
				lastState = 'l';
				if(lastDom.objectID() == nowDom.objectID()){
					context.command.setValue_forKey_onLayer_forPluginIdentifier(nowDom.objectID() + '_r', "FlagID", nowDom, kPluginDomain);
					lastState = 'r';
					isDrawNow = true;
				}
			}else{
				lastDom = NSPredicate.predicateWithFormat("userInfo != nil && function(userInfo, 'valueForKeyPath:', %@).FlagID == '"+linkLayer.objectID() + "_r'", kPluginDomain);
				lastDom = doc.currentPage().children().filteredArrayUsingPredicate(lastDom).firstObject();

				if(lastDom){
					lastState = 'r';
					if(lastDom.objectID() == nowDom.objectID()){
						context.command.setValue_forKey_onLayer_forPluginIdentifier(nil, "FlagID", nowDom, kPluginDomain);
						lastState = 'e';
						isDrawNow = true;

					}
				}
			}
			
			
			if(lastState == 'l'){
				context.command.setValue_forKey_onLayer_forPluginIdentifier(linkLayer.objectID() + '_l', "FlagID", linkLayer, kPluginDomain);
				returnLine = returnLine.concat(drawLeftArrow(doc,linkLayer,false));
			}else if(lastState == 'r'){
				context.command.setValue_forKey_onLayer_forPluginIdentifier(linkLayer.objectID() + '_r', "FlagID", linkLayer, kPluginDomain);	
				returnLine = returnLine.concat(drawRightArrow(doc,linkLayer));
			}
		}
		if(!isDrawNow){
			context.command.setValue_forKey_onLayer_forPluginIdentifier(nowDom.objectID() + '_l', "FlagID", nowDom, kPluginDomain);
			returnLine = returnLine.concat(drawLeftArrow(doc,nowDom,true));
		}
		return returnLine;
	}


	if (context.selection.count()!=1) {
		NSApp.displayDialog('请选且只选中一个需要添加标志的元素');
        return;
	}

	var selection = context.selection[0];
	var doc = context.document;
	var selectedLayers = doc.findSelectedLayers();



	var flags = [];

	flags = draw(doc,selection);

	var connectionsGroup = getConnectionsGroupInPage(doc.currentPage());

	if (connectionsGroup) {
		connectionsGroup.removeFromParent();
	}

	var connectionLayers = MSLayerArray.arrayWithLayers(flags);
	connectionsGroup = MSLayerGroup.groupFromLayers(connectionLayers);
	connectionsGroup.setName("___flags");
	connectionsGroup.setIsLocked(1);
	context.command.setValue_forKey_onLayer_forPluginIdentifier(true, "isflagContainer", connectionsGroup, kPluginDomain);
	doc.currentPage().deselectAllLayers();
	var loop = selectedLayers.objectEnumerator(), selectedLayer;
	while (selectedLayer = loop.nextObject()) {
		selectedLayer.select_byExpandingSelection(true, true);
	}
}
