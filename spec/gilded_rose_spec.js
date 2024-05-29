var { Item, Shop } = require('../src/gilded_rose');

describe("Gilded Rose", function() {
    it("full test", () => {
        const items = [
          new Item("+5 Dexterity Vest", 10, 20),
          new Item("Aged Brie", 2, 0),
          new Item("Elixir of the Mongoose", 5, 7),
          new Item("Sulfuras, Hand of Ragnaros", 0, 80),
          new Item("Sulfuras, Hand of Ragnaros", -1, 80),
          new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
          new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
          new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),
          //new Item("Conjured Mana Cake", 3, 6),
        ];

        const days = Number(process.argv[2]) || 2;
        const gildedRose = new Shop(items);

        for (let day = 0; day < days; day++) {
          console.log(`\n-------- day ${day} --------`);
          console.log("name, sellIn, quality");
          items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
          gildedRose.updateQuality();
        }
    });

    it("Tester si la qualité augmente par 2 quand il reste 10 jours ou moins (Backstage passes)", function() {
        const shop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
        const items = shop.updateQuality();
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(22);
    });

    it("Tester si la qualité augmente par 3 quand il reste 5 jours ou moins (Backstage passes)", function() {
        const shop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
        const items = shop.updateQuality();
        expect(items[0].sellIn).toBe(4);
        expect(items[0].quality).toBe(23);
    });

    it("Tester si la qualité tombe a 0 après le concert (Backstage passes)", function() {
        const shop = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
        const items = shop.updateQuality();
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(0);
    });

    it("Tester si le nom ne change pas", function() {
        const gildedRose = new Shop([new Item("name", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("name");
    });

    it("tester si un item de qualité 50 n'augmente pas", function() {
        const shop = new Shop([new Item("Aged Brie", 2, 50)]);
        const items = shop.updateQuality();
        expect(items[0].quality).toBe(50);
    });

    //it("should decrease the quality of Conjured items twice as fast as normal items", function() {
    //    const shop = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
    //    const items = shop.updateQuality();
    //    expect(items[0].sellIn).toBe(2);
    //    expect(items[0].quality).toBe(4);
    //});

    it("Tester si la qualité d'un Sulfuras reste la meme", function() {
        const shop = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 80)]);
        const items = shop.updateQuality();
        expect(items[0].sellIn).toBe(10);
        expect(items[0].quality).toBe(80);
    });
});
