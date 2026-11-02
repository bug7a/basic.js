/*

SEARCHABLE LIST: a list object with a search box

You can use this file as a model when you make your own objects.

WORKING LOGIC:
- SearchableList(params) makes a Box with startObject(). The objects created until endObject() go inside it:
  the search area (a picture and a text box) and the area of the items (a Box that scrolls).
- The variables and the functions of the list are added to that box: list.fill(data), list.getSelectedIndex()...
  So one object carries the whole algorithm, and it is sent back to the line that called SearchableList().
- The list is a Box too, so it has every property of a Box:
  list.top, list.color, list.border...
  And its own functions:
  list.fill(dataArray), list.getSelectedIndex()...
- Every time a key is released in the search box, the items are made again: only the ones whose title or
  description has the searched text.
- A click on an item selects it and calls onItemClick(self, item, itemIndex, itemData).
- A click on the search picture clears the search.

USAGE:
const list = SearchableList({
    left: 40,
    top: 20,
    width: 400,
    height: 450,
    onItemClick: function (self, item, itemIndex, itemData) {
        println(itemData.title);
    },
});
list.fill([
    { title: "Apple", desc: "Fruit", logo: "apple.png" },
    { title: "Carrot", desc: "Vegetable", logo: "carrot.png" },
]);

NOTE: The pictures of the items are in the folder images/37/ (the path is from the page).

*/

"use strict";

// The default values. Every one of them becomes a property of the list: list.width, list.onItemClick...
const SearchableListDefaults = {
    width: 400,
    height: 450,
    // Runs when an item is clicked. self: the list, item: the clicked item object,
    // itemIndex: the number of the item in the data array, itemData: the element of the data array.
    onItemClick: function (self, item, itemIndex, itemData) {},
};

const SearchableList = function (params = {}) {

    // The params that are not given get their default values.
    mergeIntoIfMissing(params, SearchableListDefaults);

    // BOX: The outer box of the list. The objects created until endObject() go inside it.
    // NOTE: Its place (left, top) comes from the params, given where the list is created.
    const box = startObject(params);
    box.color = "whitesmoke";
    box.round = 8;

    // *** PRIVATE VARIABLES:

    const IMAGE_FOLDER = "images/37/";      // the pictures of the items
    const SPACE = 10;                       // px: around the search area
    const SEARCH_AREA_HEIGHT = 60;          // px
    const ITEM_HEIGHT = 90;                 // px: the height of one item

    // The text of the last search. When the same text is searched again, nothing is made again.
    let lastSearchedWord;

    // *** PUBLIC VARIABLES:

    box.dataList = [];                  // the data of the items: [{ title, desc, logo }]
    box.itemObjects = [];               // the item objects on the screen (only the ones the search found)
    box.selectedColor = "whitesmoke";   // the color of the selected item

    // The number of the selected item in dataList.
    // WHY -1: the first item is number 0, so -1 means "nothing is selected".
    box.selectedIndex = -1;

    // *** PRIVATE FUNCTIONS:

    // Creates one item at the given top: a white row with a picture, a title and a description.
    const createItem = function (itemData, top) {

        // BOX: The row of the item
        const item = startBox(0, top, box.width, ITEM_HEIGHT, {
            color: "white",
        });

            // ICON: The picture of the item
            item.imgLogo = Icon(30, 10, 70, 70, {
                round: 4,
            });
            item.imgLogo.load(IMAGE_FOLDER + itemData.logo);

            // LABEL: The title of the item
            item.lblTitle = Label(120, 23, 280, "auto", {
                text: itemData.title,
            });

            // LABEL: The description of the item
            item.lblDesc = Label(120, 47, 280, "auto", {
                text: itemData.desc,
                textColor: "gray",
                fontSize: 14,
            });

        endBox();

        item.on("click", itemClicked);

        return item;

    };

    // Removes the items that are on the screen.
    const removeItems = function () {

        for (let i = 0; i < box.itemObjects.length; i++) {
            box.itemObjects[i].remove();
        }

        box.itemObjects = [];

    };

    // The selected item gets the selected color, the others are white.
    const paintItems = function () {

        for (let i = 0; i < box.itemObjects.length; i++) {

            const item = box.itemObjects[i];

            if (item.itemIndex == box.selectedIndex) {
                item.color = box.selectedColor;
            } else {
                item.color = "white";
            }

        }

    };

    // Runs when an item is clicked: the item is selected and the page is told.
    const itemClicked = function (clickedItem) {

        box.selectedIndex = clickedItem.itemIndex;
        paintItems();

        box.onItemClick(box, clickedItem, box.selectedIndex, box.getSelectedItemData());

    };

    // *** PUBLIC FUNCTIONS:

    // Makes the items again: only the ones whose title or description has the searched text.
    box.refresh = function () {

        // The search does not care about capital letters: "APP" finds "Apple".
        const keyword = box.boxSearchArea.txtSearch.text.toLowerCase();

        // The same text as the last search: the items on the screen are already right.
        if (keyword == lastSearchedWord) return;
        lastSearchedWord = keyword;

        removeItems();

        // The new items go inside the area of the items.
        // NOTE: createIn(box, function) creates the objects of the function inside that box.
        createIn(box.boxItemsArea, function () {

            for (let i = 0; i < box.dataList.length; i++) {

                const itemData = box.dataList[i];
                const title = itemData.title.toLowerCase();
                const desc = itemData.desc.toLowerCase();

                // The title or the description has the searched text (an empty text is in every text).
                if (title.includes(keyword) || desc.includes(keyword)) {

                    // Each new item goes under the items before it.
                    const item = createItem(itemData, box.itemObjects.length * ITEM_HEIGHT);

                    // Our own information on the item: its number in dataList.
                    item.itemIndex = i;

                    box.itemObjects.push(item);

                }

            }

        });

        // When the selected item is on the screen again, it gets its color again.
        paintItems();

    };

    // Clears the search text and shows all the items.
    box.clearSearch = function () {

        box.boxSearchArea.txtSearch.text = "";
        box.refresh();

    };

    // Fills the list with the data. dataArray: [{ title, desc, logo }]
    box.fill = function (dataArray = []) {

        box.dataList = dataArray;

        // WHY: Forget the last search, so refresh() makes the items of the new data.
        lastSearchedWord = undefined;
        box.refresh();

    };

    // The number of the selected item in dataList (-1: nothing is selected).
    box.getSelectedIndex = function () {
        return box.selectedIndex;
    };

    // The object of the selected item (null when it is not on the screen).
    box.getSelectedItem = function () {

        for (let i = 0; i < box.itemObjects.length; i++) {
            if (box.itemObjects[i].itemIndex == box.selectedIndex) {
                return box.itemObjects[i];
            }
        }

        return null;

    };

    // The data of the selected item: { title, desc, logo }
    box.getSelectedItemData = function () {
        return box.dataList[box.selectedIndex];
    };

    // *** OBJECT VIEW:

    // BOX: The search area: a white box at the top
    box.boxSearchArea = startBox(SPACE, SPACE, box.width - (SPACE * 2), SEARCH_AREA_HEIGHT, {
        color: "white",
        round: 14,
    });

        // ICON: The search picture
        box.boxSearchArea.imgIcon = Icon(15, 15, 30, 30, {
            opacity: 0.6,
        });
        box.boxSearchArea.imgIcon.load(IMAGE_FOLDER + "search.svg");

        // INPUT: The search text box. minimal: no border and no shade.
        box.boxSearchArea.txtSearch = Input(60, 5, {
            width: 310,
            border: 0,
            minimal: 1,
            color: "white",
            placeholder: "Search",      // the gray text of the empty box
        });

    endBox();

    // BOX: The area of the items, under the search area. It scrolls when there are many items.
    // Its height: the list, without the search area and 3 spaces (above it, under it and at the bottom).
    const itemsAreaTop = SEARCH_AREA_HEIGHT + (SPACE * 2);
    const itemsAreaHeight = box.height - SEARCH_AREA_HEIGHT - (SPACE * 3);

    box.boxItemsArea = Box(0, itemsAreaTop, box.width, itemsAreaHeight, {
        color: "white",
        scrollY: 1,
        scrollX: 1,
    });

    // *** OBJECT INIT CODE:

    // Every time a key is released in the search box, the items are made again.
    box.boxSearchArea.txtSearch.on("keyup", box.refresh);

    // A click on the search picture clears the search.
    box.boxSearchArea.imgIcon.on("click", box.clearSearch);

    // The list is ready: endObject() closes the box, and "that" is the list again.
    return endObject(box);

};

/*

DEVELOPMENT SUGGESTIONS:

- Write list.addItem(itemData): it adds one element to dataList and shows the items again.
- Write list.removeItem(itemIndex): it removes the element with that number from dataList.
- Think about what else can be added; design it and write it.

*/
