
/*

UI TABLE v1.2

Started Date: 1 October 2022
Developer: Bugra Ozden
Email: bugra.ozden@gmail.com
Web Site: https://bugraozden.com/

*/

"use strict";
window.UITable = {};

// SHARED VARIABLES:
UITable.default = {};
UITable.resetDefault = function() {

    // Table Options

    UITable.default.width = "100%"; // "100%", "calc(100% - 20px)" or number.
    UITable.default.height = "100%"; // "100%", "calc(100% - 20px)", "auto" or number.
    UITable.default.showWithMotion = 1; // 1 or 0
    UITable.default.borderString = "1px solid lightgray";
    UITable.default.borderRadius = "6px 6px 6px 6px";
    UITable.default.boxShadow = "0px 0px 6px 2px rgba(0, 0, 0, 0.1)"; // "none"
    UITable.default.backgroundColor = "white";

    UITable.default.titleHeight = 50; // only number
    UITable.default.titleTopInnerSpace = "auto"; // "auto" or number
    UITable.default.titleRowBackgroundColor = "whitesmoke";
    UITable.default.titleRowBottomBorderString = "1px solid rgba(0, 0, 0, 0.2)"; // "none"
    UITable.default.titleCellBackgroundColor = "whitesmoke";
    UITable.default.titleCellRightBorderString = "1px solid rgba(0, 0, 0, 0.08)";
    UITable.default.titleCellBottomBorderString = "1px solid rgba(0, 0, 0, 0.2)";
    UITable.default.titleFontSize = 16;
    UITable.default.titleFontFamily = "opensans-bold";
    UITable.default.titleTextColor = "rgba(0, 0, 0, 0.8)";
    UITable.default.titleBoxShadow = "-2px 0px 8px 2px rgba(0, 0, 0, 0.15)";
    UITable.default.createTitleCellContentBox = 0; // for special cell content.
    UITable.default.createTitleCellBackground = 1; // for special cell background.

    UITable.default.itemsCanSelectable = 1; // 1 or 0
    UITable.default.noItemAddedAlert = "There are no records.";
    UITable.default.noItemFoundAlert = "No records found.";
    UITable.default.itemHeight = "auto"; // "auto" or number like 80
    UITable.default.itemRowBottomBorderString = "1px solid rgba(0, 0, 0, 0.1)";
    UITable.default.itemCellRightBorderString = "1px solid rgba(0, 0, 0, 0.03)";
    UITable.default.itemOddBackgroundColor = "white";
    UITable.default.itemEvenBackgroundColor = "whitesmoke";
    UITable.default.itemSelectedBackgroundColor = "rgba(254, 193, 8, 0.1)";
    UITable.default.itemFontSize = 16;
    UITable.default.itemFontFamily = "opensans";
    UITable.default.itemTextColor = "rgba(0, 0, 0, 0.7)";
    UITable.default.leftRightInnerSpace = 10;
    UITable.default.topBottomInnerSpace = 12;
    UITable.default.createItemCellContentBox = 0; // for special cell content.
    UITable.default.createItemCellBackground = 0; // for special cell background.
    UITable.default.itemIdValueIndex = 0;

    UITable.default.sortingWidth = 14;
    UITable.default.sortingHeight = 20;
    UITable.default.sortingBackgroundColor = "transparent";
    UITable.default.sortingBorderRadius = "2px 2px 2px 2px";
    UITable.default.sortingOuterPosition = "left"; // "left" or "right"
    UITable.default.sortingOuterSpace = 4;
    UITable.default.sortingIconSize = 18;
    UITable.default.sortingIconFile = "js/components/ui-table/arrow.svg";
    UITable.default.sortingIconOpacity = 0.2;
    UITable.default.sortingIconSelectedOpacity = 1;
   
    UITable.default.topBarHeight = 0;
    UITable.default.topBarBackgroundColor = "whitesmoke";
    UITable.default.topBarBottomBorderString = "0px solid rgba(0, 0, 0, 0.2)";

    UITable.default.bottomBarHeight = 0;
    UITable.default.bottomBarBackgroundColor = "whitesmoke";
    UITable.default.bottomBarTopBorderString = "1px solid rgba(0, 0, 0, 0.2)";

}
UITable.resetDefault();

UITable.create = function(parameters = {}) {

    // BOX: UI Table container.
	const box = createBox();

	// Default values.
	box.default = {};
	for (let parameterName in UITable.default) {
		box.default[parameterName] = (parameters[parameterName] != undefined) ? parameters[parameterName] : UITable.default[parameterName];
	}
	
	// *** PRIVATE VARIABLES:
    let selectedTitleCellIndex = null;
    let selectedSortingType = null;
    let defaulTitleCellIdForSorting = null;
    let defaultSortingType = null;
    let shownItemCount = 0;

	// *** PUBLIC VARIABLES:
    box.titleCellDataList = [];
    box.itemDataList = [];
    box.titleCellList = [];
    box.itemList = [];
    box.selectedItem = null;
    box.selectedItemIndex = -1;
    box.sortedItemIndexList = [];
    box.onClickFunc = function() {};
    box.onEditFunc = function() {};
    box.calculatedAutoTitleCellWidth = 0;
	
	// *** OBJECT MODEL:
	box.border = 0;
	box.color = box.default.backgroundColor;
    box.width = box.default.width;
    box.height = box.default.height;
    box.element.style.borderRadius = box.default.borderRadius;
    box.element.style.boxShadow = box.default.boxShadow;
    if (box.default.showWithMotion) {
        box.opacity = 0;
        box.setMotion("opacity 0.3s");
    }
    // .top ve .left nesne dışında belirlenmeli.

    // LABEL: No item found alert.
    box.alert = createLabel();
    box.add(that);
    that.width = "auto";
    that.height = "auto";
    that.spaceX = 16;
    that.spaceY = 8;
    that.round = 6;
    that.fontSize = 16;
    //that.color = "rgba(0, 0, 0, 0.05)";
    that.text = "";
    // .center() iki yerde çalıştırılıyor.
    // onResize ve resizeTable da.

    box.alert.onResize(function(self) {
        box.alert.center();
    });

    // BOX: Items container.
    box.boxItems = createBox();
    box.add(that);
    that.color = "transparent";
    that.width = "100%";
    //that.height = box.height - box.default.titleHeight - box.default.bottomBarHeight - box.default.topBarHeight;
    that.border = 0;
    that.scrollY = 1;
    that.element.style.overflowY = "auto";
    //that.left = 0;
    //that.top = box.default.topBarHeight + box.default.titleHeight;
    that.element.style.display = "flex";
    that.element.style.flexDirection = "row";
    that.element.style.flexWrap = "wrap";
    that.element.style.alignContent = "flex-start";
    // .top ve .left: resizeTable da veriliyor.

    // BOX: Titles container.
    box.boxTitles = createBox();
    box.add(that);
    that.color = "transparent";
    that.width = "100%";
    that.height = box.default.titleHeight;
    that.border = 0;
    that.element.style.boxShadow = box.default.titleBoxShadow;
    that.element.style.whiteSpace = "nowrap";
    that.left = 0;
    that.top = box.default.topBarHeight;

    // BOX: Titles background box.
    box.boxTitles.background = createBox();
    box.boxTitles.add(that);
    that.width = "100%";
    that.height = "100%";
    that.element.style.borderBottom = box.default.titleRowBottomBorderString;
    that.color = box.default.titleRowBackgroundColor;
    that.round = 0;
    that.left = 0;
    that.top = 0;
    that.element.setAttribute("id", "titles-background")

    // BOX: Top bar.
    box.topBar = createBox();
    box.add(that);
    that.color = box.default.topBarBackgroundColor;
    that.element.style.borderBottom = box.default.topBarBottomBorderString;
    that.height = box.default.topBarHeight;
    that.width = "100%";
    that.left = 0;
    that.top = 0;
    if (box.default.topBarHeight == 0) {
        box.topBar.visible = 0;
    }

    // BOX: Bottom bar.
    box.bottomBar = createBox();
    box.add(that);
    that.color = box.default.bottomBarBackgroundColor;
    that.element.style.borderTop = box.default.bottomBarTopBorderString;
    that.height = box.default.bottomBarHeight;
    that.width = "100%";
    that.left = 0;
    if (box.default.bottomBarHeight == 0) {
        box.bottomBar.visible = 0;
    }
    // .top, resizeTable da veriliyor.

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

    const resizeTable = function() {

        if(box.resizeTimer) {
            clearTimeout(box.resizeTimer);
        }

        box.resizeTimer = setTimeout(function() {

            box.boxItems.height = box.height - box.default.titleHeight - box.default.bottomBarHeight - box.default.topBarHeight;
            box.boxItems.left = 0;
            box.boxItems.top = box.default.topBarHeight + box.default.titleHeight;

            calcTitleCellWidths();

            for(var i = 0; i < box.titleCellDataList.length; i++) {
                if (box.titleCellDataList[i].width == "auto") {

                    box.titleCellList[i].width = checkTitleCellWidth(box.titleCellList[i], "auto");

                    // Tüm item cell lerin genişliğini title cell ile aynı yap.
                    const width = box.titleCellList[i].width;
                    for(var j = 0; j < box.itemList.length; j++) {
                        box.itemList[j].cellList[i].width = width;
                    }
                }
            }

            box.bottomBar.top = box.boxItems.top + box.boxItems.height;

            box.alert.center();

        }, 5); // Don't run this function twice in less than 5ms.

    }

    const createTitleCell = (titleCellData, titleCellIndex) => {
        
        // BOX: Title cell container
        const titleCell = createBox();
        titleCell.data = titleCellData;
        titleCell.index = titleCellIndex;
        titleCell.color = "transparent";
        titleCell.height = box.default.titleHeight;
        titleCell.width = checkTitleCellWidth(titleCell, titleCellData.width);

        if (box.default.createTitleCellBackground == 1) {

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

        }

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
            //that.center("top");

            // IMAGE: ASC DESC arrow icon
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

        const resetLabelWidth = function(self) {

            // label ın alabileceği maksimum genişliği hesapla.
            let maxLabelWidth = null;
            if (titleCellData.enableSorting) {
                maxLabelWidth = titleCell.width - (box.default.leftRightInnerSpace * 2) - box.default.sortingWidth - box.default.sortingOuterSpace;
            } else {
                maxLabelWidth = titleCell.width - (box.default.leftRightInnerSpace * 2);
            }

            // değer sıfırın altında olamaz.
            if(maxLabelWidth < 0) {
                maxLabelWidth = 0;
            }

            const currentLabelWidth = self.width;

            // label ın maksimum genişliğini ver.
            if (currentLabelWidth > maxLabelWidth) {
                self.width = maxLabelWidth;
            } 

            // label a göre sorting i x düzleminde konumlandır.
            if (titleCell.boxArrows) {
                if (box.default.sortingOuterPosition == "left") {
                        titleCell.boxArrows.left = self.left + self.width + box.default.sortingOuterSpace;
                        
                } else if(box.default.sortingOuterPosition == "right") {
                    titleCell.boxArrows.right = box.default.sortingOuterSpace;
                }
            }

        }

        titleCell.label.onResize(function titleCellLabelResized(self) {

            // label ı ortala veya yukarı sabitle
            if (box.default.titleTopInnerSpace == "auto") {
                self.center("top");
            } else {
                self.top = box.default.titleTopInnerSpace;
            }
            
            // sorting var ise label a göre y konumunu ayarla.
            if (titleCellData.enableSorting) {
                const boxArrowTop = (((box.default.sortingHeight - self.height) / 2) * -1) + self.top;
                titleCell.boxArrows.top = boxArrowTop;
            }

            resetLabelWidth(self);

        });

        
        titleCell.onResize(function(self) {

            titleCell.label.width = "auto";
            resetLabelWidth(titleCell.label);

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

        if (box.default.createTitleCellContentBox == 1) {

            // BOX: title content container.
            titleCell.box = createBox();
            titleCell.add(that);
            that.width = "100%";
            that.height = "100%";
            that.round = 0;
            that.border = 0;
            that.color = "transparent";
            that.left = 0;
            that.top = 0;

        }

        titleCellStyle(titleCell, titleCellData, titleCellIndex);

        return titleCell;

    };

    const createItemRow = function(itemData, itemIndex) {

        // BOX: Item row container
        const itemRow = createBox();
        itemRow.color = "transparent";
        itemRow.width = "100%";
        itemRow.height = box.default.itemHeight;
        itemRow.data = itemData;
        itemRow.index = itemIndex;
        //itemRow.highestLabelHeight = 0;
        //itemRow.element.style.verticalAlign = "middle";

        // BOX: Item row background container
        itemRow.background = createBox();
        itemRow.add(that);
        that.width = "100%";
        that.height = "100%";
        that.borderColor = "rgba(0, 0, 0, 0.5)";
        that.color = "transparent";
        that.round = 0;
        that.element.style.borderBottom = box.default.itemRowBottomBorderString;
        that.left = 0;
        that.top = 0;
        that.clickable = 1;
        that.onClick(function(self) {

            const result = box.selectItemById(itemRow.data[0]);
            if (result == 1) {
                box.onClickFunc(itemRow);
            }
            /*
            if (box.default.itemsCanSelectable) {

                if (box.selectedItem) {
                    box.selectedItem.background.color = box.selectedItem.background.originalColor;
                }
    
                box.selectedItem = itemRow;
                box.selectedItemIndex = itemIndex;
                itemRow.background.color = box.default.itemSelectedBackgroundColor;

                box.onClickFunc(itemRow);
            
            }
            */

        });

        itemRowStyle(itemRow, itemData, itemIndex);
        return itemRow;

    }

    const createItemCell = function(itemCellData, titleCellData, itemRow, itemCellIndex) {

        // BOX: Item cell container
        const itemCell = createBox();
        itemCell.color = "transparent";
        // if auto width than use calculatedAutoTitleCellWidth
        itemCell.width = box.titleCellList[itemCellIndex].width;

        itemCell.height = "100%";
        
        if (box.default.createItemCellBackground) {

            // BOX: Title background container
            itemCell.background = createBox();
            itemCell.add(that);
            that.width = "100%";
            //that.height = itemCell.height;
            that.height = "100%";
            that.round = 0;
            that.border = 0;
            that.element.style.borderRight = box.default.itemCellRightBorderString
            that.color = "transparent";
            that.left = 0;
            that.top = 0;

        }

        // LABEL: Text
        itemCell.label = createLabel();
        itemCell.add(that);
        that.color = "transparent";
        that.width = itemCell.width - (box.default.leftRightInnerSpace * 2);
        that.element.style.fontFamily = box.default.itemFontFamily;
        that.textColor = box.default.itemTextColor;
        that.textAlign = titleCellData.itemTextAlign || "left";

        // Otomatik yükseklik değil ise tek satır metin olsun.
        if (box.default.itemHeight == "auto") {
            that.element.style.whiteSpace = "normal";
        } else {
            that.element.style.whiteSpace = "nowrap";
        }
        that.element.style.textOverflow = "ellipsis";
        that.fontSize = box.default.itemFontSize;
        that.text = str(itemCellData);
        that.left = box.default.leftRightInnerSpace;

        if(itemCellData != undefined) {
            itemCell.label.text = itemCellData;
        } else {
            itemCell.label.text = "";
        }

        if (box.default.createItemCellContentBox == 1) {

            // BOX: Item content container.
            itemCell.box = createBox();
            itemCell.add(that);
            that.width = "100%";
            that.height = "100%";
            that.round = 0;
            that.border = 0;
            that.color = "transparent";
            that.left = 0;
            that.top = 0;

        }
        
        itemCell.label.onResize(function(self) {

            // itemRow yüksekliği otomatik hesaplanır.
            if (box.default.itemHeight == "auto") {

                // En yüksek label nesnesinin yüksekliğini bul.
                let highestLabelHeight = 0;

                for(var i = 0; i < itemRow.cellList.length; i++) {
                    if (itemRow.cellList[i].label.height > highestLabelHeight) {
                        highestLabelHeight = itemRow.cellList[i].label.height
                    }
                }

                // itemRow un yüksekliğini, en yüksek label e göre ayarla.
                if (itemCell.label.height >= highestLabelHeight) {
                    itemRow.height = itemCell.label.height + (box.default.topBottomInnerSpace * 2);
                }
                
            // itemRow yüksekliği sabit.
            } else {
                itemRow.height = box.default.itemHeight;
            }

            //itemCell.label.top = (itemCell.element.offsetHeight - itemCell.label.height) / 2;

        });

        itemCell.onResizeCallback = function() {};
        
        itemCell.onResize((self) => {

            // itemCell boyutu değiştiğinde, label i sığdır.
            itemCell.label.width = itemCell.width - (box.default.leftRightInnerSpace * 2);
            itemCell.label.top = (itemCell.element.offsetHeight - itemCell.label.height) / 2;

            itemCell.onResizeCallback(self);

        });

        itemCell.on = function(event, callback) {
            switch (event) {
                case "resize_override":
                    itemCell.onResizeCallback = callback;
                    break;
            }
        }

        itemCell.clickable = 0;

        // itemCell i özelleştir.
        itemCellStyle(itemCell, itemCellData, titleCellData, itemRow, itemCellIndex);
        
        return itemCell;
        
    }

    const createItemRowWithCells = (itemData, itemRowIndex) => {

        const itemRow  = createItemRow(itemData, itemRowIndex);

        itemRow.element.style.order = basic.str(itemRowIndex);
        itemRow.element.style.whiteSpace = "nowrap";
        itemRow.cellList = [];

        for(var i = 0; i < box.titleCellDataList.length; i++) {

            const itemCell = createItemCell(itemData[box.titleCellDataList[i].itemDataIndex], box.titleCellDataList[i], itemRow, i);
            itemRow.add(itemCell);
            itemCell.position = "relative";
            itemCell.element.style.display = "inline-block";
            itemCell.element.style.verticalAlign = "top";
            itemRow.cellList.push(itemCell);

        }

        return itemRow;

    }

    box.createTitles = function(titleDataList) {

        box.clearTitles();

        box.titleCellDataList = [...titleDataList];

        for(var i = 0; i < box.titleCellDataList.length; i++) {

            if (!box.titleCellDataList[i].width) {
                box.titleCellDataList[i].width = "auto";
            }

            if (!box.titleCellDataList[i].itemDataType) {
                box.titleCellDataList[i].itemDataType = "string";
            }

            if (!box.titleCellDataList[i].itemTextAlign) {
                box.titleCellDataList[i].itemTextAlign = "left";
            }

        }

        calcTitleCellWidths();

        box.titleCellList = [];
        for(var i = 0; i < box.titleCellDataList.length; i++) {
            const titleCell = createTitleCell(box.titleCellDataList[i], i);
            box.boxTitles.add(titleCell);
            box.titleCellList.push(titleCell);
        }
        makeBasicObject(box);
    };

    box.clearTitles = function() {

        box.clearItems();
        
        for(var i = 0; i < box.titleCellList.length; i++) {
            box.titleCellList[i].remove();
        }
        box.titleCellDataList = [];
        //box.boxTitles.html = "";
        box.titleCellList = [];

    }

    const calcTitleCellWidths = function() {

        let autoWidthCount = 0;
        let totalWidth = 0;

        for(var i = 0; i < box.titleCellDataList.length; i++) {
            if(box.titleCellDataList[i].width == "auto") {
                autoWidthCount++;
            } else {
                totalWidth += box.titleCellDataList[i].width;
            }
        }

        let tableWidth = box.width;

        box.calculatedAutoTitleCellWidth = (tableWidth - totalWidth) / autoWidthCount;
        
    }

    box.createItems = function(itemDataList) {

        box.clearItems();

        box.itemDataList = [...itemDataList];
        box.itemList = [];

        for(var i = 0; i < itemDataList.length; i++) {

            box.itemDataList[i].originalIndex = i;
            const item = createItemRowWithCells(itemDataList[i], i);
            box.boxItems.add(item);
            item.position = "relative";
            box.itemList.push(item);
            box.sortedItemIndexList.push(i);

        }

        // Görünen item sayısı.
        shownItemCount = box.itemDataList.length;
        checkAlert();

        refreshItemBackgrounds();
        
        // itemleri, ilk eklendiğinde; belirlenen standarta göre diz.
        if (defaulTitleCellIdForSorting) {
            box.sort(defaulTitleCellIdForSorting ,defaultSortingType);
        }

        makeBasicObject(box);

    }

    box.clearItems = function() {

        //box.boxItems.html = "";
        for(var i = 0; i < box.itemList.length; i++) {
            box.itemList[i].remove();
        }

        box.itemDataList = [];
        box.itemList = [];
        box.sortedItemIndexList = [];
        shownItemCount = 0;
        checkAlert();

    }

    box.updateItems = function(itemDataList) {

        let newItemDataList = [...itemDataList];
        let newItemList = [];
        box.sortedItemIndexList = [];

        for(var i = 0; i < newItemDataList.length; i++) {

            let oldItemIndex = -1;

            // Eğer bu id yi kullanan eski bir kayıt var ise onun index ini bul.
            for(var j = 0; j < box.itemDataList.length; j++) {
                if(newItemDataList[i][0] == box.itemDataList[j][0]) {
                    oldItemIndex = j;
                    break;
                }
            }

            let item = null;
            newItemDataList[i].originalIndex = i;

            // Refresh item:
            if (oldItemIndex != -1) {

                item = box.itemList[j];

                // Eski item i bul ve düzenle.
                for(var k = 0; k < box.titleCellDataList.length; k++) {

                    const label = item.cellList[k].label;
                    const newDataText = newItemDataList[i][box.titleCellDataList[k].itemDataIndex];

                    if (label.text != newDataText && typeof newDataText == "string") {
                        label.text = newDataText;
                    }

                    // item in data sını güncelle.
                    item.index = i;
                    item.data = newItemDataList[i];

                    // itemCell i özelleştir.
                    itemCellStyle(item.cellList[k], newDataText, box.titleCellDataList[k], item, k);

                }

            // Add new item:
            } else {

                // Yeni item oluştur ve düzenle
                item = createItemRowWithCells(newItemDataList[i], i);
    
                box.boxItems.add(item);
                item.position = "relative";

            }

            // Yeni ve eski itemleri sırala
            item.element.style.order = basic.str(i);

            // Yeni listelere ekle
            newItemList.push(item);
            box.sortedItemIndexList.push(i);

        }

        for (var i = 0; i < box.itemList.length; i++) {

            let itemFoundAt = -1;
            
            for(var j = 0; j < newItemList.length; j++) {
                if (box.itemList[i].data[0] == newItemList[j].data[0]) {
                    itemFoundAt = j;
                    break;
                }
            }
            
            if (itemFoundAt == -1) {
                // TODO: can remove in box.boxItems object too.
                box.itemList[i].remove();
            }

        }

        // Eski listeleri güncelle
        box.itemDataList = newItemDataList;
        box.itemList = newItemList;

        // Görünen item sayısı.
        shownItemCount = box.itemDataList.length;
        checkAlert();

        // Seçili item i güncelle veya silinmişse seçimi temizle
        let selectedItemFoundAt = -1;
            
        for(var j = 0; j < box.itemList.length; j++) {
            if (box.itemList[j] == box.selectedItem) {
                selectedItemFoundAt = j;
                break;
            }
        }
        
        if (selectedItemFoundAt == -1) {
            box.selectedItem = null;
            box.selectedItemIndex = -1;

        } else {
            box.selectedItemIndex = selectedItemFoundAt;
        }

        refreshItemBackgrounds();

        //print(selectedTitleCellIndex);
        //print(selectedSortingType);
        //print(box.getTitleCellById(selectedTitleCellIndex));
        box.sort(box.titleCellList[selectedTitleCellIndex || 0].data.id, selectedSortingType);

        makeBasicObject(box);

    }

    box.getEditedItemDataList = function() {
        return [...box.itemDataList];
    }

    box.filterByText = function(filterText, titleCellId) {

        let itemCount = 0;

        for ( var i = 0; i < box.itemDataList.length; i++) {

            let result = -1;
            let visible = 0;

            for ( var j = 0; j < box.titleCellDataList.length; j++) {

                if (titleCellId == undefined || titleCellId == box.titleCellDataList[j].id) {

                    let fullText = box.itemDataList[i][box.titleCellDataList[j].itemDataIndex];
                    
                    if (typeof fullText !== "string") {
                        fullText = JSON.stringify(fullText);
                    }

                    fullText = fullText.toLowerCase();
                    result = fullText.search(filterText.toLowerCase());

                    if (result > -1) {
                        visible = 1;
                        itemCount++;
                        break;
                    }

                }

            }

            box.itemList[i].visible = visible;

        }

        // Görünen item sayısı.
        shownItemCount = itemCount;
        checkAlert();

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

    box.sort = function(titleId = box.titleCellList[0].data.id, sortingType = "asc") {

        box.boxItems.element.scrollTo({
            top: 0,
            left: 0,
            //behavior: 'smooth'
          });

        const titleCell = box.getTitleCellById(titleId);
        const titleCellIndex = titleCell.index;
        const itemDataIndex = titleCell.data.itemDataIndex;
        const itemDataType = titleCell.data.itemDataType || "string";

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
            //const item = box.itemList[i];
            item.element.style.order = i;

            box.sortedItemIndexList.push(itemDataList[i].originalIndex);
            //box.sortedItemIndexList.push(i);

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
                titleCellWidth = checkTitleCellWidth(box.titleCellList[i], box.titleCellDataList[i].width);
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

            box.titleCellList[i].width = checkTitleCellWidth(box.titleCellList[i], box.titleCellDataList[i].width);

            for(var j = 0; j < box.itemList.length; j++) {
                box.itemList[j].cellList[i].width = box.titleCellList[i].width;
            }

        }

    }

    box.getBiggestId = function(itemDataList = box.itemDataList) {
        let biggestId = 0;
        for(var i = 0; i < itemDataList.length; i++) {
            const currentId = num(itemDataList[i][0]);
            if (currentId > biggestId) {
                biggestId = currentId;
            }
        }
        return biggestId;
    }

    const checkTitleCellWidth = function(titleCell, width) {

        if (width == "auto") {
            width = box.calculatedAutoTitleCellWidth;
        }

        return width;

    }

    const checkAlert = function() {

        if (shownItemCount > 0) {
            box.alert.visible = 0;
            box.alert.text = "";
        } else {
            box.alert.visible = 1;
            if (box.itemDataList.length > 0) {
                box.alert.text = box.default.noItemFoundAlert;
            } else {
                box.alert.text = box.default.noItemAddedAlert;
            }
        }

    };

    box.selectItemById = function(itemId) {

        if (box.default.itemsCanSelectable) {

            const itemIndex = box.getItemIndexById(itemId);

            if (itemIndex != -1) {

                if (box.selectedItem) {
                    box.selectedItem.background.color = box.selectedItem.background.originalColor;
                }
    
                box.selectedItem = box.itemList[itemIndex];
                box.selectedItemIndex = itemIndex;
                box.itemList[itemIndex].background.color = box.default.itemSelectedBackgroundColor;
    
                return 1;

            }
        
        }

        return 0;

    };

    box.getItemIndexById = function(itemId) {
        for(var i = 0; i < box.itemDataList.length; i++) {
            if(box.itemDataList[i][0] == itemId) {
                return i;
            }
        }
        return -1;
    }

    box.getSelectedItemIndex = function() {
        return box.selectedItemIndex;
    };

    box.getSelectedItem = function() {
        return box.selectedItem;
    };

    box.getSelectedItemId = function() {
        return box.selectedItem.data[0];
    };

    box.on = function(event, callback) {
        switch (event) {
            case "click":
                box.onClickFunc = callback;
                break;
            case "edit":
                // no editing option.
                box.onEditFunc = callback;
                break;
        }
    }

    box.moveIntoDiv = function(divElementId) {
        document.getElementById(divElementId).append(box.element);
    }

    box.addScrollBarCssClass = function(cssClass) {
        myTable.boxItems.element.classList.add(cssClass);
    }

	// *** FIRST RUN CODE:
    box.top = 0;
    box.left = 0;
    checkAlert();
    box.onResize(resizeTable);
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
UITable.sharedMethod = function() {
	return "sharedMethod";
}