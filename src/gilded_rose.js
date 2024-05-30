class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }

  updateQualityV2() {
    this.items.map((item) => {
      //Strategy sulfuras
      if (item.name.includes("Sulfuras")) {
        item = item;
      }
      //Strategy Backstage
      if (item.name.includes("Backstage")) {
        if (item.sellIn > 10) {
          item.quality = item.quality + 1;
          item.sellIn = item.sellIn - 1;
        }
        if (item.sellIn <= 10 && item.sellIn > 5 && item.quality < 50) {
          item.quality = item.quality + 2;
          item.sellIn = item.sellIn - 1;
        }
        if (item.sellIn <= 5 && item.sellIn > 0 && item.quality < 50) {
          item.quality = item.quality + 3;
          item.sellIn = item.sellIn - 1;
        }
        if(item.quality >= 50){
          item.quality = 50;
          item.sellIn = item.sellIn - 1;
        }
        if (item.sellIn <= 0) {
          item.quality = 0;
          item.sellIn = item.sellIn - 1;
        }
      }
      //Strategy Conjured
      if (item.name.includes("Conjured")) {
        if (item.sellIn > 0 && item.quality >= 2) {
          item.quality = item.quality - 2;
          item.sellIn = item.sellIn - 1;
        }
        if (item.sellIn <= 0 && item.quality >= 2) {
          item.quality = item.quality - 4;
        }
      }
      //Strategy Aged Brie
      if (item.name.includes("Aged Brie")) {
        if (item.sellIn > 0 && item.quality < 50) {
          item.sellIn = item.sellIn - 1;
          item.quality = item.quality + 1;
        }
        if (item.sellIn > 0 && item.quality == 50) {
          item.sellIn = item.sellIn - 1;
        }
        if (item.sellIn <= 0) {
          item.quality = 0;
          item.sellIn = item.sellIn - 1;
        }
      }
      //Strategy Classic
      if (!item.name.includes("Sulfuras") && !item.name.includes("Conjured") && !item.name.includes("Backstage passes") && !item.name.includes("Aged Brie")) {
        if (item.sellIn > 0) {
          item.quality = item.quality - 1;
          item.sellIn = item.sellIn - 1;
        }
        if (item.sellIn <= 0) {
          item.quality = item.quality - 2;
          item.sellIn = item.sellIn - 1;
        }
      }
    });
    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
