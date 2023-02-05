/* Bismillah */

/*

UI COMPONENT TEMPLATE
- You can customize, this template code as you need:


Started Date: 1 October 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Site: https://bug7a.github.io/cordova-mobile-app-ui-template/

*/

"use strict";
const UITableTools = {};

// SHARED VARIABLES:
UITableTools.default = {};
UITableTools.resetDefault = function() {

    UITableTools.default.width = 400;
    UITableTools.default.height = 300;
    UITableTools.default.borderString = "1px solid lightgray";
    UITableTools.default.borderRadius = "6px 6px 6px 6px";
    UITableTools.default.boxShadow = "0px 0px 6px 2px rgba(0, 0, 0, 0.1)";
    UITableTools.default.showWithMotion = 1;

    UITableTools.default.titleHeight = 50;
    UITableTools.default.titleRowBackgroundColor = "whitesmoke";
    UITableTools.default.titleRowBottomBorderString = "1px solid rgba(0, 0, 0, 0.2)";
    UITableTools.default.titleCellBackgroundColor = "whitesmoke";
    UITableTools.default.titleCellRightBorderString = "1px solid rgba(0, 0, 0, 0.08)";
    UITableTools.default.titleCellBottomBorderString = "1px solid rgba(0, 0, 0, 0.2)";
    UITableTools.default.titleFontSize = 16;
    UITableTools.default.titleFontFamily = "opensans-bold";
    UITableTools.default.titleTextAlign = "left"; // "left", "center", "right"
    UITableTools.default.titleTextColor = "rgba(0, 0, 0, 0.8)";
    UITableTools.default.titleBoxShadow = "-2px 0px 8px 2px rgba(0, 0, 0, 0.15)";

    UITableTools.default.itemsCanSelectable = 1; // 1 or 0
    UITableTools.default.itemHeight = "auto"; // "auto" or number like 80
    UITableTools.default.itemRowBottomBorderString = "1px solid rgba(0, 0, 0, 0.1)";
    UITableTools.default.itemCellRightBorderString = "1px solid rgba(0, 0, 0, 0.03)";
    UITableTools.default.itemOddBackgroundColor = "white";
    UITableTools.default.itemEvenBackgroundColor = "whitesmoke";
    UITableTools.default.itemSelectedBackgroundColor = "rgba(254, 193, 8, 0.1)";
    UITableTools.default.itemFontSize = 16;
    UITableTools.default.itemFontFamily = "opensans";
    UITableTools.default.itemTextColor = "rgba(0, 0, 0, 0.7)";
    UITableTools.default.leftRightInnerSpace = 10;
    UITableTools.default.topBottomInnerSpace = 12;

    UITableTools.default.noItemAlert = "There are no records.";
    UITableTools.default.noItemIcon = "No data";

    UITableTools.default.sortingWidth = 14;
    UITableTools.default.sortingHeight = 20;
    UITableTools.default.sortingBackgroundColor = "transparent";
    UITableTools.default.sortingBorderRadius = "2px 2px 2px 2px";
    UITableTools.default.sortingOuterPosition = "left"; // "right"
    UITableTools.default.sortingOuterSpace = 4;
    UITableTools.default.sortingIconSize = 18;
    UITableTools.default.sortingIconFile = "js/components/ui-table/arrow.svg";
    UITableTools.default.sortingIconOpacity = 0.2;
    UITableTools.default.sortingIconSelectedOpacity = 1;
    
    UITableTools.default.bottomBarHeight = 0;
    UITableTools.default.bottomBarBackgroundColor = "whitesmoke";
    UITableTools.default.bottomBarTopBorderString = "1px solid rgba(0, 0, 0, 0.2)";

}
UITableTools.resetDefault();

UITableTools.create = function(parameters = {}) {

    // BOX: UI Table container.
	const box = createBox();

	// Default values.
	box.default = {};
	for (let parameterName in UITableTools.default) {
		box.default[parameterName] = (parameters[parameterName] != undefined) ? parameters[parameterName] : UITableTools.default[parameterName];
	}
	
	// *** PRIVATE VARIABLES:
    let selectedTitleCellIndex = null;
    let selectedSortingType = null;
    let defaulTitleCellIdForSorting = null;
    let defaultSortingType = null;

	// *** PUBLIC VARIABLES:
    box.titleCellDataList = [];
    box.itemDataList = [];
    box.titleCellList = [];
    box.itemList = [];
    box.selectedItem = null;
    box.selectedItemIndex = -1;
    box.sortedItemIndexList = [];
    box.onClickCallback = function() {};
    box.onEditCallback = function() {};
    box.calculatedAutoTitleCellWidth = 0;
	
	// *** OBJECT MODEL:
	box.border = 0;
	box.color = "transparent";
    box.width = box.default.width;
    box.height = box.default.height;
    box.element.style.borderRadius = box.default.borderRadius;
    box.element.style.boxShadow = box.default.boxShadow;
    if (box.default.showWithMotion) {
        box.opacity = 0;
        box.setMotion("opacity 0.3s");
    }
    //box.element.style.whiteSpace = "nowrap";

    // BOX: Items container.
    box.boxItems = createBox();
    box.add(that);
    that.color = "transparent";
    that.width = box.width;
    that.height = box.height - box.default.titleHeight - box.default.bottomBarHeight;
    that.border = 0;
    that.scrollY = 1;
    that.left = 0;
    that.top = box.default.titleHeight;
    that.element.style.display = "flex";
    that.element.style.flexDirection = "row";
    that.element.style.flexWrap = "wrap";
    that.element.style.alignContent = "flex-start";

    // BOX: Titles container.
    box.boxTitles = createBox();
    box.add(that);
    that.color = "transparent";
    that.width = box.width;
    that.height = box.default.titleHeight;
    that.border = 0;
    that.element.style.boxShadow = box.default.titleBoxShadow;
    //that.element.style.display = "flex";
    //that.element.style.flexDirection = "row";
    that.left = 0;
    that.top = 0;

    // BOX: Titles background box.
    box.boxTitles.background = createBox();
    box.boxTitles.add(that);
    that.width = box.width;
    that.element.style.height = "100%";
    that.element.style.borderBottom = box.default.titleRowBottomBorderString;
    that.color = box.default.titleRowBackgroundColor;
    that.round = 0;
    that.left = 0;
    that.top = 0;

    // BOX: Bottom bar.
    box.bottomBar = createBox();
    box.add(that);
    that.color = box.default.bottomBarBackgroundColor;
    that.element.style.borderTop = box.default.bottomBarTopBorderString;
    that.height = box.default.bottomBarHeight;
    that.width = "100%";
    that.left = 0;
    that.top = box.boxItems.top + box.boxItems.height;

    if (box.default.bottomBarHeight > 0) {
        box.boxItems.height += 1;
    }


    // BOX: Table border.
    box.boxBorder = createBox();
    box.add(that);
    that.width = "100%";
    that.height = "100%";
    that.element.style.border = box.default.borderString;
    that.color = "transparent";
    that.element.style.borderRadius = "inherit";
    that.left = 0;
    that.top = 0;
    
    let titleRowStyle = function() {};
    let titleCellStyle = function() {};
    let itemRowStyle = function() {};
    let itemCellStyle = function() {};

    box.setTitleRowStyle = function(func) {
        titleRowStyle = func;
        titleRowStyle(box.boxTitles);
    };

    box.setTitleCellStyle = function(func) {
        titleCellStyle = func;
    };

    box.setItemRowStyle = function(func) {
        itemRowStyle = func;
    };

    box.setItemCellStyle = function(func) {
        itemCellStyle = func;
    };

    const createTitleCell = (titleCellData, titleCellIndex) => {
        
        // BOX: Title cell container
        const titleCell = createBox();
        titleCell.color = "transparent";
        if (typeof titleCellData.width != "number") {
            titleCell.width = box.calculatedAutoTitleCellWidth;
        } else {
            titleCell.width = titleCellData.width;
        }
        titleCell.height = box.default.titleHeight;
        // Data:
        titleCell.data = titleCellData;
        titleCell.index = titleCellIndex;

        // BOX: Title background container
        titleCell.background = createBox();
        titleCell.add(that);
        that.width = "100%";
        that.height = "100%";
        that.color = box.default.titleCellBackgroundColor;
        that.element.style.borderRight = box.default.titleCellRightBorderString;
        that.element.style.borderBottom = box.default.titleCellBottomBorderString;
        that.clickable = 1;
        that.round = 0;
        that.left = 0;
        that.top = 0;

        // LABEL: Title text
        titleCell.label = createLabel();
        titleCell.add(that);
        that.color = "transparent";    
        that.width = "auto";
        that.height = "auto";
        //that.textAlign = titleCellData.titleTextAlign;
        that.element.style.whiteSpace = "nowrap";
        that.element.style.textOverflow = "ellipsis";
        that.left = box.default.leftRightInnerSpace;
        that.fontSize = box.default.titleFontSize;
        that.element.style.fontFamily = box.default.titleFontFamily;
        that.text = titleCellData.name;
        //that.setMotion("top 0.2s");
        //titleCell.label.center("top");

        if (titleCellData.enableSorting == 1) {

            // BOX: Title background container
            titleCell.boxArrows = createBox();
            titleCell.add(that);
            that.width = box.default.sortingWidth;
            that.height = box.default.sortingHeight;
            that.color = box.default.sortingBackgroundColor;
            that.borderColor = "rgba(0, 0, 0, 0.1)";
            that.border = 0;
            that.element.style.borderRadius = box.default.sortingBorderRadius;
            if (box.default.sortingOuterPosition == "right") {
                that.right = box.default.sortingOuterSpace;
            }
            //that.right = box.default.sortingOuterSpace;
            that.element.style.overflow = "visible";
            that.center("top");

            //let arrowSpace = box.default.sortingHeight / 2;
            //arrowSpace += (box.default.sortingIconSpaceBetween / 2);

            // IMAGE: ASC arrow icon
            titleCell.boxArrows.imgArrow = createImage();
            titleCell.boxArrows.add(that);
            that.width = box.default.sortingIconSize;
            that.height = box.default.sortingIconSize;
            that.opacity = box.default.sortingIconOpacity;
            //that.load("js/components/ui-table/asc.svg");
            that.load(box.default.sortingIconFile);
            //that.center("left");
            that.center();
            //that.bottom = arrowSpace;
            that.setMotion("opacity 0.3s, transform 0.3s");

            titleCell.boxArrows.clickable = 0;

            if(titleCellData.sortBy) {
                defaulTitleCellIdForSorting = titleCellData.id;
                defaultSortingType = titleCellData.sortBy;
            }

        }

        titleCell.label.onResize((self) => {

            self.center("top");

            let maxLabelWidth = null;
            if (titleCellData.enableSorting) {
                maxLabelWidth = titleCell.width - (box.default.leftRightInnerSpace * 2) - box.default.sortingWidth - box.default.sortingOuterSpace;
            } else {
                maxLabelWidth = titleCell.width - (box.default.leftRightInnerSpace * 2);
            }

            const currentLabelWidth = self.width;

            if (currentLabelWidth > maxLabelWidth) {
                self.width = maxLabelWidth;
            } 

            if (titleCell.boxArrows) {
                if (box.default.sortingOuterPosition == "left") {
                        titleCell.boxArrows.left = self.left + self.width + box.default.sortingOuterSpace;
                        
                } else if(box.default.sortingOuterPosition == "right") {
                    titleCell.boxArrows.right = box.default.sortingOuterSpace;
                }
            }

        });

        titleCell.position = "relative";
        titleCell.element.style.display = "inline-block";

        titleCell.background.onClick(function titleCellClicked(self) {

            if (titleCellData.enableSorting) {

                if (selectedTitleCellIndex == titleCellIndex) {
                    if (selectedSortingType == "desc") {
                        box.sort(titleCell.data.id ,"asc");

                    } else {
                        box.sort(titleCell.data.id ,"desc");
                    }

                } else {
                    box.sort(titleCell.data.id ,"asc");
                }

            }
        });

        /*
        titleCell.getData = function() {
            return titleCell.data;
        }

        titleCell.getIndex = function() {
            return titleCell.index;
        }
        */

        titleCellStyle(titleCell, titleCellData, titleCellIndex);

        return titleCell;

    };

    const createItemRow = (itemData, itemIndex) => {

        // BOX: Item row container
        const itemRow = createBox();
        itemRow.color = "transparent";
        itemRow.width = box.width;
        itemRow.height = box.default.itemHeight;
        itemRow.data = itemData;
        itemRow.index = itemIndex;
        //itemRow.element.style.verticalAlign = "top";

        // BOX: Item row background container
        itemRow.background = createBox();
        itemRow.add(that);
        that.width = box.width;
        that.element.style.height = "100%";
        that.borderColor = "rgba(0, 0, 0, 0.5)";
        that.color = "transparent";
        that.round = 0;
        that.element.style.borderBottom = box.default.itemRowBottomBorderString;
        that.left = 0;
        that.top = 0;
        that.clickable = 1;
        that.onClick(function(self) {

            if (box.default.itemsCanSelectable) {

                if (box.selectedItem) {
                    box.selectedItem.background.color = box.selectedItem.background.originalColor;
                }
    
                box.selectedItem = itemRow;
                box.selectedItemIndex = itemIndex;
                itemRow.background.color = box.default.itemSelectedBackgroundColor;
            
            }

            box.onClickCallback(itemRow);

        });

        itemRowStyle(itemRow, itemData, itemIndex);
        return itemRow;

    }

    const createItemCell = (itemCellData, titleCellData, itemRow, itemCellIndex) => {

        // BOX: Item cell container
        const itemCell = createBox();
        itemCell.color = "transparent";
        //itemCell.width = titleCellData.width || 100;
        if (typeof titleCellData.width != "number") {
            itemCell.width = box.calculatedAutoTitleCellWidth;
        } else {
            itemCell.width = titleCellData.width;
        }
        itemCell.element.style.height = "100%";
        
        // BOX: Title background container
        itemCell.background = createBox();
        itemCell.add(that);
        that.width = "100%";
        //that.height = itemCell.height;
        that.element.style.height = "100%";
        that.round = 0;
        that.border = 0;
        that.element.style.borderRight = box.default.itemCellRightBorderString
        that.color = "transparent";
        that.left = 0;
        that.top = 0;

        // LABEL: Title
        itemCell.label = createLabel();
        itemCell.add(that);
        that.color = "transparent";
        that.width = itemCell.width - (box.default.leftRightInnerSpace * 2);
        that.element.style.fontFamily = box.default.itemFontFamily;
        that.textColor = box.default.itemTextColor;
        that.textAlign = titleCellData.itemTextAlign || "left";
        // set item height or auto:
        that.height = "auto";
        if (box.default.itemHeight == "auto") {
            that.element.style.whiteSpace = "normal";
        } else {
            that.element.style.whiteSpace = "nowrap";
        }
        that.element.style.textOverflow = "ellipsis";
        that.fontSize = box.default.itemFontSize;
        that.text = str(itemCellData);
        that.left = box.default.leftRightInnerSpace;
        //that.top = box.default.topBottomInnerSpace;

        if(itemCellData != undefined) {
            itemCell.label.text = itemCellData;
        } else {
            itemCell.label.text = "";
        }

        //that.element.style.position = "relative";
        that.onResize((self) => {
            if (box.default.itemHeight == "auto") {
                if ((itemCell.label.height+(box.default.topBottomInnerSpace*2)) >= itemRow.height) {
                    itemRow.height = itemCell.label.height + (box.default.topBottomInnerSpace*2);
                }
            } else {
                itemRow.height = box.default.itemHeight;
            }
            itemCell.label.top = (itemCell.element.offsetHeight - itemCell.label.height)/2;
        });

        itemCell.onResize((self) => {
            self.label.width = itemCell.width - (box.default.leftRightInnerSpace * 2);
            self.label.top = (self.element.offsetHeight - self.label.height)/2;
        });

        // BOX: Title background container
        itemCell.box = createBox();
        itemCell.add(that);
        that.width = itemCell.width;
        //that.height = itemCell.height;
        that.element.style.height = "100%";
        that.borderColor = "rgba(0, 0, 0, 0.1)";
        that.round = 0;
        that.border = 0;
        that.color = "transparent";
        that.left = 0;
        that.top = 0;

        itemCell.clickable = 0;

        itemCellStyle(itemCell, itemCellData, titleCellData, itemRow, itemCellIndex);
        return itemCell;
        
    }

    const createItemRowWithCells = (itemData, itemRowIndex) => {

        const itemRow  = createItemRow(itemData, itemRowIndex);
        itemRow.element.style.order = basic.str(itemRowIndex);
        itemRow.element.style.whiteSpace = "nowrap";
        itemRow.cellList = [];

        for(var i = 0; i < box.titleCellDataList.length; i++) {
            //print(box.titleCellDataList[i]);
            const itemCell = createItemCell(itemData[box.titleCellDataList[i].itemDataIndex], box.titleCellDataList[i], itemRow, i);
            itemRow.add(itemCell);
            itemCell.position = "relative";
            itemCell.element.style.display = "inline-block";
            itemCell.element.style.verticalAlign = "top";
            itemRow.cellList.push(itemCell);
        }

        return itemRow;

    }

    box.createTitles = (titleDataList) => {
        box.titleCellDataList = [...titleDataList];

        calcTitleCellWidths();

        box.titleCellList = [];
        for(var i = 0; i < box.titleCellDataList.length; i++) {
            const titleCell = createTitleCell(box.titleCellDataList[i], i);
            box.boxTitles.add(titleCell);
            box.titleCellList.push(titleCell);
        }
        makeBasicObject(box);
    };

    const calcTitleCellWidths = function() {

        let autoWidthCount = 0;
        let totalWidth = 0;

        for(var i = 0; i < box.titleCellDataList.length; i++) {
            if(box.titleCellDataList[i].width == undefined || box.titleCellDataList[i].width == "auto") {
                autoWidthCount++;
            } else {
                totalWidth += box.titleCellDataList[i].width;
            }
        }

        let tableWidth = box.width;

        box.calculatedAutoTitleCellWidth = (tableWidth - totalWidth) / autoWidthCount;
        if (typeof box.calculatedAutoTitleCellWidth != "number") {
            box.calculatedAutoTitleCellWidth = 0;
        }
        
    }

    box.createItems = function(itemDataList) {

        box.itemDataList = [...itemDataList];
        box.itemList = [];
        for(var i = 0; i < itemDataList.length; i++) {
            box.itemDataList[i].originalIndex = i;
            const item = createItemRowWithCells(itemDataList[i], i);
            //title.left = 0;
            //title.top = 0;
            item.position = "relative";
            //item.element.style.display = "inline-block";
            box.boxItems.add(item);
            box.itemList.push(item);
            box.sortedItemIndexList.push(i);
        }
        refreshItemBackgrounds();
        if (defaulTitleCellIdForSorting) {
            box.sort(defaulTitleCellIdForSorting ,defaultSortingType);
        }
        makeBasicObject(box);
    }

    box.filterByText = function(filterText) {

        for ( var i = 0; i < box.itemDataList.length; i++) {

            let result = -1;
            let visible = 0;

            for ( var j = 0; j < box.titleCellDataList.length; j++) {

                let fullText = box.itemDataList[i][box.titleCellDataList[j].itemDataIndex];
                
                if (typeof fullText !== "string") {
                    fullText = JSON.stringify(fullText);
                }

                print(fullText);
                fullText = fullText.toLowerCase();
                result = fullText.search(filterText.toLowerCase());

                if (result > -1) {
                    visible = 1;
                    break;
                }

            }

            box.itemList[i].visible = visible;

        }

        refreshItemBackgrounds();

    };

    const showSortingAtTitle = function(titleCell, sortingType) {
        
        if (sortingType == "asc") {

            selectedSortingType = "asc";
            titleCell.boxArrows.imgArrow.opacity = box.default.sortingIconSelectedOpacity;
            titleCell.boxArrows.imgArrow.rotate = 0;

        } else if (sortingType == "desc") {

            selectedSortingType = "desc";
            titleCell.boxArrows.imgArrow.opacity = box.default.sortingIconSelectedOpacity;
            titleCell.boxArrows.imgArrow.rotate = 180;

        }

    }

    const clearSortingAtAllTitles = function() {

        for(var i = 0; i < box.titleCellList.length; i++) {
            if (box.titleCellDataList[i].enableSorting == 1) {
                box.titleCellList[i].boxArrows.imgArrow.load(box.default.sortingIconFile);
                box.titleCellList[i].boxArrows.imgArrow.opacity = box.default.sortingIconOpacity;
                box.titleCellList[i].boxArrows.imgArrow.rotate = 0;
            }
        }

    }

    box.sort = function(titleId, sortingType = "asc") {

        box.boxItems.element.scrollTo({
            top: 0,
            left: 0,
            //behavior: 'smooth'
          });

        const titleCell = box.getTitleCellById(titleId);
        const titleCellIndex = titleCell.index;
        const itemDataIndex = titleCell.data.itemDataIndex;
        const itemDataType = titleCell.data.itemDataType;

        clearSortingAtAllTitles();

        selectedTitleCellIndex = titleCellIndex;
        selectedSortingType = sortingType;
        
        showSortingAtTitle(titleCell, sortingType);
        sortItems(itemDataIndex, sortingType, itemDataType);

    }

    box.clearSorting = function() {

        clearSortingAtAllTitles();
        // sort items with original index.

    }

    box.getTitleCellById = function(titleId) {

        for(var i = 0; i < box.titleCellList.length; i++) {
            if(box.titleCellList[i].data.id == titleId) {
                return box.titleCellList[i];
            }
        }
        
        return null;

    }

    box.getTitleIndexById = function(titleId) {

        for(var i = 0; i < titleDataList.length; i++) {
            if(titleDataList[i].id == titleId) {
                return i;
            }
        }

        return -1;

    }

    const sortItems = function(itemDataIndex = 0, sortingType = "asc", itemDataType = "string") {

        const itemDataList = [...box.itemDataList];

        if (itemDataType == "integer" || itemDataType == "float") {
            if (sortingType === "asc") {

                itemDataList.sort((a, b) => {
                    if (parseFloat(a[itemDataIndex]) < parseFloat(b[itemDataIndex])) return -1;
                    if (parseFloat(a[itemDataIndex]) > parseFloat(b[itemDataIndex])) return 1;
                    return 0;
                });

            } else if (sortingType === "desc") {

                itemDataList.sort((a, b) => {
                    if (parseFloat(a[itemDataIndex]) < parseFloat(b[itemDataIndex])) return 1;
                    if (parseFloat(a[itemDataIndex]) > parseFloat(b[itemDataIndex])) return -1;
                    return 0;
                });

            }
        } else if (itemDataType == "string") {
            if (sortingType === "asc") {

                itemDataList.sort((a, b) => {
                    if (a[itemDataIndex] < b[itemDataIndex]) return -1;
                    if (a[itemDataIndex] > b[itemDataIndex]) return 1;
                    return 0;
                });

            } else if (sortingType === "desc") {

                itemDataList.sort((a, b) => {
                    if (a[itemDataIndex] < b[itemDataIndex]) return 1;
                    if (a[itemDataIndex] > b[itemDataIndex]) return -1;
                    return 0;
                });

            }
        }

        box.sortedItemIndexList = [];

        for(var i = 0; i < itemDataList.length; i++) {

            const item = box.itemList[itemDataList[i].originalIndex];
            item.element.style.order = i;

            box.sortedItemIndexList.push(itemDataList[i].originalIndex);

        }

        refreshItemBackgrounds();

    }

    const refreshItemBackgrounds = function() {

        let typeNumber = 1;

        for (var i = 0; i < box.sortedItemIndexList.length; i++) {

            const item = box.itemList[box.sortedItemIndexList[i]];

            if (item.visible == 1) {
                if (typeNumber == 1) {
                    // Item odd background.
                    item.background.originalColor = box.default.itemOddBackgroundColor;
                    item.background.color = box.default.itemOddBackgroundColor;
                    typeNumber = 2;
                
                } else {
                    // Item even backround.
                    item.background.originalColor = box.default.itemEvenBackgroundColor;
                    item.background.color = box.default.itemEvenBackgroundColor;
                    typeNumber = 1;
                }
            }

        } // end for

        // Item selected background.
        if (box.selectedItem) {
            box.selectedItem.background.color = box.default.itemSelectedBackgroundColor;
        }
        
    };

    box.getTitleCellWidthById = function(id) {
        
        let titleCellWidth = 0;
        
        for(var i = 0; i < box.titleCellDataList.length; i++) {
            if(box.titleCellDataList[i].id == id) {
                if (typeof box.titleCellDataList[i].width != "number") {
                    titleCellWidth = box.calculatedAutoTitleCellWidth;
                } else {
                    titleCellWidth = box.titleCellDataList[i].width;
                }
                break;
            }
        }

        return titleCellWidth;

    }

    box.setTitleCellWidthById = function(id, width) {

        for(var i = 0; i < box.titleCellDataList.length; i++) {
            if(box.titleCellDataList[i].id == id) {
                box.titleCellDataList[i].width = width;
                break;
            }
        }

        calcTitleCellWidths();

        for(var i = 0; i < box.titleCellDataList.length; i++) {

            if (typeof box.titleCellDataList[i].width != "number") {
                box.titleCellList[i].width = box.calculatedAutoTitleCellWidth;
            } else {
                box.titleCellList[i].width = box.titleCellDataList[i].width;
            }

            for(var j = 0; j < box.itemList.length; j++) {
                box.itemList[j].cellList[i].width = box.titleCellList[i].width;
            }

        }

    }

    box.on = function(event, callback) {
        switch (event) {
            case "click":
                box.onClickCallback = callback;
                break;
            case "edit":
                box.onEditCallback = callback;
                break;
        }
    }

	// *** FIRST RUN CODE:
    /*
	box.boxDecrease.onClick(decreaseNumber);
	box.boxIncrease.onClick(increaseNumber);
	box.setValue(num(currentValue));
	box.refreshButtonsOpacity();
    */
    // Show the table:
    if (box.default.showWithMotion) {
        box.withMotion(function(self) {
            self.opacity = 1;
        });
    }

	makeBasicObject(box);
	return box;
    
}


// SHARED METHODS:
UITableTools.sharedMethod = function() {
	return "sharedMethod";
}