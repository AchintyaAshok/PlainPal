var kayak = require("../lib/scrapers/kayakScraper");

describe("Test Kayak Scraper", function(){
  describe("Test getFormattedDate()", function(){
    describe("Get date with double-digit day", function(){
      it("should return formatted date without day change", function(){
        var formattedDate = kayak.getFormattedDate(new Date(2016, 10, 11));
        expect(formattedDate).toBe("2016-11-11");
      });
    });

    describe("Check if get date increments month", function(){
      it("should return formatted date with month + 1", function(){
        var formattedDate = kayak.getFormattedDate(new Date(2016, 8, 11));
        expect(formattedDate).toBe("2016-09-11");
      });
    });

    describe("Get date with double-digit month", function(){
      it("should return 09/16/2016 as 2016-09-16", function(){
        var formattedDate = kayak.getFormattedDate(new Date(2016, 8, 16));
        expect(formattedDate).toBe("2016-09-16");
      });
    });
  });
});
